import { Request, Response, NextFunction } from "express";
import { Model, Document, FilterQuery } from "mongoose";
import Translation from "../models/Translation";
import { getErrorMessage, Lang } from "./errorMessages";

// Définir un type générique pour les données traduites
type Translated<T> = T & { [key: string]: any }; // Permet l'ajout de champs traduits

export const translationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lang = (req.headers.lang as Lang) || "fr"; // Langue par défaut
    res.locals.lang = lang;
    console.log("Langue : " + lang);
    // Méthode utilitaire pour traduire un document par ID
    res.locals.getTranslatedById = async <T extends Document>(
      model: Model<T>,
      referenceId: string,
      referenceType: string
    ): Promise<Translated<T> | null> => {
      const originalData = await model.findById(referenceId).lean();
      if (!originalData) {
        throw new Error(
          getErrorMessage(lang, "translation", "notFound", {
            referenceType,
          })
        );
      }

      const translation = await Translation.findOne({
        referenceId: originalData._id,
        referenceType,
        lang,
      }).lean();

      return translation
        ? { ...originalData, ...translation.fields } as Translated<T> // Cast explicite vers le type Translated<T>
        : (originalData as Translated<T>); // Cast explicite vers Translated<T>
    };

    // Méthode utilitaire pour traduire plusieurs documents
    res.locals.getAllTranslated = async <T extends Document>(
      model: Model<T>,
      referenceType: string,
      filter: FilterQuery<T> = {} // Utilisation de FilterQuery<T> au lieu de Partial<T>
    ): Promise<Translated<T>[]> => {
      const originalDataList = await model.find(filter).lean();
      const translations = await Translation.find({
        referenceId: { $in: originalDataList.map((data: any) => data._id) },
        referenceType,
        lang,
      }).lean();

      return originalDataList.map((originalData: any) => {
        const translation = translations.find(
          (trans) => String(trans.referenceId) === String(originalData._id)
        );

        return translation
          ? { ...originalData, ...translation.fields } as Translated<T> // Cast explicite vers Translated<T>
          : (originalData as Translated<T>); // Cast explicite vers Translated<T>
      });
    };

    next();
  } catch (error) {
    console.error("Erreur dans le middleware de traduction :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
