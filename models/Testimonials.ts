import { model, Schema } from "mongoose";

export interface Testimonials {
  comment: string;
}

const TestimonialsSchema = new Schema<Testimonials>({
  comment: { type: String, required: true },
});

export default model<Testimonials>("Testimonials", TestimonialsSchema);
