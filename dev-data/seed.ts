interface Dish {
  name: string; // Nom du plat
  description?: string; // Description du plat
  prices: {
    quantity: string; // Ex: "1/2", "entier", "500g"
    price: number; // Prix en PLN
  }[];
}

// Définition d'un type pour une catégorie de plats (Ex: Poulet, Bœuf)
export interface MenuCategory {
  categoryName: string; // Nom de la catégorie (ex: "Plats de Poulet")
  dishes: Dish[]; // Liste de plats dans la catégorie
}

// Définition du menu global avec ses différentes catégories
interface Menu {
  categories: MenuCategory[]; // Liste des catégories
}

// Exemple de l'objet Menu avec des données réelles tirées de ton menu
export const myMenu: Menu = {
  categories: [
    {
      categoryName: "Plats de Poulet",
      dishes: [
        {
          name: "Poulet rôti",
          description: "Poulet rôti au four, doré à la perfection",
          prices: [
            { quantity: "1/2", price: 80 },
            { quantity: "entier", price: 140 },
          ],
        },
        {
          name: "Poulet frit",
          description:
            "Poulet frit, parfumé et croustillant avec des épices maison.",
          prices: [
            { quantity: "Cuisse de poulet", price: 50 },
            { quantity: "1/2", price: 80 },
            { quantity: "entier", price: 140 },
          ],
        },
        {
          name: "Poulet mayo",
          description:
            "Recette traditionnelle congolaise : poulet entier dans une marinade crémeuse à la mayonnaise et des legumes.",
          prices: [
            { quantity: "1/2", price: 100 },
            { quantity: "entier", price: 180 },
          ],
        },
        {
          name: "Brochettes de poulet",
          description:
            "Recette traditionnelle congolaise : poulet entier dans une marinade crémeuse à la mayonnaise et des legumes.",
          prices: [{ quantity: "5 Pièces", price: 40 }],
        },
        {
          name: "Poulet Yassa",
          description:
            "Poulet mijoté dans une sauce à l'oignon et aux olives, typiquement sénégalaise",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
        {
          name: "Poulet sauce arachide",
          description:
            "Poulet tendre mijoté dans une sauce onctueuse aux arachides",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
        {
          name: "Ailes de poulet",
          description:
            "Ailes de poulet croustillantes, servies avec une sauce barbecue.",
          prices: [{ quantity: "5 Pièces", price: 40 }],
        },
        {
          name: "Gésier de poulet",
          description: "Gésiers de poulet épicés et grillés, tendres et juteux",
          prices: [{ quantity: "Dsiponible", price: 35 }],
        },
        {
          name: "Poulet pane",
          description:
            "Poulet enrobé de chapelure dorée, accompagné de légumes frais.",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
        {
          name: "Poulet aux olives",
          description:
            "Poulet mijoté avec des olives et des herbes méditerranéennes.",
          prices: [{ quantity: "Disponible", price: 60 }],
        },
      ],
    },
    {
      categoryName: "Viandes de Chèvre et Agneau",
      dishes: [
        {
          name: "Viande de chèvre braisé",
          description: "Chèvre rôtie lentement, marinée aux épices africaines.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Ntaba mayo",
          description:
            "Viande de chèvre marinée dans une sauce mayonnaise à la congolaise.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Bouillon de viande de chèvre",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Viande d’agneau braisé",
          description:
            "Agneau grillé au charbon, à l'air fryer ou au barbecue électrique, relevé d'une marinade épicée.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Côtes d’agneau",
          description:
            "Côtes d'agneau grillées, tendres et parfumées, servies avec une sauce maison.",
          prices: [
            { quantity: "1kg", price: 250 },
            { quantity: "500g", price: 150 },
          ],
        },
      ],
    },
    {
      categoryName: "Viandes de Porc",
      dishes: [
        {
          name: "Porc frit",
          description:
            "Porc mariné et frit à la perfection, accompagné d'une sauce maison.",
          prices: [{ quantity: "Portion", price: 60 }],
        },
        {
          name: "Porc rôti",
          description:
            "Morceaux de porc cuits lentement au four, servis avec une sauce légère.",
          prices: [{ quantity: "Portion", price: 60 }],
        },
        {
          name: "Porc à la mayo",
          description:
            "Morceaux de porc dans une sauce crémeuse à la mayonnaise, inspirée de la cuisine congolaise.",
          prices: [{ quantity: "500g", price: 70 }],
        },
        {
          name: "Papillote de porc (Liboke ya Ngulu)",
          description:
            "Porc cuit à la vapeur dans des feuilles, mariné aux épices traditionnelles africaines.",
          prices: [{ quantity: "Portion", price: 120 }],
        },
        {
          name: "Porc sauté aux légumes",
          description:
            "Porc sauté avec des légumes croquants, parfumé aux épices douces.",
          prices: [{ quantity: "500g", price: 60 }],
        },
        {
          name: "Brochette de porc",
          description: "Brochettes de porc marinées et grillées.",
          prices: [{ quantity: "6 pièces", price: 50 }],
        },
        {
          name: "Côtes de porc",
          description:
            "Côtes de porc grillées, accompagnées d’une sauce au choix.",
          prices: [{ quantity: "Portion", price: 70 }],
        },
      ],
    },
    {
      categoryName: "Viandes de Bœuf",
      dishes: [
        {
          name: "Brochette de bœuf",
          description:
            "Bœuf grillé sur des brochettes, mariné dans des épices fines.",
          prices: [{ quantity: "5 pièces", price: 60 }],
        },
        {
          name: "Bœuf sauté aux légumes",
          description:
            "Bœuf sauté avec des légumes croquants et relevé d’une sauce épicée.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Bouillon de bœuf",
          description: "Bœuf mijoté lentement dans un bouillon parfumé.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Tripe",
          description: "Tripes de bœuf mijotées dans une sauce tomate épicée.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Rôti de bœuf",
          description:
            "Bœuf rôti lentement au four, accompagné d'une sauce au jus.",
          prices: [{ quantity: "500g", price: 120 }],
        },
        {
          name: "Rognons de bœuf",
          description:
            "Rognons à la sauce tomate ou sautés aux légumes, relevés d’épices africaines.",
          prices: [{ quantity: "500g", price: 50 }],
        },
        {
          name: "Foie de bœuf",
          description:
            "Foie de bœuf à la sauce tomate ou sauté aux légumes, tendre et savoureux.",
          prices: [{ quantity: "500g", price: 50 }],
        },
        {
          name: "Boulettes de bœuf",
          description:
            "Boulettes de bœuf juteuses, servies dans une sauce tomate épicée.",
          prices: [{ quantity: "6 pièces", price: 50 }],
        },
        {
          name: "Nids d’oiseau",
          description: "Bouchée de viande hachée et œuf, en forme de nid.",
          prices: [{ quantity: "3 pièces", price: 50 }],
        },
      ],
    },
    {
      categoryName: "Poissons",
      dishes: [
        {
          name: "Tilapia",
          description:
            "Tilapia grillé au feu de bois ou frit, servi avec une sauce citronnée.",
          prices: [{ quantity: "1 pièce", price: 80 }],
        },
        {
          name: "Thomson (Maquereaux)",
          description:
            "Poisson entier grillé au feu de bois ou frit, mariné aux herbes et épices.",
          prices: [{ quantity: "1 pièce", price: 70 }],
        },
        {
          name: "Poisson chat",
          description:
            "Poisson chat frit ou grillé, servi avec une sauce pimentée.",
          prices: [{ quantity: "1 pièce", price: 100 }],
        },
        {
          name: "Papillote de poisson chat",
          description:
            "Poisson chat cuit à la vapeur dans des feuilles, mariné aux épices traditionnelles africaines.",
          prices: [{ quantity: "1 pièce", price: 150 }],
        },
        {
          name: "Saumon grillé",
          description: "Filet de saumon grillé au feu de bois ou frit.",
          prices: [
            { quantity: "1 filet", price: 70 },
            { quantity: "Fillet entier", price: 250 },
          ],
        },
        {
          name: "Poisson salé",
          description:
            "Poisson salé et grillé, avec une sauce blanche, une sauce tomate ou une sauce à l’aubergine.",
          prices: [{ quantity: "1 pièce", price: 100 }],
        },
        {
          name: "Boulettes de poisson",
          description:
            "Boulettes de poisson épicées, croustillantes à l'extérieur, fondantes à l'intérieur.",
          prices: [{ quantity: "6 pièces", price: 50 }],
        },
      ],
    },
    {
      categoryName: "Légumes",
      dishes: [
        {
          name: "Feuilles de manioc (Pondu)",
          description: "",
          prices: [{ quantity: "1 portion", price: 50 }],
        },
        {
          name: "Gombo grillé",
          description: "Gombo grillé avec une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Gombo gluant",
          description:
            "Gombo mijoté dans une sauce parfumée aux épices africaines avec des fruits de mer, la peau et la viande de bœuf.",
          prices: [{ quantity: "1 portion", price: 80 }],
        },
        {
          name: "Choux de Chine",
          description: "Choux sautés à la sauce tomate ou arachide.",
          prices: [{ quantity: "1 portion", price: 35 }],
        },
        {
          name: "Épinards simples",
          description:
            "Épinards frais sautés avec des oignons et des épices douces.",
          prices: [{ quantity: "1 portion", price: 23 }],
        },
        {
          name: "Épinards à la viande",
          description:
            "Épinards frais cuisinés avec des morceaux de bœuf tendre.",
          prices: [{ quantity: "1 portion", price: 50 }],
        },
        {
          name: "Aubergines simples",
          description:
            "Aubergines grillées, relevées d’une sauce blanche ou d’une sauce tomate maison.",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Haricots",
          description: "Haricots blancs mijotés relevés d’une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 50 }],
        },
        {
          name: "Haricots à la viande de porc",
          description:
            "Haricots mijotés avec de la viande de porc, relevés d’une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 80 }],
        },
        {
          name: "Haricots à la viande de bœuf",
          description:
            "Haricots mijotés avec de la viande de bœuf, relevés d’une sauce tomate.",
          prices: [{ quantity: "1 portion", price: 100 }],
        },
        {
          name: "Amarante",
          description:
            "Légumes verts africains sautés, riches en goût et nutrition, à la sauce tomate ou arachide.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
      ],
    },
    {
      categoryName: "Accompagnements",
      dishes: [
        {
          name: "Chikwang",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Pommes de terre sautées",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Frites de pommes de terre",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Purée de pomme de terre",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Fufu",
          description: "",
          prices: [{ quantity: "1 portion", price: 10 }],
        },
        {
          name: "Riz blanc",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Riz (rouge, jaune, grillé)",
          description:
            "Riz parfumé avec des légumes, une sauce tomate ou épicée.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Frites de manioc",
          description: "Manioc frit croustillant, servi avec une sauce épicée.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Banane plantain grillée ou vapeur",
          description:
            "Banane plantain grillée ou cuite à la vapeur, accompagnée de sauces maison.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
      ],
    },
    {
      categoryName: "Boissons",
      dishes: [
        {
          name: "Bissap",
          description:
            "Jus de fleurs d’hibiscus, rafraîchissant et légèrement sucré.",
          prices: [{ quantity: "1 verre", price: 15 }],
        },
        {
          name: "Jus de gingembre",
          description:
            "Boisson piquante et énergisante à base de gingembre frais.",
          prices: [{ quantity: "1 verre", price: 15 }],
        },
        {
          name: "Limonade",
          description: "Limonade maison, douce et acidulée.",
          prices: [{ quantity: "1 verre", price: 15 }],
        },
      ],
    },
    {
      categoryName: "Sauces",
      dishes: [
        {
          name: "Piment",
          description:
            "Sauce au piment aromatisée, parfaite pour accompagner vos plats.",
          prices: [{ quantity: "1 portion", price: 3 }],
        },
        {
          name: "Sauce tomate rouge",
          description: "Sauce tomate maison, légèrement épicée.",
          prices: [{ quantity: "1 portion", price: 12 }],
        },
        {
          name: "Sauce blanche à la crème fraîche",
          description:
            "Sauce onctueuse à base de crème fraîche, idéale pour les viandes.",
          prices: [{ quantity: "1 portion", price: 15 }],
        },
        {
          name: "Sauce fromagère",
          description:
            "Sauce au fromage fondant, parfaite pour accompagner les frites ou tacos.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Sauce au champignon",
          description:
            "Sauce crémeuse aux champignons frais, pour sublimer vos viandes.",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Sauce au chocolat (noir, blanc, au lait)",
          description:
            "Sauce chocolatée, idéale pour accompagner vos desserts.",
          prices: [{ quantity: "1 portion", price: 6 }],
        },
      ],
    },
    {
      categoryName: "Desserts et Amuse-gueules",
      dishes: [
        {
          name: "Nems (poulet, porc, crevettes, viande hachée, légumes)",
          description:
            "Délicieux rouleaux frits farcis au choix de viande ou légumes, croustillants à l'extérieur.",
          prices: [{ quantity: "7 pièces", price: 40 }],
        },
        {
          name: "Samusa",
          description:
            "Délicieux triangles feuilletés, garnis de viande hachée, de poulet, de porc ou de légumes.",
          prices: [{ quantity: "5 pièces", price: 35 }],
        },
        {
          name: "Beignet de crevettes",
          description:
            "Beignets croustillants de crevettes enrobées de pâte légère.",
          prices: [{ quantity: "7 pièces", price: 30 }],
        },
        {
          name: "Tacos",
          description:
            "Tacos farcis au choix de poulet, bœuf ou porc, servis avec une sauce au choix.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Croquant (croquette)",
          description:
            "Petites croquettes croustillantes, parfaites pour accompagner vos apéritifs.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Beignets",
          description: "Beignets dorés et moelleux, saupoudrés de sucre.",
          prices: [{ quantity: "15 pièces", price: 25 }],
        },
        {
          name: "Crêpes",
          description:
            "Crêpes fines et légères, servies avec du sucre ou du sirop.",
          prices: [{ quantity: "10 pièces", price: 25 }],
        },
        {
          name: "Pancakes",
          description:
            "Pancakes moelleux, légers et dorés, servis avec du sirop d’érable ou une sauce au choix.",
          prices: [{ quantity: "10 pièces", price: 30 }],
        },
        {
          name: "Gaufres",
          description:
            "Gaufres croustillantes à l'extérieur, moelleuses à l'intérieur, servies avec une sauce chocolat au choix.",
          prices: [{ quantity: "5 pièces", price: 25 }],
        },
        {
          name: "Cupcake",
          description: "Petit gâteau moelleux à la vanille ou au chocolat.",
          prices: [{ quantity: "5 pièces", price: 30 }],
        },
        {
          name: "Pain perdu sucré",
          description:
            "Pain brioché doré, fourré au chocolat et servi avec un sirop d'érable.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Pain perdu salé",
          description:
            "Pain brioché doré, enrobé d’œufs et servi avec une sauce au choix.",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
      ],
    },

    // Ajoute d'autres catégories ici...
  ],
};

export const myMenuEnglish: Menu = {
  categories: [
    {
      categoryName: "Chicken Dishes",
      dishes: [
        {
          name: "Roast Chicken",
          description: "Oven-roasted chicken, perfectly golden brown.",
          prices: [
            { quantity: "Half", price: 80 },
            { quantity: "Whole", price: 140 },
          ],
        },
        {
          name: "Fried Chicken",
          description: "Crispy, spiced fried chicken.",
          prices: [
            { quantity: "Chicken Thigh", price: 50 },
            { quantity: "Half", price: 80 },
            { quantity: "Whole", price: 140 },
          ],
        },
        {
          name: "Chicken Mayo",
          description:
            "Traditional Congolese recipe: whole chicken in a creamy mayo marinade with vegetables.",
          prices: [
            { quantity: "Half", price: 100 },
            { quantity: "Whole", price: 180 },
          ],
        },
        {
          name: "Chicken Skewers",
          description:
            "Traditional Congolese recipe: skewers of marinated chicken with vegetables.",
          prices: [{ quantity: "5 Pieces", price: 40 }],
        },
        {
          name: "Yassa Chicken",
          description:
            "Chicken simmered in a sauce made of onions and olives, typically Senegalese.",
          prices: [{ quantity: "Available", price: 60 }],
        },
        {
          name: "Peanut Sauce Chicken",
          description: "Tender chicken simmered in a rich peanut sauce.",
          prices: [{ quantity: "Available", price: 60 }],
        },
        {
          name: "Chicken Wings",
          description: "Crispy chicken wings, served with a barbecue sauce.",
          prices: [{ quantity: "5 Pieces", price: 40 }],
        },
        {
          name: "Chicken Gizzards",
          description: "Spicy, grilled chicken gizzards, tender and juicy.",
          prices: [{ quantity: "Available", price: 35 }],
        },
        {
          name: "Breaded Chicken",
          description:
            "Chicken coated in golden breadcrumbs, served with fresh vegetables.",
          prices: [{ quantity: "Available", price: 60 }],
        },
        {
          name: "Chicken with Olives",
          description: "Chicken simmered with olives and Mediterranean herbs.",
          prices: [{ quantity: "Available", price: 60 }],
        },
      ],
    },
    {
      categoryName: "Goat and Lamb Meat Dishes",
      dishes: [
        {
          name: "Grilled Goat Meat",
          description: "Slow-cooked goat meat, marinated in African spices.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Ntaba Mayo",
          description: "Goat meat marinated in a mayo sauce, Congolese style.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Goat Meat Broth",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Grilled Lamb",
          description:
            "Lamb grilled over charcoal or an electric barbecue, spiced with a marinated rub.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Lamb Chops",
          description: "Tender grilled lamb chops, served with a house sauce.",
          prices: [
            { quantity: "1kg", price: 250 },
            { quantity: "500g", price: 150 },
          ],
        },
      ],
    },
    {
      categoryName: "Pork Dishes",
      dishes: [
        {
          name: "Fried Pork",
          description:
            "Marinated and perfectly fried pork, served with a house sauce.",
          prices: [{ quantity: "Portion", price: 60 }],
        },
        {
          name: "Roast Pork",
          description: "Slow-roasted pork, served with a light sauce.",
          prices: [{ quantity: "Portion", price: 60 }],
        },
        {
          name: "Pork with Mayo",
          description: "Pork in a creamy mayonnaise sauce, Congolese style.",
          prices: [{ quantity: "500g", price: 70 }],
        },
        {
          name: "Pork in Banana Leaf (Liboke ya Ngulu)",
          description:
            "Pork steamed in banana leaves, marinated in traditional African spices.",
          prices: [{ quantity: "Portion", price: 120 }],
        },
        {
          name: "Sautéed Pork with Vegetables",
          description:
            "Pork sautéed with crunchy vegetables, spiced to perfection.",
          prices: [{ quantity: "500g", price: 60 }],
        },
        {
          name: "Pork Skewers",
          description: "Skewers of marinated and grilled pork.",
          prices: [{ quantity: "6 Pieces", price: 50 }],
        },
        {
          name: "Pork Ribs",
          description: "Grilled pork ribs, served with a choice of sauce.",
          prices: [{ quantity: "Portion", price: 70 }],
        },
      ],
    },
    {
      categoryName: "Beef Dishes",
      dishes: [
        {
          name: "Beef Skewers",
          description: "Grilled beef skewers, marinated with fine spices.",
          prices: [{ quantity: "5 Pieces", price: 60 }],
        },
        {
          name: "Beef with Vegetables",
          description:
            "Beef sautéed with crunchy vegetables and seasoned with spicy sauce.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Beef Broth",
          description: "Beef slow-cooked in a flavorful broth.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Tripe",
          description: "Beef tripe simmered in a spicy tomato sauce.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Roast Beef",
          description: "Slow-roasted beef served with a rich sauce.",
          prices: [{ quantity: "500g", price: 120 }],
        },
        {
          name: "Beef Kidneys",
          description:
            "Beef kidneys served in a tomato sauce or sautéed with vegetables.",
          prices: [{ quantity: "500g", price: 50 }],
        },
        {
          name: "Beef Liver",
          description:
            "Beef liver in a tomato sauce or sautéed with vegetables.",
          prices: [{ quantity: "500g", price: 50 }],
        },
        {
          name: "Beef Meatballs",
          description: "Juicy beef meatballs served in a spicy tomato sauce.",
          prices: [{ quantity: "6 Pieces", price: 50 }],
        },
        {
          name: "Bird's Nest",
          description: "Minced meat and egg shaped like a nest.",
          prices: [{ quantity: "3 Pieces", price: 50 }],
        },
      ],
    },
    {
      categoryName: "Fish Dishes",
      dishes: [
        {
          name: "Tilapia",
          description: "Grilled or fried tilapia, served with a lemon sauce.",
          prices: [{ quantity: "1 Piece", price: 80 }],
        },
        {
          name: "Thomson (Mackerel)",
          description:
            "Whole grilled or fried mackerel, marinated with herbs and spices.",
          prices: [{ quantity: "1 Piece", price: 70 }],
        },
        {
          name: "Catfish",
          description: "Fried or grilled catfish, served with a spicy sauce.",
          prices: [{ quantity: "1 Piece", price: 100 }],
        },
        {
          name: "Catfish in Banana Leaf",
          description: "Catfish steamed in banana leaves, marinated in spices.",
          prices: [{ quantity: "1 Piece", price: 120 }],
        },
      ],
    },
    {
      categoryName: "Vegetarian Dishes",
      dishes: [
        {
          name: "Vegetable Rice",
          description: "Rice cooked with a variety of vegetables and spices.",
          prices: [{ quantity: "1 Serving", price: 30 }],
        },
        {
          name: "Vegetable Rice with Cashews",
          description: "Rice flavored with vegetables and cashews.",
          prices: [{ quantity: "1 Serving", price: 30 }],
        },
        {
          name: "Vegetable Mafé",
          description: "Vegetables cooked in a peanut butter sauce.",
          prices: [{ quantity: "1 Serving", price: 40 }],
        },
        {
          name: "Vegetable Soup",
          description: "Light vegetable soup with broth.",
          prices: [{ quantity: "1 Serving", price: 30 }],
        },
        {
          name: "Spiced Chickpeas",
          description: "Chickpeas cooked with warm spices.",
          prices: [{ quantity: "1 Serving", price: 30 }],
        },
        {
          name: "Spinach with Palm Oil",
          description: "Spinach cooked in palm oil, served with rice.",
          prices: [{ quantity: "1 Serving", price: 30 }],
        },
        {
          name: "Sweet Potato Mash",
          description: "Sweet, creamy mash made from sweet potatoes.",
          prices: [{ quantity: "1 Serving", price: 40 }],
        },
      ],
    },
    {
      categoryName: "Sides",
      dishes: [
        {
          name: "Chikwang",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Sautéed Potatoes",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Potato Fries",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Mashed Potatoes",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Fufu",
          description: "",
          prices: [{ quantity: "1 portion", price: 10 }],
        },
        {
          name: "White Rice",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Rice (Red, Yellow, Grilled)",
          description:
            "Flavored rice with vegetables, tomato sauce, or spices.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Cassava Fries",
          description: "Crispy fried cassava, served with spicy sauce.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Grilled or Steamed Plantain",
          description:
            "Grilled or steamed plantain served with homemade sauces.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
      ],
    },
    {
      categoryName: "Drinks",
      dishes: [
        {
          name: "Bissap",
          description: "Refreshing hibiscus flower juice, slightly sweet.",
          prices: [{ quantity: "1 glass", price: 15 }],
        },
        {
          name: "Ginger Juice",
          description: "Spicy, energizing drink made from fresh ginger.",
          prices: [{ quantity: "1 glass", price: 15 }],
        },
        {
          name: "Lemonade",
          description: "Homemade lemonade, sweet and tangy.",
          prices: [{ quantity: "1 glass", price: 15 }],
        },
      ],
    },
    {
      categoryName: "Sauces",
      dishes: [
        {
          name: "Chili Sauce",
          description:
            "Flavored chili sauce, perfect as a side for your dishes.",
          prices: [{ quantity: "1 portion", price: 3 }],
        },
        {
          name: "Red Tomato Sauce",
          description: "Homemade tomato sauce, slightly spicy.",
          prices: [{ quantity: "1 portion", price: 12 }],
        },
        {
          name: "White Cream Sauce",
          description: "Creamy sauce made with fresh cream, ideal for meats.",
          prices: [{ quantity: "1 portion", price: 15 }],
        },
        {
          name: "Cheese Sauce",
          description: "Melty cheese sauce, perfect for fries or tacos.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Mushroom Sauce",
          description: "Creamy sauce with fresh mushrooms, great with meats.",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Chocolate Sauce (Dark, White, Milk)",
          description: "Chocolate sauce, ideal for desserts.",
          prices: [{ quantity: "1 portion", price: 6 }],
        },
      ],
    },
    {
      categoryName: "Desserts and Snacks",
      dishes: [
        {
          name: "Spring Rolls (Chicken, Pork, Shrimp, Minced Meat, Vegetables)",
          description:
            "Delicious fried rolls filled with a choice of meat or vegetables, crispy outside.",
          prices: [{ quantity: "7 pieces", price: 40 }],
        },
        {
          name: "Samosa",
          description:
            "Delicious flaky triangles filled with minced meat, chicken, pork, or vegetables.",
          prices: [{ quantity: "5 pieces", price: 35 }],
        },
        {
          name: "Shrimp Fritters",
          description: "Crispy shrimp fritters coated in a light batter.",
          prices: [{ quantity: "7 pieces", price: 30 }],
        },
        {
          name: "Tacos",
          description:
            "Tacos filled with your choice of chicken, beef, or pork, served with a sauce of your choice.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Crunchy Croquettes",
          description: "Small crispy croquettes, perfect for appetizers.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Donuts",
          description: "Golden, fluffy donuts, sprinkled with sugar.",
          prices: [{ quantity: "15 pieces", price: 25 }],
        },
        {
          name: "Crepes",
          description: "Thin, light crepes served with sugar or syrup.",
          prices: [{ quantity: "10 pieces", price: 25 }],
        },
        {
          name: "Pancakes",
          description:
            "Fluffy, light golden pancakes served with maple syrup or a sauce of your choice.",
          prices: [{ quantity: "10 pieces", price: 30 }],
        },
        {
          name: "Waffles",
          description:
            "Crispy on the outside, fluffy on the inside, served with chocolate sauce of your choice.",
          prices: [{ quantity: "5 pieces", price: 25 }],
        },
        {
          name: "Cupcake",
          description: "Soft, moist cupcake with vanilla or chocolate flavor.",
          prices: [{ quantity: "5 pieces", price: 30 }],
        },
        {
          name: "Sweet French Toast",
          description:
            "Golden brioche bread, stuffed with chocolate, served with maple syrup.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Savory French Toast",
          description:
            "Golden brioche bread coated in eggs, served with a sauce of your choice.",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
      ],
    },
  ],
};

export const myMenuPolski: Menu = {
  categories: [
    {
      categoryName: "Dania z Kurczaka",
      dishes: [
        {
          name: "Pieczony Kurczak",
          description: "Kurczak pieczony w piekarniku, idealnie złocisty.",
          prices: [
            { quantity: "Połowa", price: 80 },
            { quantity: "Cały", price: 140 },
          ],
        },
        {
          name: "Kurczak Smażony",
          description: "Chrupiący, przyprawiony smażony kurczak.",
          prices: [
            { quantity: "Udo", price: 50 },
            { quantity: "Połowa", price: 80 },
            { quantity: "Cały", price: 140 },
          ],
        },
        {
          name: "Kurczak Mayo",
          description:
            "Tradycyjny przepis kongolski: cały kurczak w kremowej marynacie z majonezem i warzywami.",
          prices: [
            { quantity: "Połowa", price: 100 },
            { quantity: "Cały", price: 180 },
          ],
        },
        {
          name: "Szaszłyki Kurczaka",
          description:
            "Tradycyjny przepis kongolski: szaszłyki z marynowanego kurczaka z warzywami.",
          prices: [{ quantity: "5 Sztuk", price: 40 }],
        },
        {
          name: "Kurczak Yassa",
          description:
            "Kurczak gotowany w sosie z cebuli i oliwek, tradycyjny przepis senegalski.",
          prices: [{ quantity: "Dostępne", price: 60 }],
        },
        {
          name: "Kurczak w Sosie Orzechowym",
          description: "Delikatny kurczak gotowany w bogatym sosie orzechowym.",
          prices: [{ quantity: "Dostępne", price: 60 }],
        },
        {
          name: "Skrzydełka Kurczaka",
          description: "Chrupiące skrzydełka kurczaka, podawane z sosem BBQ.",
          prices: [{ quantity: "5 Sztuk", price: 40 }],
        },
        {
          name: "Podroby Kurczaka",
          description:
            "Pikantne, grillowane podroby kurczaka, delikatne i soczyste.",
          prices: [{ quantity: "Dostępne", price: 35 }],
        },
        {
          name: "Kurczak Panierowany",
          description:
            "Kurczak panierowany na złocisty kolor, podawany z świeżymi warzywami.",
          prices: [{ quantity: "Dostępne", price: 60 }],
        },
        {
          name: "Kurczak z Oliwkami",
          description:
            "Kurczak gotowany z oliwkami i ziołami śródziemnomorskimi.",
          prices: [{ quantity: "Dostępne", price: 60 }],
        },
      ],
    },
    {
      categoryName: "Dania z Kozy i Jagnięciny",
      dishes: [
        {
          name: "Grillowane Mięso z Kozy",
          description:
            "Mięso z kozy gotowane na wolnym ogniu, marynowane w afrykańskich przyprawach.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Ntaba Mayo",
          description:
            "Mięso z kozy marynowane w sosie majonezowym, w stylu kongolskim.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Rosół z Kozy",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Grillowana Jagnięcina",
          description:
            "Jagnięcina grillowana na węglu drzewnym lub elektrycznym grillu, przyprawiona marynatą.",
          prices: [
            { quantity: "1kg", price: 350 },
            { quantity: "500g", price: 200 },
          ],
        },
        {
          name: "Kotleciki Jagnięce",
          description:
            "Delikatne grillowane kotleciki jagnięce, podawane z sosem domowym.",
          prices: [
            { quantity: "1kg", price: 250 },
            { quantity: "500g", price: 150 },
          ],
        },
      ],
    },
    {
      categoryName: "Dania z Wieprzowiny",
      dishes: [
        {
          name: "Smażona Wieprzowina",
          description:
            "Marynowana i perfekcyjnie smażona wieprzowina, podawana z sosem domowym.",
          prices: [{ quantity: "Porcja", price: 60 }],
        },
        {
          name: "Pieczona Wieprzowina",
          description: "Powoli pieczona wieprzowina, podawana z lekkim sosem.",
          prices: [{ quantity: "Porcja", price: 60 }],
        },
        {
          name: "Wieprzowina z Majonezem",
          description:
            "Wieprzowina w kremowym sosie majonezowym, w stylu kongolskim.",
          prices: [{ quantity: "500g", price: 70 }],
        },
        {
          name: "Wieprzowina w Liściu Bananowca (Liboke ya Ngulu)",
          description:
            "Wieprzowina gotowana w liściach bananowca, marynowana w tradycyjnych afrykańskich przyprawach.",
          prices: [{ quantity: "Porcja", price: 120 }],
        },
        {
          name: "Smażona Wieprzowina z Warzywami",
          description:
            "Wieprzowina smażona z chrupiącymi warzywami, doprawiona do smaku.",
          prices: [{ quantity: "500g", price: 60 }],
        },
        {
          name: "Szaszłyki Wieprzowe",
          description: "Szaszłyki z marynowanej i grillowanej wieprzowiny.",
          prices: [{ quantity: "6 Sztuk", price: 50 }],
        },
        {
          name: "Żeberka Wieprzowe",
          description: "Grillowane żeberka wieprzowe, podawane z wyborem sosu.",
          prices: [{ quantity: "Porcja", price: 70 }],
        },
      ],
    },
    {
      categoryName: "Dania z Wołowiny",
      dishes: [
        {
          name: "Szaszłyki Wołowe",
          description:
            "Grillowane szaszłyki wołowe, marynowane w wyśmienitych przyprawach.",
          prices: [{ quantity: "5 Sztuk", price: 60 }],
        },
        {
          name: "Wołowina z Warzywami",
          description:
            "Wołowina smażona z chrupiącymi warzywami i doprawiona pikantnym sosem.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Rosół Wołowy",
          description: "Wołowina gotowana powoli w aromatycznym rosole.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Flaki",
          description: "Wołowe flaki gotowane w pikantnym sosie pomidorowym.",
          prices: [{ quantity: "500g", price: 100 }],
        },
        {
          name: "Pieczona Wołowina",
          description: "Powoli pieczona wołowina, podawana z bogatym sosem.",
          prices: [{ quantity: "500g", price: 120 }],
        },
        {
          name: "Wątroba Wołowa",
          description:
            "Wątroba wołowa w sosie pomidorowym lub smażona z warzywami.",
          prices: [{ quantity: "500g", price: 50 }],
        },
        {
          name: "Kotlety Wołowe",
          description:
            "Soczyste kotlety wołowe podawane w pikantnym sosie pomidorowym.",
          prices: [{ quantity: "6 Sztuk", price: 50 }],
        },
        {
          name: "Gniazdo",
          description: "Mielone mięso i jajko w kształcie gniazda.",
          prices: [{ quantity: "3 Sztuki", price: 50 }],
        },
      ],
    },
    {
      categoryName: "Dania Rybne",
      dishes: [
        {
          name: "Tilapia",
          description:
            "Grillowana lub smażona tilapia, podawana z sosem cytrynowym.",
          prices: [{ quantity: "Porcja", price: 80 }],
        },
        {
          name: "Mamba",
          description: "Grillowana mamba, ryba wędzona w stylu afrykańskim.",
          prices: [{ quantity: "Porcja", price: 70 }],
        },
      ],
    },
    {
      categoryName: "Dania Wegetariańskie",
      dishes: [
        {
          name: "Puree z Batatów",
          description: "Słodkie, kremowe puree z batatów.",
          prices: [{ quantity: "1 Porcja", price: 40 }],
        },
        {
          name: "Fufu",
          description: "Tradycyjny kongolski fufu, gotowany z mąki maniokowej.",
          prices: [{ quantity: "1 Porcja", price: 50 }],
        },
      ],
    },
    {
      categoryName: "Sides",
      dishes: [
        {
          name: "Chikwang",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Sautéed Potatoes",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Potato Fries",
          description: "",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Mashed Potatoes",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Fufu",
          description: "",
          prices: [{ quantity: "1 portion", price: 10 }],
        },
        {
          name: "White Rice",
          description: "",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
        {
          name: "Rice (Red, Yellow, Grilled)",
          description:
            "Flavored rice with vegetables, tomato sauce, or spices.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Cassava Fries",
          description: "Crispy fried cassava, served with spicy sauce.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Grilled or Steamed Plantain",
          description:
            "Grilled or steamed plantain served with homemade sauces.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
      ],
    },
    {
      categoryName: "Drinks",
      dishes: [
        {
          name: "Bissap",
          description: "Refreshing hibiscus flower juice, slightly sweet.",
          prices: [{ quantity: "1 glass", price: 15 }],
        },
        {
          name: "Ginger Juice",
          description: "Spicy, energizing drink made from fresh ginger.",
          prices: [{ quantity: "1 glass", price: 15 }],
        },
        {
          name: "Lemonade",
          description: "Homemade lemonade, sweet and tangy.",
          prices: [{ quantity: "1 glass", price: 15 }],
        },
      ],
    },
    {
      categoryName: "Sauces",
      dishes: [
        {
          name: "Chili Sauce",
          description:
            "Flavored chili sauce, perfect as a side for your dishes.",
          prices: [{ quantity: "1 portion", price: 3 }],
        },
        {
          name: "Red Tomato Sauce",
          description: "Homemade tomato sauce, slightly spicy.",
          prices: [{ quantity: "1 portion", price: 12 }],
        },
        {
          name: "White Cream Sauce",
          description: "Creamy sauce made with fresh cream, ideal for meats.",
          prices: [{ quantity: "1 portion", price: 15 }],
        },
        {
          name: "Cheese Sauce",
          description: "Melty cheese sauce, perfect for fries or tacos.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Mushroom Sauce",
          description: "Creamy sauce with fresh mushrooms, great with meats.",
          prices: [{ quantity: "1 portion", price: 20 }],
        },
        {
          name: "Chocolate Sauce (Dark, White, Milk)",
          description: "Chocolate sauce, ideal for desserts.",
          prices: [{ quantity: "1 portion", price: 6 }],
        },
      ],
    },
    {
      categoryName: "Desserts and Snacks",
      dishes: [
        {
          name: "Spring Rolls (Chicken, Pork, Shrimp, Minced Meat, Vegetables)",
          description:
            "Delicious fried rolls filled with a choice of meat or vegetables, crispy outside.",
          prices: [{ quantity: "7 pieces", price: 40 }],
        },
        {
          name: "Samosa",
          description:
            "Delicious flaky triangles filled with minced meat, chicken, pork, or vegetables.",
          prices: [{ quantity: "5 pieces", price: 35 }],
        },
        {
          name: "Shrimp Fritters",
          description: "Crispy shrimp fritters coated in a light batter.",
          prices: [{ quantity: "7 pieces", price: 30 }],
        },
        {
          name: "Tacos",
          description:
            "Tacos filled with your choice of chicken, beef, or pork, served with a sauce of your choice.",
          prices: [{ quantity: "1 portion", price: 28 }],
        },
        {
          name: "Crunchy Croquettes",
          description: "Small crispy croquettes, perfect for appetizers.",
          prices: [{ quantity: "1 portion", price: 17 }],
        },
        {
          name: "Donuts",
          description: "Golden, fluffy donuts, sprinkled with sugar.",
          prices: [{ quantity: "15 pieces", price: 25 }],
        },
        {
          name: "Crepes",
          description: "Thin, light crepes served with sugar or syrup.",
          prices: [{ quantity: "10 pieces", price: 25 }],
        },
        {
          name: "Pancakes",
          description:
            "Fluffy, light golden pancakes served with maple syrup or a sauce of your choice.",
          prices: [{ quantity: "10 pieces", price: 30 }],
        },
        {
          name: "Waffles",
          description:
            "Crispy on the outside, fluffy on the inside, served with chocolate sauce of your choice.",
          prices: [{ quantity: "5 pieces", price: 25 }],
        },
        {
          name: "Cupcake",
          description: "Soft, moist cupcake with vanilla or chocolate flavor.",
          prices: [{ quantity: "5 pieces", price: 30 }],
        },
        {
          name: "Sweet French Toast",
          description:
            "Golden brioche bread, stuffed with chocolate, served with maple syrup.",
          prices: [{ quantity: "1 portion", price: 30 }],
        },
        {
          name: "Savory French Toast",
          description:
            "Golden brioche bread coated in eggs, served with a sauce of your choice.",
          prices: [{ quantity: "1 portion", price: 25 }],
        },
      ],
    },
  ],
};

// WHY CHOOSE U
export const TestimonialsPeople = [
  "I'll definetely like ut, this taste really really good, she deserves 5 Stars",
  "So much food, throwback to when I loved it! Might just become a weekend customer.",
  "Hello hello, the food was excellent and so tasty. The quantity is really generous. Thanks so much for the beignet; didn’t expect that ",
  "Surtout les beignets j'adore ça il faudra m'en refaire",
  "Je me suis régalé comme un fou avec ton poulet mayo, j'ai failli même tout finir !",
  "Merci, c'était trop boooon ! J'ai vraiment adoré !",
  "Hey Gaudensia your poulet mayo was absolutely amazing I ate that with some of my friends they are not even African but they liked the poulet mayo , i gave them your number they will contact you",
  "It was great food and amazing packaging.Thank you G",
  "Thank you so much I enjoyed the food 10/10",
];
