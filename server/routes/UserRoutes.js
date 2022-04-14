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
      throw new Error("Invalid user data");
    }
  })
);

// Login
userRoute.post(
    "/login",
    asyncHandler(async (req, res) => {
      const { email, password } = req.body;
      // Check if user exists
      const user = await User.findOne({ email });
      // Authenticate based on password
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
          createdAt: user.createdAt,
        });
      } else {
        res.status(401);
        throw new Error("Invalid email or password! Please try again.");
      }
    })
  );

export default userRoute;