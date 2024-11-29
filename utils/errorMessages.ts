import errors from "./errors.json";

type Lang = "fr" | "en" | "pl";

export const getErrorMessage = (
  lang: string,
  category: string,
  key: string,
  placeholders: { [key: string]: string } = {}
): string => {
  const messages = errors[lang] || errors.en;
  let message = messages[category]?.[key] || "Unknown error";

  Object.keys(placeholders).forEach((placeholder) => {
    const regex = new RegExp(`{{${placeholder}}}`, "g");
    message = message.replace(regex, placeholders[placeholder]);
  });

  return message;
};
