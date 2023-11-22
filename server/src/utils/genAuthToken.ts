import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const genAuthToken = (user : any) => {
  console.log(process.env);
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