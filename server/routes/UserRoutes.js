import express from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../util/GenerateToken.js";
import User from "./../models/UserModel.js";

const userRoute = express.Router();

// Get all users
// ** add authentication to this later!! **
userRoute.get(
    "/",
    asyncHandler(async (req, res) => {
      const users = await User.find({});
      res.json(users);
    })
  );

// Register and create user
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

export default userRoute;