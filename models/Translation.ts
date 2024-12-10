import { Schema, model, Document } from "mongoose";

export interface Translation extends Document {
  referenceId: Schema.Types.ObjectId; // Référence vers le document traduit
  referenceType: string; // Type du modèle (ex: "Dishes", "Category")
  lang: string; // Langue de la traduction (ex: "fr", "en", "pl")
  fields: Map<string, string>;
}

const TranslationSchema = new Schema<Translation>({
  referenceId: { type: Schema.Types.ObjectId, required: true },
  referenceType: { type: String, required: true },
  lang: { type: String, required: true },
  fields: {
    type: Map,
    of: String,
    required: true,
  },
});

export default model<Translation>("Translation", TranslationSchema);
