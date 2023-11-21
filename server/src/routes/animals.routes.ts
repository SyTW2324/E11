import * as express from "express";
import { Animal } from "../models/animals";

export const animalsRouter = express.Router();
animalsRouter.use(express.json());

// GET /animals
animalsRouter.get("/", async (_, response) => {
  try {
    const animals = await Animal.find({});
    if (!animals) {
      throw new Error("Animals collection not found");
    }
    response.status(200).send(animals);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /animals/random

animalsRouter.get("/random", async (_, response) => {
  try {
    const randomAnimal = await Animal.aggregate([{ $sample: { size: 1 } }]);
    if (!randomAnimal || randomAnimal.length === 0) {
      throw new Error("No animals found in the collection");
    }
    response.status(200).send(randomAnimal[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

// GET /animals/name/:name

animalsRouter.get("/name/:name", async (request, response) => {
  try {
    const animal = await Animal.findOne({
      name: request.params.name,
    });
    if (!animal) {
      response.status(404).send(`Animal ${request.params.name} not found`);
      return;
    }
    response.status(200).send(animal);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /animals/name_like/:name

animalsRouter.get("/name_like/:name", async (request, response) => {
  try {
    const animal = await Animal.find({
      searchName: { $regex: request.params.name, $options: "i" },
    });
    if (!animal) {
      response.status(404).send(`Animal ${request.params.name} not found`);
      return;
    }
    response.status(200).send(animal);
  } catch (error) {
    response.status(500).send(error);
  }
});
