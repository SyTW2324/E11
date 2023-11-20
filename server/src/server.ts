import express from "express";
import "./database";
import {animalsRouter} from "./routes/animals.routes";
import {userRouter} from "./routes/user.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/animals", animalsRouter);
app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
