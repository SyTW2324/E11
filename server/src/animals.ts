import * as mongodb from "mongodb";

export interface Animal {
  name: string;
  image: string;
  class: string;
  weight: number;
  height: number;
  diet: string;
  habitat: string;
  medium: string;
  _id?: mongodb.ObjectId;
}