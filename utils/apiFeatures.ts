import { Query } from "mongoose";
import { ParsedQs } from "qs";
import fuzzysort from "fuzzysort";

class APIFeatures<T> {
  query: Query<T[], T>;
  queryString: { [key: string]: string | undefined };

  constructor(query: Query<T[], T>, queryString: ParsedQs) {
    this.query = query;
    this.queryString = queryString as { [key: string]: string | undefined };
  }
  async search() {
    if (this.queryString.search) {
      const searchValue = this.queryString.search;
  
      // Étape 1 : Récupérer les documents depuis la base avec les champs nécessaires
      const allDocs = await this.query.model.find().select("name _id");
      console.log("Documents récupérés :", allDocs);
  
      // Étape 2 : Effectuer la recherche avec Fuzzysort sur le champ `name`
      const results = fuzzysort.go(searchValue, allDocs, { key: "name" });
      console.log("Résultats Fuzzysort :", results);
  
      // Étape 3 : Extraire les IDs des correspondances
      const matchingIds = results.map((result) => result.obj._id);
      console.log("IDs correspondants :", matchingIds);
  
      // Étape 4 : Filtrer les documents
      this.query = this.query.find({ _id: { $in: matchingIds } });
    }
    return this;
  }
  

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page ? parseInt(this.queryString.page) : 1;
    console.log("Les données paggniées du page " + page);
    const limit = this.queryString.limit
      ? parseInt(this.queryString.limit)
      : 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
  async countTotalItems() {
    const countQuery = await this.query.model.countDocuments();
    return countQuery;
  }
}

export default APIFeatures;
