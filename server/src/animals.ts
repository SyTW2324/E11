import * as mongodb from "mongodb";
import { Document, model, Schema } from "mongoose";

export interface AnimalInterface extends Document {
  name: string;
  searchName: string;
  image: string;
  class: string;
  weight: number;
  height: number;
  diet: string;
  habitat: string[];
  medium: string[];
  _id?: mongodb.ObjectId;
}

const AnimalSchema = new Schema<AnimalInterface>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  searchName: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  class: {
    type: String,
    required: true,
    enum: ["Mamífero", "Ave", "Reptil", "Anfibio", "Pez"],
  },
  weight: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("El peso debe ser mayor a 0");
      }
    },
  },
  height: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("La altura debe ser mayor a 0");
      }
    },
  },
  diet: {
    type: String,
    required: true,
    enum: ["Carnívoro", "Herbívoro", "Omnívoro"],
  },
  habitat: [
    {
      type: String,
      required: true,
    },
  ],
  medium: [
    {
      type: String,
      required: true,
      enum: ["Tierra", "Agua", "Aire"],
    },
  ],
});

export const Animal = model<AnimalInterface>("Animal", AnimalSchema);
