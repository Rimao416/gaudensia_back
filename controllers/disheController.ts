import { NextFunction, Request, Response } from "express";
import Dishes from "../models/Dishes";

// import APIFeatures from "../utils/apiFeatures";
// import mongoose from "mongoose";
import Translation from "../models/Translation";
import catchAsync from "../utils/catchAsync";
import { addDishWithTranslationsSchema } from "../utils/validationSchema";
import Category from "../models/Category";
import { getValidationMessages } from "../utils/locales/getValidationMessages";

export const addDishe = catchAsync(async (req: Request, res: Response, _next:NextFunction) => {
  const newDish = await Dishes.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newDish,
    },
  });
})

export const addDishWithTranslations = async (req: Request, res: Response) => {
  try {
    // Récupérer la langue de la requête
    const lang: string = (() => {
      if (Array.isArray(req.query.lang)) {
        return typeof req.query.lang[0] === "string" ? req.query.lang[0] : "fr";
      }
      return typeof req.query.lang === "string" ? req.query.lang : "fr";
    })();

    // Charger les messages de validation dans la langue appropriée
    const messages = getValidationMessages(lang);

    // Appliquer le schema de validation
    const schema = addDishWithTranslationsSchema(lang);

    const { error, value } = schema.validate(req.body, { abortEarly: false }); // Extraire "value"

    if (error) {
      console.log(error);
      const formattedErrors: Record<string, string> = error.details.reduce((acc, err) => {
        const field = err.context?.key;
        const message = err.message;
    
        if (field) {
          acc[field] = message;
        }
        return acc;
      }, {} as Record<string, string>); // Spécification du type ici
    
      return res.status(400).json({
        message: "Validation échouée.",
        errors: formattedErrors, // Les erreurs sous forme d'objet clé-valeur
      });
    }

    const { prices, category, translations } = value; // Utilisation des données validées

    // Vérifier si la catégorie existe dans la base de données
    const response_category = await Category.find(category);
    if (!response_category) {
      return res.status(400).json({
        message: messages["category.required"], // Message d'erreur dans la langue appropriée
      });
    }

    // 1. Création du plat (Dish)
    const newDish = new Dishes({
      prices,
      category,
    });

    // Sauvegarder le plat dans la base de données
    const savedDish = await newDish.save();

    // 2. Sauvegarde des traductions
    for (const translation of translations) {
      const { lang, name, description } = translation;

      const newTranslation = new Translation({
        referenceId: savedDish._id,
        referenceType: "Dishes",
        lang,
        fields: new Map([["name", name], ["description", description]]),
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

    // Récupérer la langue de la requête, avec "fr" comme langue par défaut
    const lang=req.headers.lang as string || "fr";

    // Charger les messages de validation dans la langue appropriée
    const messages = getValidationMessages(lang);

    // Utilisation de la méthode getAllTranslated pour récupérer les plats traduits
    const { getAllTranslated } = res.locals;  // Cela suppose que `getAllTranslated` est déjà ajouté dans `locals`
    console.log(getAllTranslated);

    // Récupérer les plats traduits
    const translatedDishes = await getAllTranslated(Dishes, "Dishes");

    // Vérifier si des plats ont été trouvés
    if (translatedDishes.length === 0) {
      return res.status(404).json({
        message: messages["dishes.notFound"] || "Aucun plat trouvé",  // Message d'erreur si aucun plat n'est trouvé
      });
    }

    // Retourner la liste des plats traduits
    res.status(200).json({
      dishes: translatedDishes,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des plats traduits :", error);
    
    // Définir messages ici pour être accessible dans le bloc catch
    const lang: string = (() => {
      if (Array.isArray(req.query.lang)) {
        return typeof req.query.lang[0] === "string" ? req.query.lang[0] : "fr";
      }
      return typeof req.query.lang === "string" ? req.query.lang : "fr";
    })();
    
    const messages = getValidationMessages(lang);

    res.status(500).json({
      message: messages["server.error"] || "Erreur interne du serveur",  // Message d'erreur interne
    });
  }
};


export const singleDishes = async (req: Request, res: Response) => {
 

  try {
  const { getTranslatedById } = res.locals;
    const dishId = req.params.id;

    // Utilisation de la méthode getTranslatedById pour récupérer un plat traduit
    const translatedDish = await getTranslatedById(Dishes, dishId, "Dishes");

    if (!translatedDish) {
      return res.status(404).json({ message: "Plat introuvable" });
    }

    res.status(200).json(translatedDish);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const getDishById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Récupérer la langue de la requête, avec "fr" comme langue par défaut
  const lang: string = (() => {
    if (Array.isArray(req.query.lang)) {
      return typeof req.query.lang[0] === "string" ? req.query.lang[0] : "fr";
    }
    return typeof req.query.lang === "string" ? req.query.lang : "fr";
  })();

  // Charger les messages de validation dans la langue appropriée
  const messages = getValidationMessages(lang);

  // Récupérer la méthode `getTranslatedDish` depuis `res.locals`
  const getTranslatedDish = res.locals.getTranslatedDish;

  try {
    // Récupérer le plat traduit
    const dish = await getTranslatedDish(id); // Fusionne données + traduction

    // Si le plat n'est pas trouvé
    if (!dish) {
      return res.status(404).json({
        message: messages["dish.notFound"] || "Plat non trouvé",  // Message d'erreur si le plat n'est pas trouvé
      });
    }

    // Retourner le plat trouvé
    res.status(200).json(dish);

  } catch (error) {
    console.error("Erreur lors de la récupération du plat :", error);

    // Retourner un message d'erreur en fonction de la langue
    res.status(500).json({
      message: messages["server.error"] || "Erreur interne du serveur",  // Message d'erreur interne
    });
  }
};
interface Dish {
  _id: string;
  name: string;
  description?: string;
  prices: { quantity: string; price: string }[];
}
interface CategoryType {
  _id: string;
  name: string;
}

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
    const getAllTranslated = res.locals.getAllTranslated;
    const lang = req.headers.lang || "fr"; // Langue par défaut : 'en'

    // Étape 1 : Récupérer les catégories et plats via agrégation
    const categoriesWithMenus = await Dishes.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
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

    // Étape 2 : Traduire les catégories et plats
    const categoryIds = categoriesWithMenus.map((cat) => cat.category._id);
    const dishIds = categoriesWithMenus.flatMap((cat) =>
      cat.dishes.map((dish: Dish) => dish._id)
    );
    const [translatedCategories, translatedDishes] = await Promise.all([
      getAllTranslated(Category, "Category", { _id: { $in: categoryIds } }, lang),
      getAllTranslated(Dishes, "Dishes", { _id: { $in: dishIds } }, lang),
    ]);

    // Créer des maps pour accéder rapidement aux traductions
    const categoryMap: Map<string, CategoryType> = new Map(
      translatedCategories.map((cat: CategoryType) => [String(cat._id), cat])
    );
    const dishMap: Map<string, Dish> = new Map(
      translatedDishes.map((dish: Dish) => [String(dish._id), dish])
    );

    // Étape 3 : Assembler les données finales
    const translatedMenus = categoriesWithMenus.map((cat) => ({
      category: {
        _id: cat.category._id,
        name: categoryMap.get(String(cat.category._id))?.name || cat.category.name,
      },
      dishes: cat.dishes.map((dish: Dish) => ({
        _id: dish._id,
        name: dishMap.get(String(dish._id))?.name || dish.name,
        description: dishMap.get(String(dish._id))?.description || dish.description,
        prices: dish.prices,
      })),
    }));

    // Répondre avec les données traduites
    res.status(200).json(translatedMenus);
  } catch (error) {
    console.error("Erreur dans getMenuByCategories :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


// export const searchByCategories = async (req: Request, res: Response) => {
//   try {
//     const categoryId = req.params.id;

//     const categoryWithMenus = await Dishes.aggregate([
//       {
//         $match: {
//           category: new mongoose.Types.ObjectId(categoryId),
//         },
//       },
//       {
//         $lookup: {
//           from: "categories",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryDetails",
//         },
//       },
//       {
//         $unwind: "$categoryDetails",
//       },
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
//           dishes: "$dishes", // Enlève la limite pour afficher tous les plats
//         },
//       },
//     ]);

//     res.status(200).json(categoryWithMenus);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

