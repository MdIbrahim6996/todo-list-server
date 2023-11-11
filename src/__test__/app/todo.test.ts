import { describe, it, expect, beforeEach } from "@jest/globals";
import request from "supertest";
const mockingoose = require("mockingoose");
import { app } from "../../app";
import Todo from "../../app/models/todo.model";
const doc = [
  {
    _id: "654cd37d1460edbceb45074a",
    title: "Update",
    description: "First",
    createdAt: "2023-11-09T12:41:33.579Z",
    updatedAt: "2023-11-09T12:48:10.993Z",
    __v: 0,
  },
  {
    _id: "654cd37d1460edbceb45074a",
    title: "Update",
    description: "First",
    createdAt: "2023-11-09T12:41:33.579Z",
    updatedAt: "2023-11-09T12:48:10.993Z",
    __v: 0,
  },
];
describe("TODOS", () => {
  beforeEach(() => mockingoose.resetAll());

  it("gets all todos", async () => {
    mockingoose(Todo).toReturn(doc, "find");
    const res = await request(app).get(`/api/todo`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(doc);
  });

  it("create todo", async () => {
    const postBody = {
      title: "Update",
      description: "First",
    };
    mockingoose(Todo).toReturn(doc[0], "save");
    const res = await request(app).post(`/api/todo/create`).send(postBody);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(doc[0].title);
  });

  it("get single todo", async () => {
    const postBody = {
      _id: "654cd37d1460edbceb45074a",
      title: "Update",
      description: "First",
    };
    mockingoose(Todo).toReturn(doc[0], "findOne");
    const res = await request(app).get(`/api/todo/${postBody._id}`);
    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(doc[0].title);
  });

  it("update a todo", async () => {
    const postBody = {
      _id: "654cd37d1460edbceb45074a",
      title: "Update",
      description: "First",
    };
    mockingoose(Todo).toReturn(doc[0], "findOneAndUpdate");
    const res = await request(app)
      .put(`/api/todo/${postBody._id}`)
      .send(postBody);
    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(postBody.title);
  });

  it("delete a todo", async () => {
    const postBody = {
      _id: "654cd37d1460edbceb45074a",
      title: "Update",
      description: "First",
    };
    
    mockingoose(Todo).toReturn(doc[0], "findOneAndDelete");
    const res = await request(app).delete(`/api/todo/${postBody._id}`);
    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(postBody.title);
  });
});
