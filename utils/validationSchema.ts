import Joi from "joi";
import { getValidationMessages } from "./locales/getValidationMessages";

export const addDishWithTranslationsSchema = (lang: string ) => {
  const messages = getValidationMessages(lang);

  return Joi.object({
    prices: Joi.array()
      .items(
        Joi.object({
          quantity: Joi.string().required().messages({
            "string.empty": messages["prices.quantity.required"],
          }),
          price: Joi.number().required().messages({
            "number.base": messages["prices.price.type"],
            "number.empty": messages["prices.price.required"],
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.base": messages["prices.array"],
        "array.min": messages["prices.min"],
        "any.required": messages["prices.required"],
      }),
    category: Joi.string().required().messages({
      "string.empty": messages["category.required"],
      "any.required": messages["category.required"],
    }),
    translations: Joi.array()
      .items(
        Joi.object({
          lang: Joi.string().required().messages({
            "string.empty": messages["translations.lang.required"],
          }),
          name: Joi.string().required().messages({
            "string.empty": messages["translations.name.required"],
          }),
          description: Joi.string().required().messages({
            "string.empty": messages["translations.description.required"],
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.base": messages["translations.array"],
        "array.min": messages["translations.min"],
        "any.required": messages["translations.required"],
      }),
  });
};
