import express from "express";
import "./database";
import { animalsRouter } from "./routes/animals.routes";
import { userRouter } from "./routes/user.routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/animals", animalsRouter);
app.use("/users", userRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
