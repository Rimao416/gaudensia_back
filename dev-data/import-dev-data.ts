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
import fs from "fs";
import path from "path";
// import { faker } from "@faker-js/faker";
import Translation from "../models/Translation";
dotenv.config({ path: "./config.env" });

const database: string = process.env.DATABASE_TEST ?? "";
const databasePassword: string = process.env.DATABASE_PASSWORD ?? "";

const DB = database.replace("<password>", databasePassword);
mongoose.set("strictQuery", true);

const fileFr = path.join(__dirname, "menuFr.json");
const fileEn = path.join(__dirname, "menuEn.json");
const filePl = path.join(__dirname, "menuPl.json");
const connectDB = async () => {
  try {
    await mongoose.connect(DB); // Utilisation d'await pour garantir la connexion
    console.log("Connexion réussie");
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1); // Quitter le processus en cas d'erreur de connexion
  }
};

const seedCategory = async () => {
  try {
    const languages = {
      fr: myMenu,
      en: myMenuEnglish,
      pl: myMenuPolski,
    };

    for (let i = 0; i < languages.fr.categories.length; i++) {
      // const lang = Object.keys(languages)[i];

      const response = await new Category({
        name: languages.fr.categories[i].categoryName,
      }).save();
      const response_id = response._id;
      // Sauvegarder les translations des catégories
      await new Translation({
        referenceId: response_id,
        referenceType: "Category",
        lang: "fr",
        fields: {
          name: languages.fr.categories[i].categoryName,
        },
      }).save();

      await new Translation({
        referenceId: response_id,
        referenceType: "Category",
        lang: "en",
        fields: {
          name: languages.en.categories[i].categoryName,
        },
      }).save();

      await new Translation({
        referenceId: response_id,
        referenceType: "Category",
        lang: "pl",
        fields: {
          name: languages.pl.categories[i].categoryName,
        },
      }).save();
    }

    console.log("Menu seedé avec succès dans 3 langues !");
  } catch (error) {
    console.error("Erreur lors du seed :", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connexion à la base de données fermée.");
  }
};

const seedMenu = async () => {
  await connectDB();
  try {
    const categories = await Category.find({});

    // Itérer sur chaque catégorie
    for (const category of categories) {
      const name = category.name;

      // Trouver la catégorie correspondante dans myMenu
      for (const menuCategory of myMenu.categories) {
        if (menuCategory.categoryName === name) {
          // Sauvegarder les plats (dishes) associés à cette catégorie

          // for (const dish of menuCategory.dishes) {
          //   await new Dishes({
          //     name: dish.name,
          //     description: dish.description,
          //     prices: dish.prices,
          //     category: category._id,
          //   }).save();
          // }
          console.log(
            "---------------Nous touchons la catégorie de " +
              menuCategory.categoryName
          );

          for (const dish of menuCategory.dishes) {
            console.log(dish);
          }
        }
      }
    }

    console.log("Dishes seeded successfully!");
  } catch (error) {
    console.error("Error while sending data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed.");
  }
};

const seedTranslation = async () => {
  await connectDB();
  try {
    await Translation.deleteMany({referenceType: "Dishes"});
    // Charler les menus

    const menuFr = JSON.parse(fs.readFileSync(fileFr, "utf-8"));
    const menuEn = JSON.parse(fs.readFileSync(fileEn, "utf-8"));
    const menuPl = JSON.parse(fs.readFileSync(filePl, "utf-8"));
    // const dishes = await Dishes.find({});
    // let index=0
    console.log(menuEn.dishes.length, menuFr.dishes.length, menuPl.dishes.length);
  //   for (const dish of dishes) {
  //     const dish_id = dish._id;
  //     await new Translation({
  //       referenceId: dish_id,
  //       referenceType: "Dishes",
  //       lang: "fr",
  //       fields: {
  //         name: menuFr.dishes[index].name,
  //         description: menuFr.dishes[index].description,
  //       }
  //     })
  //     await new Translation({
  //       referenceId: dish_id,
  //       referenceType: "Dishes",
  //       lang: "en",
  //       fields: {
  //         name: menuEn.dishes[index].name,
  //         description: menuEn.dishes[index].description,
  //       }
  //     })
  //     await new Translation({
  //       referenceId: dish_id,
  //       referenceType: "Dishes",
  //       lang: "pl",
  //       fields: {
  //         name: menuPl.dishes[index].name,
  //         description: menuPl.dishes[index].description,
  //       }
  //     })
  //     index++

  
  // }
    console.log("Data deleted successfully!");
  } catch (error) {
    console.error("Error while sending data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed.");
  }
};

const runSeed = async () => {
  await connectDB(); // Attente de la connexion avant d'exécuter le seed
  await seedCategory(); // Lancement du seed
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

if (process.argv[2] === "--seedCategory") {
  runSeed();
}
if (process.argv[2] === "--seedMenu") {
  seedMenu();
}
if (process.argv[2] === "--seedTranslation") {
  seedTranslation();
}

if (process.argv[2] === "--thanos") {
  // erase all data
  thanos();
}
