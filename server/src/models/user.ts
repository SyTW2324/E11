import * as mongodb from "mongodb";
import {Document, model, Schema} from "mongoose";

export interface UserInterface extends Document {
  _id?: mongodb.ObjectId;
  username: string;
  password: string;
  email: string;
  image: string;
  points: number;
  friends?: mongodb.ObjectId[];
}

const UserSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required:true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value: string) {
      const emailRegex = new RegExp(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      );
      if (!emailRegex.test(value)) {
        throw new Error("El email no es válido");
      }
    },
  },
  points: {
    type: Number,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Los puntos deben ser mayor a 0");
      }
    },
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const User = model<UserInterface>("User", UserSchema);
