import { generateToken } from "../../app/utils/generateToken";
import { it, expect } from "@jest/globals";



it("generate token", ()=>{
  const sut = generateToken
  const result = sut("userId")
  
  expect(result).toBeDefined()
})

