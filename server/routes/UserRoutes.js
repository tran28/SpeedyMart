import express from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../util/GenerateToken.js";
import User from "./../models/UserModel.js";
import { protect, admin } from "../util/AuthUtil.js";
import Product from "./../models/ProductModel.js";

const userRoute = express.Router();

// Get all users
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
        address: user.address,
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

// Get current user cart
userRoute.get(
  "/cart",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        address: user.address,
        cart: user.cart,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Modify user cart
userRoute.put(
  "/cart",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      // if user exists then update with new data from body
      user.cart = req.body.cart || user.cart;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        cart: updatedUser.cart,
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  })
);

// Add one item to user cart based on id
userRoute.put(
  "/cart/add/:id",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      // if user exists then update with new data
      const product = await Product.findById(req.params.id);
      const newQty = parseInt(req.body.qty);
      if (product) {
        // Product exists in shop, add 1 qty to the user cart
        const itemInCart = user.cart.find(item => JSON.stringify(item.product._id) === JSON.stringify(product._id));
        if(itemInCart) {
          // If product already in the cart, increment qty
          itemInCart.qty += newQty || 1;
          //res.json(itemInCart)
        } else {
          // else add as a new item to cart
          user.cart.push({
            name: product.name,
            qty: newQty || 1,
            image: product.image,
            price: product.price,
            product: product._id,
          })
        }

        const updatedUser = await user.save();
        res.json(updatedUser.cart);

      } else {
        res.status(404);
        throw new Error("Product not found!");
      }
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  })
);

// Remove one item to user cart based on id
userRoute.put(
  "/cart/remove/:id",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      // if user exists then update with new data
      const product = await Product.findById(req.params.id);
      const newQty = parseInt(req.body.qty);
      if (product) {
        // Product exists in shop, remove 1 qty to the user cart
        const itemInCart = user.cart.find(item => JSON.stringify(item.product._id) === JSON.stringify(product._id));
        if(itemInCart){
          // Item exists in cart
          if(itemInCart.qty <= (newQty || 1)) {
            // Remove entirely from cart
            user.cart = user.cart.filter(item => JSON.stringify(item.product._id) !== JSON.stringify(product._id))
            
          } else {
            // If more than one of the item in the cart then decrement qty
            itemInCart.qty -= newQty || 1;
          }
        } else {
          // Item is not in cart
          res.status(404);
          throw new Error("Product is not in the current user's cart!");
        }

        const updatedUser = await user.save();
        res.json(updatedUser.cart);

      } else {
        res.status(404);
        throw new Error("Product not found!");
      }
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  })
);

export default userRoute;