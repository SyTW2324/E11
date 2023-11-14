import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  connect(
    process.env.ATLAS_URI ||
      "mongodb+srv://user:user@cluster0.2wuhxag.mongodb.net/wildle?retryWrites=true&w=majority"
  );
  console.log("Connected to database");
} catch (error) {
  console.error(error);
  process.exit(1);
}
