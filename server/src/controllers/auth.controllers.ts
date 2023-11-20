import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/user";

export const login = async (request: Request, response: Response) => {
  try {
    const user = await User.findOne({
      username: request.body.username,
      password: request.body.password,
    });
    if (!user) {
      response.status(404).send("User not found");
      return;
    }
    const token = jwt.sign({ username: user.username }, "your_secret_key");

    response.status(200).send({ token });
  } catch (error) {
    response.status(500).send(error);
  }
};

export const register = async (request: Request, response: Response) => {
  try {
    const user = new User(request.body);

    const userExists = await User.findOne({
      username: request.body.username,
    });

    if (userExists) {
      response.status(404).send("User already exists");
      return;
    }

    const result = await user.save();

    if (user){
    }

  } catch (error) {
    response.status(500).send(error);
  }
};
