import * as express from "express";
import * as mongodb from "mongodb";
import {collections} from "./database";

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
    response.status(200).send(animals);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /animals/random

animalsRouter.get("/random", async (request, response) => {
  try {
    const animalsCollection = collections.animals;
    if (!animalsCollection) {
      throw new Error("Animals collection not found");
    }
    const [animal] = await animalsCollection
      .aggregate([{$sample: {size: 1}}])
      .toArray();
    response.status(200).send(animal);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /animals/:name

animalsRouter.get("/name/:name", async (request, response) => {
  try {
    const animalsCollection = collections.animals;
    if (!animalsCollection) {
      throw new Error("Animals collection not found");
    }
    const animal = await animalsCollection.findOne({name: request.params.name});
    if (!animal) {
      response.status(404).send(`Animal ${request.params.name} not found`);
      return;
    }
    response.status(200).send(animal);
  } catch (error) {
    response.status(500).send(error);
  }
});
