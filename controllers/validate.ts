import Joi from "joi";



const passwordSchema = Joi.string().required().min(6).messages({
  "string.min": "Le mot de passe doit avoir au moins 6 caractères.",
  "string.base": "Le mot de passe doit avoir au moins 6 caractères.",
});
export const userSchema = Joi.object({
  fullName: Joi.string().required(),
//   password: Joi.string().required().min(6),
  password: passwordSchema,
  role: Joi.string().valid("customer", "admin"),
  address: Joi.string(),
});
