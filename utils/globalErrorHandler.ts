// middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { getErrorMessage, Lang } from "./errorMessages";

interface CastError extends Error {
  path: string;
  value: string;
}
interface CustomError extends Error {
    statusCode?: number;
    status?: string;
    code?: number;
    errmsg?: string;
    errors?: { [key: string]: { message: string } };
    isOperational?: boolean;
    placeholders?: { [key: string]: string }; // Ajout de la propriété placeholders
  }

const handleCastErrorDB = (err: CastError, lang: Lang): AppError => {
  const message = getErrorMessage(lang, "validation", "invalidId", {
    field: err.path,
    value: err.value,
  });
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err: CustomError, lang: Lang): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "";
  const message = getErrorMessage(lang, "database", "duplicate", { value });
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: CustomError, lang: Lang): AppError => {
  const errors = Object.values(err.errors || {}).map((el) => el.message).join(". ");
  const message = getErrorMessage(lang, "validation", "invalidInput", { errors });
  return new AppError(message, 400);
};

const handleJWTError = (lang: Lang): AppError => {
  const message = getErrorMessage(lang, "auth", "invalidToken");
  return new AppError(message, 401);
};

const handleJWTExpiredError = (lang: Lang): AppError => {
  const message = getErrorMessage(lang, "auth", "tokenExpired");
  return new AppError(message, 401);
};

const sendError = (err: CustomError, lang: Lang, res: Response): void => {
  if (err.isOperational) {
    const message = getErrorMessage(lang, "server", err.message, err.placeholders);
    res.status(err.statusCode || 500).json({ status: err.status || "error", message });
  } else {
    res.status(500).json({
      status: "error",
      message: getErrorMessage(lang, "server", "internalError"),
    });
  }
};

export const globalErrorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const lang = res.locals.lang || "en";
  let error = { ...err };

  if (error.name === "CastError") error = handleCastErrorDB(error as CastError, lang);
  if (error.code === 11000) error = handleDuplicateErrorDB(error, lang);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error, lang);
  if (error.name === "JsonWebTokenError") error = handleJWTError(lang);
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError(lang);

  sendError(error, lang, res);
};
