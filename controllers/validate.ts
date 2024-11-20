import Joi from "joi";



const passwordSchema = Joi.string().required().min(6).messages({
  "string.min": "Le mot de passe doit avoir au moins 6 caractères.",
  "string.base": "Le mot de passe doit avoir au moins 6 caractères.",
});
// export const userSchema = Joi.object({
//   email: Joi.string().
// });
