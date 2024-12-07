import fr from "./fr.json";
import en from "./en.json";

const translations = { fr, en };

type SupportedLang = keyof typeof translations; // "fr" | "en"

export const getValidationMessages = (lang: string): Record<string, string> => {
    const fallbackLang: SupportedLang = "fr";
  
    // Vérifie si `lang` est une langue supportée
    const selectedLang: SupportedLang = (lang in translations ? lang : fallbackLang) as SupportedLang;
  
    return translations[selectedLang];
  };
  