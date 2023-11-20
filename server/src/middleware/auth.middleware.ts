import jwt from "jsonwebtoken";

export const authMiddleware = (request: any, response: any, next: any) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your_secret_key");
    request.user = decoded;
    next();
  } catch (error) {
    response.status(401).send("Invalid token");
  }
};
