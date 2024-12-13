import { Response } from "express";
import CartModel from "../models/Cart";
import { AuthRequest } from "./authController";
import Dishes from "../models/Dishes";
export const getOrder = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId; // Exemple d'ID utilisateur
  console.log(userId)
      const cart = await CartModel.find({ userId }).lean();
  
      if (!cart.length) {
        return res.status(404).json({ message: "Panier introuvable" });
      }
  
      // Inclure les traductions des plats
      for (const item of cart) {
        for (const cartItem of item.items) {
          const translatedDish = await res.locals.getTranslatedById(
            Dishes, // Remplacez par votre modèle de plats
            cartItem.id,
            "Dishes"
          );
  
          // Ajouter les informations traduites
          cartItem.name = translatedDish?.name || "Nom introuvable";
          cartItem.description = translatedDish?.description || "Description introuvable";
        }
      }
  
      res.json(cart);
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  };