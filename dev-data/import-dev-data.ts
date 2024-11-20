import mongoose from "mongoose";
import dotenv from "dotenv";
import { myMenu, TestimonialsPeople } from "./seed";
import Category from "../models/Category";
import Dishes from "../models/Dishes";
import Testimonials from "../models/Testimonials";
import { faker } from "@faker-js/faker";
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
    // Create categories et plats
    for (const menu of myMenu.categories) {
      const category = new Category({
        name: menu.categoryName,
      });
      const savedCategory = await category.save(); // Utilisation de `await` pour attendre la sauvegarde

      for (const dish of menu.dishes) {
        const newDish = new Dishes({
          name: dish.name,
          description: dish.description,
          prices: dish.prices,
          category: savedCategory._id,
        });
        await newDish.save(); // Attente de la sauvegarde du plat
      }
    }
    console.log("Menu seeded successfully!");
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

if (process.argv[2] === "--seedTestimonial") {
  testimonialSeed();
}

if (process.argv[2] === "--seedMenu") {
  runSeed();
}
