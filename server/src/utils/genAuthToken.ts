import Jwt from "jsonwebtoken";

export const genAuthToken = (user : any) => {
  const secret_key = process.env.JWT_SECRET_KEY

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