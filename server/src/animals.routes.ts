import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const animalsRouter = express.Router();
animalsRouter.use(express.json());

// GET /animals
animalsRouter.get("/", async (request, response) => {
  try {
    const animalsCollection = collections.animals;
    if (!animalsCollection) {
      throw new Error("Animals collection not found");
    }
    const animals = await animalsCollection.find({}).toArray();
    response.send(animals).status(200);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// GET /animals/:name

animalsRouter.get("/:name", async (request, response) => {
  try {
    const animalsCollection = collections.animals;
    if (!animalsCollection) {
      throw new Error("Animals collection not found");
    }
    const animal = await animalsCollection.findOne({ name: request.params.name });
    if (!animal) {
      response.status(404).send(`Animal ${request.params.name} not found`);
      return;
    }
    response.send(animal).status(200);
  } catch (error) {
    response.status(500).send(error.message);
  }
});