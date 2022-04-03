import express from 'express'
import path from 'path'
import cors from 'cors'
import connectDatabase from './db/MongoDB.js'
import dotenv from "dotenv";
import {fileURLToPath} from 'url';
import productRoute from './routes/ProductRoutes.js';

const app = express()
dotenv.config();

let products = [
  {
    id: 1,
    content: "This is a product located on the backend",
  },
  {
    id: 2,
    content: "This is a shoe or something",
  },
  {
    id: 3,
    content: "This is a shirt",
  }
]

// Use Cross-Origin Resource Sharing to allow resources from other origins
app.use(cors())

// Json Parser built into express
app.use(express.json())

// Connect the MongoDB Atlas
connectDatabase();

// Priority serve any static files.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Answer API requests.
app.use("/api/products", productRoute);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Server port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})