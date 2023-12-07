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
    const schema = joi.object({
      password: joi.string().required(),
      email: joi.string().required().email(),
    });
    const validation = schema.validate(request.body);
    if (validation.error) {
      response.status(422).send(validation.error);
      return;
    }

    let user = await User.findOne({ email: request.body.email });
    if (!user) {
      console.log("El email no existe");
      response.status(404).send("El email no existe");
      return;
    }

    const validPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!validPassword) {
      console.log("La contraseña no es válida");
      response.status(401).send("La contraseña no es válida");
      return;
    }

    const token = genAuthToken(user);

    response.status(200).send(token);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error en el servidor");
  }
});

