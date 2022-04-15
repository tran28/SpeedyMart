import express from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../util/GenerateToken.js";
import User from "./../models/UserModel.js";
import { protect, admin } from "../util/AuthUtil.js";

const userRoute = express.Router();

// Get all users
// ** add authentication to this later!! **
userRoute.get(
    "/",
    protect,
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

// Get current user info
userRoute.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Modify user info
userRoute.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      // if user exists then update with new data from body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.address = req.body.address || user.address;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        address: updatedUser.address,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  })
);

export default userRoute;