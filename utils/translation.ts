import { Request, Response, NextFunction } from "express";
import Translation from "../models/Translation";

// Middleware global pour la gestion des traductions
export const translationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Langue par défaut (ex. "fr") si aucune n’est fournie dans la requête
    const lang = (req.query.lang as string) || "fr";
    res.locals.lang = lang;
    console.log(req.query.lang);

    // Méthode pour récupérer les traductions en fonction de la langue
    res.locals.getTranslation = async (
      referenceId: string,
      referenceType: string
    ) => {
      const translation = await Translation.findOne({
        referenceId,
        referenceType,
        lang,
      }).lean();

      return translation?.fields || {};
    };

    next();
  } catch (error) {
    console.error("Error in translation middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
