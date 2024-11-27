import { Request, Response, NextFunction } from "express";
import Translation from "../models/Translation";
import Dishes from "../models/Dishes";

export const translationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lang = (req.query.lang as string) || "fr";
    res.locals.lang = lang;
    // Méthode utilitaire pour récupérer un plat traduit
    res.locals.getTranslatedDish = async (dishId: string) => {
      console.log("Le dish est :", dishId);
      const dish = await Dishes.findById(dishId).lean();
      if (!dish) throw new Error("Plat introuvable");

      // Récupérer les traductions
      const translation = await Translation.findOne({
        referenceId: dish._id,
        referenceType: "Dishes",
        lang,
      }).lean();
      console.log("La translation", translation);

      // Vérifiez si la traduction existe
      if (!translation) throw new Error("Traduction introuvable");

      // Retourner les données fusionnées (plat + traduction)
      return {
        ...dish,
        ...translation.fields, // Ajout des champs traduits
      };
    };

    next();
  } catch (error) {
    console.error("Erreur dans le middleware de traduction :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
