import bcrypt from "bcrypt";
import joi from "joi";
import * as express from "express";
import { User } from "../models/user";
import { genAuthToken } from "../utils/genAuthToken";

export const loginRouter = express.Router();
loginRouter.use(express.json());

// POST /login crear un nuevo user
loginRouter.post("/", async (request, response) => {
  try {
    console.log(request.body);
    const schema = joi.object({
      password: joi.string().required(),
      email: joi.string().required().email(),
    });
    const validation = schema.validate(request.body);
    if (validation.error) {
      response.status(400).send(validation.error);
      return;
    }

    let user = await User.findOne({ email: request.body.email });
    if (!user) {
      response.status(400).send("El email no existe");
      return;
    }

    const validPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!validPassword) {
      response.status(400).send("La contraseña no es válida");
      return;
    }

    const token = genAuthToken(user);

    response.send({ token });
  } catch (error) {
    console.log(error);
    response.status(500).send("Error en el servidor");
  }
});