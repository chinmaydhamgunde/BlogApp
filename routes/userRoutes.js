import express from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../controller/userController.js";

const router = express.Router();

//get all users
router.get("/all-users", getAllUsers);

//create user
router.post("/register", registerController);

//login
router.post("/login", loginController);

export default router;
