"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("./database");
const cors_1 = __importDefault(require("cors"));
const animals_routes_1 = require("./routes/animals.routes");
const user_routes_1 = require("./routes/user.routes");
const register_routes_1 = require("./routes/register.routes");
const login_routes_1 = require("./routes/login.routes");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
exports.app.use("/animals", animals_routes_1.animalsRouter);
exports.app.use("/user", user_routes_1.userRouter);
exports.app.use("/register", register_routes_1.registerRouter);
exports.app.use("/login", login_routes_1.loginRouter);
exports.app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});
exports.app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
