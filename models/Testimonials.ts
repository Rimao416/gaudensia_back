import { model, Schema } from "mongoose";

export interface Testimonials {
  author: string;
  comment: string;
  mail: string;
}

const TestimonialsSchema = new Schema<Testimonials>({
  author: { type: String, required: true },
  comment: { type: String, required: true },
  mail: { type: String, required: true },
});

export default model<Testimonials>("Testimonials", TestimonialsSchema);
