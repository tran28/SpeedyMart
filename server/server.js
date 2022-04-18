import express from 'express'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import connectDatabase from './db/MongoDB.js'
import dotenv from "dotenv";
import {fileURLToPath} from 'url';
import productRoute from './routes/ProductRoutes.js';
import userRoute from './routes/UserRoutes.js'
import orderRoute from './routes/OrderRoutes.js';
import newrelic from 'newrelic';
import logger from 'morgan';


const app = express()
dotenv.config();

// Morgan logger
app.use(logger('combined', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(logger('dev'));

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
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

// For load testing
app.get('/loaderio-3a70303fad2057ab6e91ee83d9cade1f', function(req,res){
  res.sendFile(__dirname + '/loaderio-3a70303fad2057ab6e91ee83d9cade1f.txt');
 }); 

// Get logs
app.get('/logs', function(req,res){
  res.sendFile(__dirname + '/access.log');
 }); 

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Server port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})