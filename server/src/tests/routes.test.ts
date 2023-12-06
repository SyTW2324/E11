import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import { app } from "../server";
import { after } from "mocha";

require("dotenv").config();

beforeAll(async () => {
  const res = await request(app).post("/register").send({
    username: "test",
    password: "test",
    email: "test@gmail.com",
  });
});

afterAll(() => {
    mongoose.connection.close();
  });

describe("user routes", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/user");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should delete a user", async () => {
    const res = await request(app).delete("/user").send({
      username: "test",
      password: "test",
      email: "test@gmail.com",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });
});

describe("animal routes", () => {
  it("should get all animals", async () => {
    const res = await request(app).get("/animals");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should get a random animal", async () => {
    const res = await request(app).get("/animals/random");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("should get an animal by name", async () => {
    const res = await request(app).get("/animals/name/Serpiente");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });
});

describe("register routes", () => {
  it("should post a new user", async () => {
    const res = await request(app).post("/register").send({
      username: "test",
      password: "test",
      email: "test@gmail.com",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });
});

describe("login routes", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/login").send({
      password: "test",
      email: "test@gmail.com",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("should delete a user", async () => {
    const res = await request(app).delete("/login").send({
      password: "test",
      email: "test@gmail.com",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });
});
