import * as mongodb from "mongodb";

export interface User {
  _id?: mongodb.ObjectId;
  username: string;
  password: string;
  image: string;
  email: string;
  points: number;
  friends?: mongodb.ObjectId[];
}
