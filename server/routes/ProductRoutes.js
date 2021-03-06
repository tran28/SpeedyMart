import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../models/ProductModel.js";
import { protect, admin } from "../util/AuthUtil.js";

const productRoute = express.Router();

// Get all products
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// Get all products by brand
productRoute.get(
  "/brand",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          brand: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// Get all products by brand
productRoute.get(
  "/category",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          category: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// Get all products (no pageination)
productRoute.get(
  "/all",
  asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword })
      .sort({ _id: -1 });
    res.json(products);
  })
);

// Get a single product by id
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      // If product is found then return it
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  })
);

// Create Product
productRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const existingProduct = await Product.findOne({ name });
    if (!existingProduct) {
      // Create a new product
      const product = new Product({
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      });
      if (product) {
        // Try to save the new product to database
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Could not create new product!");
      }
    } else {
      // Product of the same name already exists!
      res.status(400);
      throw new Error("A product by that name already exists!");
    }
  })
);

// Update product by id
productRoute.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      // if product is found then update it with information from the body.
      // otherwise keep existing data
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  })
);

// Delete product by id
productRoute.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      // if product is found then delete it
      await product.remove();
      res.json({ message: "Product deleted! (name: " + product.name + ", id: " + product.id + ")" });
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  })
);

// Add product review by product id
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // Create review
      const review = {
        rating: Number(rating),
        comment
      };
      if (review) {
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        // find average reviews
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review added to '" + product.name + "'!" });
      } else {
        res.status(404);
        throw new Error("Product not Found");
      }
    }
  })
);

export default productRoute;