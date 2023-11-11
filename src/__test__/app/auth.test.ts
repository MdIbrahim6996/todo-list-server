import { describe, it, expect, beforeEach } from "@jest/globals";
const mockingoose = require("mockingoose");
import User from "../../app/models/user.model";
import request from "supertest";
import { app } from "../../app";

const registerPayload = {
  name: "user1",
  email: "user1@email.com",
  password: "123456",
};

describe("AUTHENTICATION", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("register", async () => {
    mockingoose(User).toReturn(registerPayload, "save");
    const res = await request(app)
      .post(`/api/auth/register`)
      .send(registerPayload);

    expect(res.statusCode).toBe(200);
  }, 10000);

  it("register twice", async () => {
    mockingoose(User).toReturn(
      { status: 500, message: "User ALready Exist" },
      "findOne"
    );
    const res = await request(app)
      .post(`/api/auth/register`)
      .send(registerPayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User ALready Exist");
  }, 10000);

  it.skip("login", async () => {
    const loginPayload = {
      email: "user1@email.com",
      password: "123456",
    };
    mockingoose(User).toReturn(registerPayload, "save");
    const resp = await request(app)
      .post(`/api/auth/register`)
      .send(registerPayload);

    mockingoose(User).toReturn(loginPayload, "find");
    const res = await request(app)
      .post(`/api/auth/login`)
      .send(registerPayload);
    console.log("first", resp.body);

    console.log("second", res.body);

    expect(res.statusCode).toBe(200);
  }, 10000);
});
