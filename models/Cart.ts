import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Définition du schema pour l'article dans le panier
const cartItemSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "Dishes", required: true }, // ID unique de l'article
  price: { type: Number, required: true }, // Prix de l'article
  quantity: { type: Number, required: true, default: 1 }, // Quantité de l'article dans le panier
});

// Définition du schema pour le panier
const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  items: { type: [cartItemSchema], required: true, default: [] },
  deliveryAddress: { type: String, required: true },
  deliveryDetails: { type: String, required: true },
  allergies: { type: String },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "pending" }, // Ajoutez le champ status ici
  createdAt: { type: Date, default: Date.now },
});

// Définir l'interface Ty peScript pour le modèle CartItem
export interface CartItem {
  id: ObjectId;
  name: string;
  description?:string;
  price: number;
  quantity: number;
}

// Définir l'interface TypeScript pour le modèle Cart
export interface Cart extends Document {
  userId: ObjectId;
  items: CartItem[];
  deliveryAddress: string; // Adresse de livraison en chaîne
  deliveryDetails: string;
  allergies?: string;
  totalPrice: number;
}

// Créer et exporter le modèle Cart
const CartModel = mongoose.model<Cart>("Cart", cartSchema);
export default CartModel;
