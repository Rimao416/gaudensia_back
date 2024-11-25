import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  myMenu,
  myMenuEnglish,
  myMenuPolski,
  TestimonialsPeople,
} from "./seed";
import Category from "../models/Category";
import Dishes from "../models/Dishes";
import Testimonials from "../models/Testimonials";
import { faker } from "@faker-js/faker";
import Translation from "../models/Translation";
dotenv.config({ path: "./config.env" });

const database: string = process.env.DATABASE_TEST ?? "";
const databasePassword: string = process.env.DATABASE_PASSWORD ?? "";

const DB = database.replace("<password>", databasePassword);
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(DB); // Utilisation d'await pour garantir la connexion
    console.log("Connexion réussie");
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1); // Quitter le processus en cas d'erreur de connexion
  }
};

const seedMenu = async () => {
  try {
    // Les différentes traductions des menus
    const languages = {
      fr: myMenu,
      en: myMenuEnglish,
      pl: myMenuPolski,
    };

    // Boucle sur les langues
    for (const [lang, menu] of Object.entries(languages)) {
      // Créer les catégories et plats pour chaque langue
      for (const categoryMenu of menu.categories) {
        // Créer la catégorie
        const category = new Category({
          name: categoryMenu.categoryName,
        });
        const savedCategory = await category.save(); // Sauvegarde de la catégorie

        // Créer la traduction de la catégorie
        const categoryTranslation = new Translation({
          referenceId: savedCategory._id,
          referenceType: "Category",
          lang: lang, // Langue actuelle
          fields: new Map([
            ["name", categoryMenu.categoryName], // Traduction du nom de la catégorie
          ]),
        });
        await categoryTranslation.save();

        // Créer les plats pour cette catégorie
        for (const dish of categoryMenu.dishes) {
          const newDish = new Dishes({
            name: dish.name,
            description: dish.description,
            prices: dish.prices,
            category: savedCategory._id,
          });
          const savedDish = await newDish.save(); // Sauvegarde du plat

          // Créer la traduction du plat
          const dishTranslation = new Translation({
            referenceId: savedDish._id,
            referenceType: "Dish",
            lang: lang, // Langue actuelle
            fields: new Map([
              ["name", dish.name], // Traduction du nom du plat
              ["description", dish.description], // Traduction de la description du plat
            ]),
          });
          await dishTranslation.save();
        }
      }
    }

    console.log("Menu seeded successfully with multiple languages!");
  } catch (error) {
    console.error("Error while sending data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed.");
  }
};

const runSeed = async () => {
  await connectDB(); // Attente de la connexion avant d'exécuter le seed
  await seedMenu(); // Lancement du seed
};

const testimonialSeed = async () => {
  await connectDB();
  try {
    await Testimonials.deleteMany({});

    for (const comment of TestimonialsPeople) {
      const newTestimonial = new Testimonials({
        comment,
      });
      await newTestimonial.save(); // Assure que chaque testimonial est sauvegardé avant de passer au suivant
    }
    console.log("Testimonials seeded successfully!");
  } catch (error) {
    console.error("Error while sending data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed.");
  }
};

const thanos = async () => {
  await connectDB();
  try {
    await Category.deleteMany({});
    await Dishes.deleteMany({});
    await Translation.deleteMany({});
    console.log("Data deleted successfully!");
  } catch (error) {
    console.error("Error while sending data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed.");
  }
};

if (process.argv[2] === "--seedTestimonial") {
  testimonialSeed();
}

if (process.argv[2] === "--seedMenu") {
  runSeed();
}

if (process.argv[2] === "--thanos") {
  // erase all data
  thanos();
}
