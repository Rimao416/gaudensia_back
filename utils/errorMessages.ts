
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
    // Récupère les messages pour la langue spécifiée
    const messages = errors[lang] || errors["fr"]; // Fallback à "en"
    const messageTemplate = messages[category]?.[key];
  
    if (!messageTemplate) {
      console.warn(
        `Message non trouvé : catégorie="${category}", clé="${key}", langue="${lang}"`
      );
      return "Erreur inconnue.";
    }
  
    // Remplace les placeholders dans le message
    return Object.keys(placeholders).reduce(
      (msg, key) => msg.replace(new RegExp(`{${key}}`, "g"), placeholders[key]),
      messageTemplate
    );
  };