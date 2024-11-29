import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "./errorMessages";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lang = res.locals.lang || "en";

  let status = 500;
  let category = "server";
  let key = "internalError";

  if (err.isValidationError) {
    status = 400;
    category = "validation";
    key = err.key || "required"; // Exemple: clé d'erreur personnalisée
  } else if (err.isUnauthorized) {
    status = 401;
    category = "auth";
    key = "unauthorized";
  }

  const message = getErrorMessage(lang, category, key, err.placeholders);

  res.status(status).json({ error: message });
};
