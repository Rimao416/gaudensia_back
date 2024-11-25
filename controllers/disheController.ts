import { Request, Response } from "express";
import Dishes from "../models/Dishes";
import APIFeatures from "../utils/apiFeatures";
import mongoose from "mongoose";

export const addDishe = async (req: Request, res: Response) => {
  try {
    const dish = await Dishes.create(req.body);
    return res.status(201).json(dish);
  } catch (error) {
    return res.status(500).json({ err: error });
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
  try {
    const dish = await Dishes.findById(id);
    return res.status(200).json(dish);
  } catch (error) {
    return res.status(500).json({ err: error });
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

export const getMenuByCategories = async (req: Request, res: Response) => {
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

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Vous devez passer l'id en paramètre.",
    });
  }

  // Vérifie si l'ID est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "L'ID fourni est invalide.",
    });
  }

  try {
    const response = await Dishes.findById(id);

    if (!response) {
      return res.status(404).json({
        status: "error",
        message: "Plat non trouvé.",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Une erreur est survenue lors de la récupération du plat.",
    });
  }
};
