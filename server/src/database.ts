import {connect} from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

try {
  connect(
    process.env.ATLAS_URI ||
      "mongodb+srv://admin:admin@cluster0.2wuhxag.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Database connected");
} catch (error) {
  console.error(error);
  process.exit(1);
}
