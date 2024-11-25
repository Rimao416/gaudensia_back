import { NextFunction } from "express";
import Dishes from "../models/Dishes";
import Translation from "../models/Translation";

export const getDishWithTranslation = async (dishId: string, lang: string) => {
  const dish = await Dishes.findById(dishId);
  if (!dish) throw new Error("Plat introuvable");

  const translation = await Translation.findOne({
    referenceId: dish._id,
    referenceType: "Dishes",
    lang,
  });

  return {
    _id: dish._id,
    name: translation?.fields["name"] || "Nom non disponible",
    description:
      translation?.fields["description"] || "Description non disponible",
    category: dish.category,
    prices: dish.prices,
  };
};

export interface TranslationResponse extends Response {
  locals: {
    lang: string;
    getTranslation: (
      referenceId: string,
      referenceType: string
    ) => Promise<{ [key: string]: string }>;
  };
}

export interface TranslationRequest extends Request {
  query: {
    lang?: string;
  };
}

export const translationMiddleware = async (
  req: TranslationRequest,
  res: TranslationResponse,
  next: NextFunction
) => {
  const lang = req.query.lang || "fr"; // Défaut : français
  res.locals.lang = lang;

  // Injecter une méthode pour récupérer les traductions
  res.locals.getTranslation = async (
    referenceId: string,
    referenceType: string
  ) => {
    const translation = await Translation.findOne({
      referenceId,
      referenceType,
      lang,
    });
    return translation?.fields || {};
  };

  next();
};
