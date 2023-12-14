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
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalsRouter = void 0;
const express = __importStar(require("express"));
const animals_1 = require("../models/animals");
exports.animalsRouter = express.Router();
exports.animalsRouter.use(express.json());
// GET /animals
exports.animalsRouter.get("/", (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animals = yield animals_1.Animal.find({});
        if (!animals) {
            throw new Error("Animals collection not found");
        }
        response.status(200).send(animals);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// GET /animals/random
exports.animalsRouter.get("/random", (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomAnimal = yield animals_1.Animal.aggregate([{ $sample: { size: 1 } }]);
        if (!randomAnimal || randomAnimal.length === 0) {
            throw new Error("No animals found in the collection");
        }
        response.status(200).send(randomAnimal[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
}));
// GET /animals/name/:name
exports.animalsRouter.get("/name/:name", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animal = yield animals_1.Animal.findOne({
            name: request.params.name,
        });
        if (!animal) {
            response.status(404).send(`Animal ${request.params.name} not found`);
            return;
        }
        response.status(200).send(animal);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// GET /animals/name_like/:name
exports.animalsRouter.get("/name_like/:name", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animal = yield animals_1.Animal.find({
            searchName: { $regex: request.params.name, $options: "i" },
        });
        if (!animal) {
            response.status(404).send(`Animal ${request.params.name} not found`);
            return;
        }
        response.status(200).send(animal);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
