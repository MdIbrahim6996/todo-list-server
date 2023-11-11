import { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  displayName: {
    name: "CLIENT",
    color: "blue",
  },
 
};

export default config;
