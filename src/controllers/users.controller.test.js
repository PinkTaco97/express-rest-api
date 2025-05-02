// Import the necessary modules and dependencies
import { it, jest } from "@jest/globals";
import DB from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Import the user controller functions
import * as userController from "./users.controller.js";

// Constants
import { HTTP_RESPONSE } from "../constants/common.constants.js";

// Mock the database connection and other dependencies
jest.mock("../database.js", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should return 400 if email or password is missing", async () => {
      await userController.createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_RESPONSE.BAD_REQUEST);
    });
  });
});
