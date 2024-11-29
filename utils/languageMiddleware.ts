import { Request, Response, NextFunction } from "express";

export const languageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lang = (req.query.lang as string) || "en"; // Langue par défaut
  res.locals.lang = lang;
  next();
};
