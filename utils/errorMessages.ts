
export type Lang = "fr" | "en" | "pl";

interface ErrorMessages {
    [key: string]: {
      [key: string]: string;
    };
  }
  
  // Importer avec le type
  const errors: Record<Lang, ErrorMessages> = require("./errors.json");
  
  // Code inchangé
  export const getErrorMessage = (
    lang: Lang,
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
  