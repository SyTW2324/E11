import express from "express";
import "./database";
import {animalsRouter} from "./routes/api/animals.routes";
import {userRouter} from "./routes/api/user.routes";
import cors from "cors";
import verifyJWT from "./middleware/verifyJWT";
import errorHandler from "./middleware/errorHandler"
import credentials from "./middleware/credentials"


const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use("/animals", animalsRouter);
app.use("/users", userRouter);

app.use("/auth", require("./routes/auth.routes"));
app.use("/register", require("./routes/register.routes"));
app.use("/refresh", require("./routes/refreshToken.routes"));
app.use("logout", require("./routes/logout.routes"));
app.use(verifyJWT);
app.use(credentials);
app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
