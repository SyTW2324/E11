"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const expresponses = __importStar(require("express"));
const mongodb = __importStar(require("mongodb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userRouter = expresponses.Router();
exports.userRouter.use(expresponses.json());
// GET /users buscar todos
exports.userRouter.get("/", (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({});
        if (!users) {
            throw new Error("User collection not found");
        }
        response.status(200).send(users);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// GET /users/:id buscar por id
exports.userRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({
            _id: new mongodb.ObjectId(request.params.id),
        });
        if (!user) {
            response.status(404).send(`User ${request.params.id} not found`);
            return;
        }
        response.status(200).send(user);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// GET /users/:name buscar por nombre
exports.userRouter.get("/name/:name", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({
            username: request.params.name,
        });
        if (!user) {
            response.status(404).send(`User ${request.params.name} not found`);
            return;
        }
        response.status(200).send(user);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// POST /user crear un nuevo user
exports.userRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_1.User(request.body);
        const result = yield user.save();
        response.status(200).send(result);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Busca el usuario en la base de datos
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        return res.status(400).send("Invalid email or password");
    }
    // Compara la contraseña proporcionada con la del usuario
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send("Invalid email or password");
    }
    // Genera un token de JWT
    const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, "your_jwt_secret");
    // Envía el token al cliente
    res.send(token);
}));
exports.userRouter.post("/register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_1.User(request.body);
        const result = yield user.save();
        const token = jsonwebtoken_1.default.sign({
            username: user.username,
            password: user.password,
        }, "secret", { expiresIn: "1h" });
        response.status(200).send({ token });
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// PATCH /users/:id modificacion con filtro
exports.userRouter.patch("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allowedUpdates = ["username", "password", "email", "image"];
        const updates = Object.keys(request.body);
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidUpdate) {
            response.status(400).send({ error: "Invalid update" });
            return;
        }
        const user = yield user_1.User.findOneAndUpdate({
            _id: new mongodb.ObjectId(request.params.id),
        }, request.body, { new: true, runValidators: true });
        if (!user) {
            response.status(404).send(`User ${request.params.id} not found`);
            return;
        }
        response.status(200).send(user);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// PUT /users/:id modificacion total
exports.userRouter.put("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOneAndReplace({
            _id: new mongodb.ObjectId(request.params.id),
        }, request.body, { new: true, runValidators: true });
        if (!user) {
            response.status(404).send(`User ${request.params.id} not found`);
            return;
        }
        response.status(200).send(user);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// DELETE /users/:id
exports.userRouter.delete("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.User.findOne({
            _id: new mongodb.ObjectId(request.params.id),
        });
        if (!deletedUser) {
            response.status(404).send(`User ${request.params.id} not found`);
            return;
        }
        const users = yield user_1.User.find({});
        if (!users) {
            throw new Error("User collection not found");
        }
        users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.friends) {
                const index = user.friends.indexOf(deletedUser._id);
                if (index > -1) {
                    user.friends.splice(index, 1);
                    yield user.save();
                }
            }
        }));
        const result = yield user_1.User.deleteOne({
            _id: new mongodb.ObjectId(request.params.id),
        });
        response.status(200).send(result);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
