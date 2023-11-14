import express from "express";
import "./database";
import {animalsRouter} from "./animals.routes";
import {userRouter} from "./user.routes";

const app = express();
app.use(express.json());
app.use("/animals", animalsRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
