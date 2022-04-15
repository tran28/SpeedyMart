import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../util/AuthUtil.js";
import Order from "./../models/OrderModel.js";

const orderRoute = express.Router();

// Create new order
orderRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("There are no items in this order! Please add some items first.");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
      });

      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  })
);

// Get all orders
// ** PROTECT THIS LATER!! **
orderRoute.get(
  "/all",
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email");
    res.json(orders);
  })
);

export default orderRoute;