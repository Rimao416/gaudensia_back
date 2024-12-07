import { Request, Response } from "express";
import Category from "../models/Category";
import { getValidationMessages } from "../utils/locales/getValidationMessages";

// Recherche de toutes les catégorie
export const getCategories = async (req: Request, res: Response) => {
  const lang=req.headers.lang as string || "fr";
  const messages = getValidationMessages(lang);
  try {
  const { getAllTranslated } = res.locals;  // Cela suppose que `getAllTranslated` est déjà ajouté dans `locals`
       // Récupérer les plats traduits
       const translatedCategories = await getAllTranslated(Category, "Category");

       // Vérifier si des plats ont été trouvés
       if (translatedCategories.length === 0) {
         return res.status(404).json({
           message: messages["dishes.notFound"] || "Aucun plat trouvé",  // Message d'erreur si aucun plat n'est trouvé
         });
       }
   
       // Retourner la liste des plats traduits
       res.status(200).json({
         categories: translatedCategories,
       });

  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

// Création d'une catégorie

export const addCategories = async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  try {
    return res.status(201).json({
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};



