
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
    // Récupère les messages pour la langue
    const messages = errors[lang] || errors.fr;
  
    // Récupère le message correspondant
    let message = messages[category]?.[key];
  
    // Si le message n'existe pas, retourne directement le "key" brut
    if (!message) {
      // Vérifie si "key" est une chaîne brute, sinon retourne une erreur générique
      if (key.startsWith("Path")) {
        return key; // Ex. : "Path 'category' is required."
      }
  
      console.warn(
        `Message non trouvé pour la catégorie "${category}" et la clé "${key}" dans la langue "${lang}".`
      );
      return "Erreur inconnue.";
    }
  
    // Remplace les placeholders par leurs valeurs
    Object.keys(placeholders).forEach((placeholder) => {
      const regex = new RegExp(`{{${placeholder}}}`, "g");
      message = message.replace(regex, placeholders[placeholder] || `[${placeholder} manquant]`);
    });
  
    return message;
  };
  