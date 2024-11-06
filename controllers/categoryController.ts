import { Request, Response } from "express";
import Category from "../models/Category";
import Dishes from "../models/Dishes";

// Recherche de toutes les catégorie
export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();
  try {
    return res.status(200).json(categories);
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



