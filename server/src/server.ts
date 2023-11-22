import express from "express";
import "./database";
import cors from "cors";
import { animalsRouter } from "./routes/animals.routes";
import { userRouter } from "./routes/user.routes";
import { User } from "./models/user";
import { Animal } from "./models/animals";
import { registerRouter } from "./routes/register.routes";
import { loginRouter } from "./routes/login.routes";
require('dotenv').config();

export const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use("/animals", animalsRouter);
app.use("/user", userRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
