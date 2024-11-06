import { Request, Response } from "express";
import Dishes from "../models/Dishes";
import APIFeatures from "../utils/apiFeatures";

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
    const dishes = new APIFeatures(Dishes.find(), req.query).paginate().query;
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

// export const getMenuByCategories = async (req: Request, res: Response) => {
//   try {
//     // Obtiens les paramètres de pagination
//     const page = req.query.page ? parseInt(req.query.page as string) : 1;
//     const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
//     const skip = (page - 1) * limit;

//     // Construit l'agrégation avec $lookup, $unwind, $group, et $project, et ajoute $skip et $limit pour la pagination
//     const categoriesWithMenus = await Dishes.aggregate([
//       {
//         $lookup: {
//           from: "categories",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryDetails",
//         },
//       },
//       { $unwind: "$categoryDetails" },
//       {
//         $group: {
//           _id: "$category",
//           categoryName: { $first: "$categoryDetails.name" },
//           dishes: {
//             $push: {
//               _id: "$_id",
//               name: "$name",
//               description: "$description",
//               prices: "$prices",
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           category: {
//             _id: "$_id",
//             name: "$categoryName",
//           },
//           dishes: "$dishes",
//         },
//       },
//       { $skip: skip },  // Applique la pagination en sautant les documents
//       { $limit: limit }, // Limite le nombre de documents retournés
//     ]);

//     // Compte total d'éléments pour le calcul des pages
//     const totalItems = await Dishes.countDocuments();

//     res.status(200).json({
//       results: categoriesWithMenus.length,
//       totalItems,
//       data: categoriesWithMenus,
//       currentPage: page,
//       totalPages: Math.ceil(totalItems / limit),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
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