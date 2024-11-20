import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUserDocument extends mongoose.Document {
  correctPassword(candidatePassword: string): Promise<boolean>;
}
export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  phoneNumber?: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
export type UserModel = Model<IUser, Record<string, unknown>, IUserDocument>;

const userSchema = new Schema<IUser, UserModel, IUserDocument>(
  {
    fullName: {
      type: String,
      required: [true, "Veuillez renseigner le nom complet"],
      trim: true,
      maxlength: [50, "Le nom complet doit avoir moins de 50 caractères"],
      minlength: [3, "Le nom complet doit avoir au moins 3 caractères"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Veuillez renseigner l'email"],
      trim: true,
      validate: {
        validator: function (value: string) {
          // Vérifie si l'email a un format valide
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(value); // Retourne true si l'email est valide
        },
        message: "Veuillez renseigner un email valide",
      },
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Veuillez renseigner le mot de passe"],
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },

    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.correctPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password); // Use this.password directly
};

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.email = this.email.toLowerCase();

  next();
});

export default mongoose.model<IUser, UserModel>("User", userSchema);
