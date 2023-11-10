import * as mongodb from "mongodb";
import { Animal } from "./animals";
import { User } from "./user";

export const collections: {
  animals?: mongodb.Collection<Animal>;
  users?: mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("wildle");
  await applySchemaValidation(db);

  const animalsCollection = db.collection<Animal>("animals");
  collections.animals = animalsCollection;

  const usersCollection = db.collection<User>("users");
  collections.users = usersCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "image", "class", "weight", "height", "diet", "habitat", "medium"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        image: {
          bsonType: "string",
          description: "'image' is required and is a string",
        },
        class: {
          bsonType: "string",
          description: "'class' is required and is one of 'Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Pez'",
          enum: ["Mamífero", "Ave", "Reptil", "Anfibio", "Pez"],
        },
        weight: {
          bsonType: "double",
          description: "'weight' is required and is a double",
        },
        height: {
          bsonType: "double",
          description: "'height' is required and is a double",
        },
        diet: {
          bsonType: "string",
          description: "'diet' is required and is one of 'Carnívoro', 'Herbívoro', 'Omnívoro'",
          enum: ["Carnívoro", "Herbívoro", "Omnívoro"],
        },
        habitat: {
          bsonType: "string",
          description: "'habitat' is required and is a string",
        },
        medium: {
          bsonType: "string",
          description: "'medium' is required and is one of 'Terrestre', 'Acuático', 'Aéreo'",
          enum: ["Terrestre", "Acuático", "Aéreo"],
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it 
  await db.command({
    collMod: "animals",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === "NamespaceNotFound") {
      await db.createCollection("animals", { validator: jsonSchema });
    }
  });
}