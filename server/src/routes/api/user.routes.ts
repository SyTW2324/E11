import * as expresponses from "express";
import * as mongodb from "mongodb";
import bcrypt from 'bcrypt';
import { User } from "../../models/user";
import JWT from "jsonwebtoken";

export const userRouter = expresponses.Router();
userRouter.use(expresponses.json());

// GET /users buscar todos
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

// GET /users/:id buscar por id
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

// GET /users/:name buscar por nombre
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
// POST /user crear un nuevo user
userRouter.post("/", async (request, response) => {
  try {
    const user = new User(request.body);
    const result = await user.save();
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Busca el usuario en la base de datos
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  // Compara la contraseña proporcionada con la del usuario
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).send('Invalid email or password');
  }

  // Genera un token de JWT
  const token = JWT.sign({ _id: user._id, email: user.email }, 'your_jwt_secret');

  // Envía el token al cliente
  res.send(token);
}
);

userRouter.post("/register", async (request, response) => {
  try {
    const user = new User(request.body);
    const result = await user.save();
    const token = JWT.sign(
      {
        username: user.username,
        password: user.password,
      },
      "secret",
      { expiresIn: "1h" }
    );
    response.status(200).send({ token });
  } catch (error) {
    response.status(500).send(error);
  }
});

// PATCH /users/:id modificacion con filtro
userRouter.patch("/:id", async (request, response) => {
  try {
    const allowedUpdates = ["username", "password", "email", "image"];
    const updates = Object.keys(request.body);
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      response.status(400).send({ error: "Invalid update" });
      return;
    }
    const user = await User.findOneAndUpdate(
      {
        _id: new mongodb.ObjectId(request.params.id),
      },
      request.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      response.status(404).send(`User ${request.params.id} not found`);
      return;
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// PUT /users/:id modificacion total
userRouter.put("/:id", async (request, response) => {
  try {
    const user = await User.findOneAndReplace(
      {
        _id: new mongodb.ObjectId(request.params.id),
      },
      request.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      response.status(404).send(`User ${request.params.id} not found`);
      return;
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE /users/:id
userRouter.delete("/:id", async (request, response) => {
  try {
    const deletedUser = await User.findOne({
      _id: new mongodb.ObjectId(request.params.id),
    });
    if (!deletedUser) {
      response.status(404).send(`User ${request.params.id} not found`);
      return;
    }
    const users = await User.find({});
    if (!users) {
      throw new Error("User collection not found");
    }
    users.forEach(async (user) => {
      if (user.friends) {
        const index = user.friends.indexOf(deletedUser._id);
        if (index > -1) {
          user.friends.splice(index, 1);
          await user.save();
        }
      }
    });
    const result = await User.deleteOne({
      _id: new mongodb.ObjectId(request.params.id),
    });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
