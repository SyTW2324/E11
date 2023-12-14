"use strict";
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
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("../server");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
describe("server tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post("/register").send({
            username: "test",
            password: "test",
            email: "test@gmail.com",
        });
    }));
    context("user routes", () => {
        it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).get("/user");
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.be.an("array");
        }));
        it("should delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).delete("/user").send({
                username: "test",
                password: "test",
                email: "test@gmail.com",
            });
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.be.an("object");
        }));
    });
    context("animal routes", () => {
        it("should get all animals", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).get("/animals");
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.be.an("array");
        }));
        it("should get a random animal", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).get("/animals/random");
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.be.an("object");
        }));
        it("should get an animal by name", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).get("/animals/name/Serpiente");
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.be.an("object");
        }));
    });
    context("register routes", () => {
        it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).post("/register").send({
                username: "test",
                password: "test",
                email: "test@gmail.com",
            });
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.be.an("object");
        }));
    });
    context("login routes", () => {
        it("should login a user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.app).post("/login").send({
                password: "test",
                email: "test@gmail.com",
            });
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).to.be.an("object");
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).delete("/user").send({
            username: "test",
            password: "test",
            email: "test@gmail.com",
        });
        mongoose_1.default.connection.close();
    }));
});
