import { Request, Response } from "express";
import Dishes from "../models/Dishes";
import APIFeatures from "../utils/apiFeatures";
import mongoose from "mongoose";
import Translation from "../models/Translation";

export const addDishe = async (req: Request, res: Response) => {
  try {
    const dish = await Dishes.create(req.body);
    return res.status(201).json(dish);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const addDishWithTranslations = async (req: Request, res: Response) => {
  try {
    const { name, description, prices, category, translations } = req.body;

    // 1. Création du plat (Dish)
    const newDish = new Dishes({
      name,
      description,
      prices,
      category,
    });

    // Sauvegarder le plat dans la base de données
    const savedDish = await newDish.save();

    // 2. Sauvegarde des traductions
    for (const translation of translations) {
      const { lang, nameTranslation, descriptionTranslation } = translation;

      const newTranslation = new Translation({
        referenceId: savedDish._id,
        referenceType: "Dish",
        lang,
        fields: new Map([
          ["name", nameTranslation],
          ["description", descriptionTranslation],
        ]),
      });

      // Sauvegarder la traduction
      await newTranslation.save();
    }

    // 3. Retourner la réponse
    res.status(201).json({
      message: "Plat créé avec succès",
      dish: savedDish,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la création du plat",
      error: error,
    });
  }
};

export const getAllDishes = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(
      Dishes.find().populate("category"),
      req.query
    );
    await features.search(); // Recherche sur `name`
    features.filter().sort().limitFields().paginate();

    const dishes = await features.query.exec(); // Exécute la requête

    return res.status(200).json(dishes);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getDishById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getTranslatedDish = res.locals.getTranslatedDish;
  console.log(getTranslatedDish)

  try {
    const dish = await getTranslatedDish(id); // Fusionne données + traduction
    res.json(dish);
  } catch (error) {

    console.error("Erreur lors de la récupération du plat :", error);
    res.status(404).json({ message: "error.message" });
  }
};

export const updateDish = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dish = await Dishes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dish = await Dishes.findByIdAndDelete(id);
    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getMenuByCategories = async (_req: Request, res: Response) => {
  try {
    const categoriesWithMenus = await Dishes.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $group: {
          _id: "$category",
          categoryName: { $first: "$categoryDetails.name" },
          dishes: {
            $push: {
              _id: "$_id",
              name: "$name",
              description: "$description",
              prices: "$prices",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: {
            _id: "$_id",
            name: "$categoryName",
          },
          dishes: { $slice: ["$dishes", 5] }, // Limite à 5 plats par catégorie
        },
      },
    ]);

    res.status(200).json(categoriesWithMenus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const searchByCategories = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    const categoryWithMenus = await Dishes.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(categoryId),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $group: {
          _id: "$category",
          categoryName: { $first: "$categoryDetails.name" },
          dishes: {
            $push: {
              _id: "$_id",
              name: "$name",
              description: "$description",
              prices: "$prices",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: {
            _id: "$_id",
            name: "$categoryName",
          },
          dishes: "$dishes", // Enlève la limite pour afficher tous les plats
        },
      },
    ]);

    res.status(200).json(categoryWithMenus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const singleDishes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getTranslatedDish = res.locals.getTranslatedDish;
  console.log("SAKYT")
  console.log(getTranslatedDish)

  try {
    const dish = await getTranslatedDish(id); // Fusionne données + traduction
    res.json(dish);
  } catch (error:unknown) {
    console.error("Erreur lors de la récupération du plat :", error);
    res.status(404).json({ message: "error.message" });
  }
};
