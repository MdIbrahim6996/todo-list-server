import { generateToken } from "../../app/utils/generateToken";
import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { app } from "../../app";
import config from "config";


it.skip("generate token", ()=>{
  const sut = generateToken
  const result = sut("userId")
  console.log(result);
  
  expect(result).toBeDefined()
})

// it("generate token", async () => {
//   // const sut = generateToke
//   const res = await request(app).get(`/api/todo`);
//   expect(res.body).toHaveLength(2);
// }, 10000);
