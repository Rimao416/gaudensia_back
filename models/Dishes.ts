import { ObjectId, Schema, model } from "mongoose";
export interface Dishes {
  category:ObjectId;
  prices: {
    quantity: string;
    price: string;
  }[];
}
const DishesSchema = new Schema<Dishes>({
  prices: [
    {
      quantity: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, 
});

export default model<Dishes>("Dishes", DishesSchema);