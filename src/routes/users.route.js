// Import Express.
import express from "express";

// Controllers.
import * as userController from "../controllers/users.controller.js";

// Initialise Express router.
const userRouter = express.Router();

// Create new User.
userRouter.post("/", userController.createUser);

// Read specific User by ID.
userRouter.get("/:id", userController.getUser);

// Update User.
userRouter.put("/:id", userController.updateUser);

// Delete User.
userRouter.delete("/:id", userController.deleteUser);

// Login User.
userRouter.post("/login", userController.loginUser);

export default userRouter;
