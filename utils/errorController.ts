// middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import AppError from "./appError";
import { getErrorMessage, Lang } from "./errorMessages";

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  code?: number;
  errmsg?: string;
  errors?: { [key: string]: { message: string } };
  isOperational?: boolean;
  placeholders?: { [key: string]: string }; // Ajout de la propriété placeholders
}
interface CastError extends CustomError {
  path: string;
  value: string;
}
interface DuplicateError extends CustomError {
  errmsg: string;
}

interface ValidationError extends CustomError {
  errors: { [key: string]: { message: string } };
}

const handleJWTExpiredError = (lang: Lang): AppError => {
  const message = getErrorMessage(lang, "auth", "tokenExpired");
  return new AppError(message, 401);
};
const handleJWTError = (lang: Lang): AppError => {
  const message = getErrorMessage(lang, "auth", "invalidToken");
  return new AppError(message, 401);
};

const handleCastErrorDB = (err: CastError, lang: Lang): AppError => {
  const message = getErrorMessage(lang, "validation", "invalidId", {
    field: err.path,
    value: err.value,
  });
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err: DuplicateError, lang: Lang): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "";
  const message = getErrorMessage(lang, "database", "duplicate", { value });
  return new AppError(message, 400);
};

const handleValidationErrorDB = (
  err: ValidationError,
  lang: Lang
): AppError => {
  console.log("ValidationError détectée");

  // Construit un message concaténé à partir des erreurs
  const errors = Object.values(err.errors || {})
    .map((el) => el.message)
    .join(". ");

  // Passe les erreurs comme placeholder
  const message = getErrorMessage(lang, "validation", "invalidInput", {
    errors,
  });

  return new AppError(message, 400);
};

const sendErrorProd = (err: CustomError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Erreur inattendue",
    });
  }
};

const globalErrorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const lang = res.locals.lang || "fr";
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.isOperational = err.isOperational || false;
  let error = err;

  if (error.name === "CastError")
    error = handleCastErrorDB(error as CastError, lang);
  if (error.code === 11000)
    error = handleDuplicateErrorDB(error as DuplicateError, lang);
  if (error.name === "ValidationError")
    error = handleValidationErrorDB(error as ValidationError, lang);
  if (error.name === "JsonWebTokenError") error = handleJWTError(lang);
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError(lang);

  // sendError(error, lang, res);
  sendErrorProd(error, res);
};

export default globalErrorHandler;
