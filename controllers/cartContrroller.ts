import { Request, Response } from "express";
import { AuthRequest } from "./authController";
import CartModel from "../models/Cart";

export const confirmOrder = async (req: AuthRequest, res: Response) => {
  try {
    console.log(req.body); // Affiche les données envoyées par la requête dans la console

    const { items, totalPrice, allergies, deliveryDetails, deliveryAddress } =
      req.body;

    // Vérification des données envoyées
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Le panier est vide." });
    }
    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ error: "Le prix total n'est pas valide." });
    }
    if (!deliveryAddress || deliveryAddress.trim() === "") {
      return res
        .status(400)
        .json({ error: "Veuillez mentionner l'adresse de livraison" });
    }
    if (!deliveryDetails || deliveryDetails.trim() === "") {
      return res
        .status(400)
        .json({ error: "Veuillez mentionner les détails de livraison" });
    }

    // Créer une nouvelle commande avec les données du panier
    const newOrder = new CartModel({
      items,
      totalPrice,
      allergies,
      deliveryAddress,
      deliveryDetails,
      userId: req.userId, // Assurez-vous que `req.userId` est bien défini dans votre `AuthRequest` après l'authentification
      createdAt: new Date(),
    });

    // Sauvegarder la commande dans la base de données
    const savedOrder = await newOrder.save();

    // Répondre à la requête avec un message de confirmation et les détails de la commande
    return res.status(201).json({
      message: "Commande confirmée avec succès.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Erreur lors de la confirmation de la commande:", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de la confirmation de la commande.",
    });
  }
};
