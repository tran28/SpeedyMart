import express from 'express'
import path from 'path'
import cors from 'cors'
import connectDatabase from './db/MongoDB.js'
import dotenv from "dotenv";
import {fileURLToPath} from 'url';
import productRoute from './routes/ProductRoutes.js';
import userRoute from './routes/UserRoutes.js'
import orderRoute from './routes/OrderRoutes.js';
import newrelic from 'newrelic';
import logger from 'morgan';
import { S3StreamLogger } from 's3-streamlogger';
import async from 'async';
import AWS from 'aws-sdk';

const app = express()
dotenv.config();
 
// AWS S3 bucket logs settings
var BUCKET = 'speedymart';
var PREFIX = 'logs';
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

/*
// For sending logs to aws s3 bucket
var s3stream = new S3StreamLogger({
  bucket: "speedymart",
  folder: "logs",
  access_key_id: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY
});
*/

// Morgan logger
app.use(logger(':remote-addr :remote-user [:date[clf]] :method :url :status :res[content-length] - :response-time ms **', {
  stream: s3stream
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

/*
// Get logs from s3 bucket
app.get('/logs', function(req,res){
  var output = "";
  var s3 = new AWS.S3();
  var params = {
    Bucket: BUCKET,
    Prefix: PREFIX
  }

  s3.listObjects(params, function(err, data){
    if (err) return console.log(err);
    // Only get the latest files
    const selected = data.Contents.slice(-8);

    async.eachSeries(selected, function(fileObj, callback){
      var key = fileObj.Key;
      //console.log('Downloading: ' + key);

      var fileParams = {
        Bucket: BUCKET,
        Key: key
      }

      s3.getObject(fileParams, function(err, fileContents){
        if (err) {
          callback(err);
        } else {
          // Read the file
          var contents = fileContents.Body.toString();
          output += contents.replaceAll("**",'\n');
          callback();
        }
      });
    }, function(err) {
      if (err) {
        console.log('Failed: ' + err);
      } else {
        //console.log('Finished');
        res.send(output.split('\n').reverse().join("\r\n"));
      }
    });
  });

  
 }); 
 */

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Server port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})