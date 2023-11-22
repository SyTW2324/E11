import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env")});

export const genAuthToken = (user : any) => {
  const secret_key = process.env.JWT_SECRET_KEY

  if (!secret_key) {
    throw new Error("Falta la clave secreta");
  }

  const token = Jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    secret_key as string
  );
  return token;
};

export default genAuthToken;