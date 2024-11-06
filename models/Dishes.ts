import { ObjectId, Schema, model } from "mongoose";
export interface Dishes {
  name: string;
  description?: string;
  category:ObjectId;
  prices: {
    quatinty: string;
    price: string;
  }[];
}
const DishesSchema = new Schema<Dishes>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  prices: [
    {
      quantity: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

export default model<Dishes>("Dishes", DishesSchema);