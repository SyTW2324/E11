import * as expresponses from "express";
import * as mongodb from "mongodb";
import bcrypt from "bcrypt";
import {User} from "../models/user";
import JWT from "jsonwebtoken";

export const userRouter = expresponses.Router();
userRouter.use(expresponses.json());

// GET /user buscar todos
userRouter.get("/", async (_, response) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new Error("User collection not found");
    }
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET /user/:id buscar por id
userRouter.get("/:id", async (request, response) => {
  try {
    const user = await User.findOne({
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

// GET /user/:name buscar por nombre
userRouter.get("/name/:name", async (request, response) => {
  try {
    const user = await User.findOne({
      username: request.params.name,
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

// DELETE
userRouter.delete("/:id", async (request, response) => {
  try {
    const user = await User.findOne({
      _id: new mongodb.ObjectId(request.params.id),
    });
    if (!user) {
      response.status(404).send(`User ${request.params.id} not found`);
      return;
    }

    const deletedUser = await User.deleteOne({
      _id: new mongodb.ObjectId(request.params.id),
    });
    if (!deletedUser) {
      throw new Error("Error deleting user");
    }
    response.status(200).send(deletedUser);
  } catch (error) {
    response.status(500).send(error);
  }
});

// POST /user/addPoints/:id
userRouter.post("/addPoints/:id", async (request, response) => {
  try {
    const user = await User.findOne({
      _id: new mongodb.ObjectId(request.params.id),
    });
    if (!user) {
      response.status(404).send(`User ${request.params.id} not found`);
      return;
    }
    const updatedUser = await User.updateOne(
      {_id: new mongodb.ObjectId(request.params.id)},
      {$set: {points: user.points + 1}}
    );
    if (!updatedUser) {
      throw new Error("Error updating user");
    }
    response.status(200).send(updatedUser);
  } catch (error) {
    response.status(500).send(error);
  }
});
