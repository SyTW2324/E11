import bcrypt from "bcrypt";
import joi from "joi";
import * as express from "express";
import { User } from "../models/user";
import { genAuthToken } from "../utils/genAuthToken";

export const registerRouter = express.Router();
registerRouter.use(express.json());

// POST /register crear un nuevo user
registerRouter.post("/", async (request, response) => {
  try {
    const schema = joi.object({
      username: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
    });
    const validation = schema.validate(request.body);
    if (validation.error) {
      response.status(422).send(validation.error);
      return;
    }

    let user = await User.findOne({ username: request.body.username });
    if (user) {
      response.status(409).send("El usuario ya existe");
      return;
    }

    user = await User.findOne({ email: request.body.email });
    if (user) {
      response.status(409).send("El email ya existe");
      return;
    }

    user = new User({
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save();
    if (!result) {
      response.status(500).send("Error al crear el usuario");
      return;
    }

    const token = genAuthToken(user);

    response.send(token).status(201);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error en el servidor");
  }
});
