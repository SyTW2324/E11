import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import {connectToDatabase} from "./database";
import {animalsRouter} from "./animals.routes";
import {userRouter} from "./user.routes";

dotenv.config();

const ATLAS_URI = process.env.ATLAS_URI || "mongodb+srv://admin:admin@cluster0.2wuhxag.mongodb.net/?retryWrites=true&w=majority"

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/animals", animalsRouter);
    app.use("/users", userRouter);

    app.listen(5000, () => {
      console.log(`Server running at http://localhost:5000...`);
    });
  })
  .catch((error) => console.error(error));
