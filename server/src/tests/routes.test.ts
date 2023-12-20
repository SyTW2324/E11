import request from "supertest";
import {expect} from "chai";
import {app} from "../server";
import mongoose from "mongoose";

beforeAll(async () => {
  await request(app).post("/register").send({
    username: "test",
    password: "test",
    email: "test@gmail.com",
  });
  await request(app)
    .get("/user/name/test2")
    .then((res) => {
      if (res.body) {
        return request(app).delete("/user/" + res.body._id);
      }
    });
});

afterAll(async () => {
  await request(app)
    .get("/user/name/test")
    .then((res) => {
      if (res.body) {
        return request(app).delete("/user/" + res.body._id);
      }
    });
  await request(app)
    .get("/user/name/test2")
    .then((res) => {
      if (res.body) {
        return request(app).delete("/user/" + res.body._id);
      }
    });
  await mongoose.connection.close();
});

describe("user routes", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/user");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should get a user by id", async () => {
    const res = await request(app).get("/user/name/test");
    const res2 = await request(app).get("/user/" + res.body._id);
    expect(res2.status).to.equal(200);
    expect(res2.body).to.be.an("object");
  });

  it("shouldnt get a user by id", async () => {
    const res = await request(app).get("/user/1234");
    expect(res.status).to.equal(500);
    expect(res.body).to.be.an("object");
  });

  it("should get a user by name", async () => {
    const res = await request(app).get("/user/name/test");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("shouldnt get a user by name", async () => {
    const res = await request(app).get("/user/name/test2");
    expect(res.status).to.equal(404);
    expect(res.body).to.be.an("object");
  });

  it("should delete a user", async () => {
    const res = await request(app).get("/user");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("shouldnt delete a user", async () => {
    const res = await request(app).delete("/user/1234");
    expect(res.status).to.equal(500);
    expect(res.body).to.be.an("object");
  });

  it("should add points to user", async () => {
    const res = await request(app).get("/user/name/test");
    const res2 = await request(app).post("/user/addPoints/" + res.body._id);
    expect(res2.status).to.equal(200);
    expect(res2.body).to.be.an("object");
  });

  it("shouldnt add points to user", async () => {
    const res = await request(app).post("/user/addPoints/1234");
    expect(res.status).to.equal(500);
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

  it("shouldnt get an animal by name", async () => {
    const res = await request(app).get("/animals/name/Noexiste");
    expect(res.status).to.equal(404);
    expect(res.body).to.be.an("object");
  });

  it("should get animals by a similar name", async () => {
    const res = await request(app).get("/animals/name_like/Serp");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("shouldnt get animals by a similar name", async () => {
    const res = await request(app).get("/animals/name_like/");
    expect(res.status).to.equal(404);
    expect(res.body).to.be.an("object");
  });
});

describe("register routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/register").send({
      username: "test2",
      password: "test2",
      email: "test2@gmail.com",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });
  it("shouldnt register a new user - wrong schema", async () => {
    const res = await request(app).post("/register").send({
      username: "test3",
      password: "test3",
    });
    expect(res.status).to.equal(422);
    expect(res.body).to.be.an("object");
  });
  it("shouldnt register a new user - email already exists", async () => {
    const res = await request(app).post("/register").send({
      username: "test3",
      password: "test3",
      email: "test@gmail.com",
    });
    expect(res.status).to.equal(409);
    expect(res.body).to.be.an("object");
  });
  it("shouldnt register a new user - username already exists", async () => {
    const res = await request(app).post("/register").send({
      username: "test",
      password: "test3",
      email: "test3@gmail.com",
    });
    expect(res.status).to.equal(409);
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
  it("shouldnt login a user - wrong schema", async () => {
    const res = await request(app).post("/login").send({
      password: "test",
      email: "notanemail",
    });
    expect(res.status).to.equal(422);
    expect(res.body).to.be.an("object");
  });
  it("shouldnt login a user - wrong password", async () => {
    const res = await request(app).post("/login").send({
      password: "wrong",
      email: "test@gmail.com",
    });
    expect(res.status).to.equal(401);
    expect(res.body).to.be.an("object");
  });
  it("shouldnt login a user - email not found", async () => {
    const res = await request(app).post("/login").send({
      password: "test",
      email: "wrong@gmail.com",
    });
    expect(res.status).to.equal(404);
    expect(res.body).to.be.an("object");
  });
});
