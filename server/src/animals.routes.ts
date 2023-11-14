import * as express from "express";
import {Animal} from "./animals";

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
    const randomAnimal = await Animal.aggregate().sample(1);
    if (!randomAnimal) {
      throw new Error("Animals collection not found");
    }
    response.status(200).send(randomAnimal);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /animals/:name

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
