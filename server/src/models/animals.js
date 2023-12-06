"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const mongoose_1 = require("mongoose");
const AnimalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    searchName: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    class: {
        type: String,
        required: true,
        enum: ["Mamífero", "Ave", "Reptil", "Anfibio", "Pez"],
    },
    weight: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("El peso debe ser mayor a 0");
            }
        },
    },
    height: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("La altura debe ser mayor a 0");
            }
        },
    },
    diet: {
        type: String,
        required: true,
        enum: ["Carnívoro", "Herbívoro", "Omnívoro"],
    },
    habitat: [
        {
            type: String,
            required: true,
        },
    ],
    medium: [
        {
            type: String,
            required: true,
            enum: ["Tierra", "Agua", "Aire"],
        },
    ],
});
exports.Animal = (0, mongoose_1.model)("Animal", AnimalSchema);
