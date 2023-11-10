import * as expresponses from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const userRouter = expresponses.Router();
userRouter.use(expresponses.json());

// GET /users buscar todos
userRouter.get("/", async (request, response) => {
  try {
    const usersCollection = collections.users;
    if (!usersCollection) {
      throw new Error("User collection not found");
    }
    const user = await usersCollection.find({}).toArray();
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /users/:id buscar por id
userRouter.get("/:id", async (request, response) => {
  try {
    const usersCollection = collections.users;
    if (!usersCollection) {
      throw new Error("User collection not found");
    }
    const user = await usersCollection.findOne({
      _id: new mongodb.ObjectId(request.params.id),
    });
    if (!user) {
      response.status(404).send(`User ${request.params.id} not found`);
      return;
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /users/:name buscar por nombre
userRouter.get("/name/:name", async (request, response) => {
  try {
    const usersCollection = collections.users;
    if (!usersCollection) {
      throw new Error("User collection not found");
    }
    const user = await usersCollection.findOne({
      name: request.params.name,
    });
    if (!user) {
      response.status(404).send(`User ${request.params.name} not found`);
      return;
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});
// POST /user crear un nuevo user
userRouter.post("/", async (request, response) => {
  try {
    const usersCollection = collections.users;
    if (!usersCollection) {
      throw new Error("User collection not found");
    }
    const user = request.body;
    const result = await usersCollection.insertOne(user);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// PUT /users/:id modificacion completa
userRouter.put("/:id", async (request, response) => {
  try {
    const usersCollection = collections.users;
    if (!usersCollection) {
      throw new Error("User collection not found");
    }
    const user = request.body;
    const result = await usersCollection.replaceOne(
      { _id: new mongodb.ObjectId(request.params.id) },
      user
    );
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// PATCH /users/:id modificacion parcial
userRouter.patch("/:id", async (request, response) => {
  try {
    const usersCollection = collections.users;
    if (!usersCollection) {
      throw new Error("User collection not found");
    }
    const user = request.body;
    const result = await usersCollection.updateOne(
      { _id: new mongodb.ObjectId(request.params.id) },
      { $set: user }
    );
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE /users/:id
userRouter.delete("/:id", async (request, response) => {
  try {
    const usersCollection = collections.users;
    if (!usersCollection) {
      throw new Error("User collection not found");
    }
    const result = await usersCollection.deleteOne({
      _id: new mongodb.ObjectId(request.params.id),
    });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
