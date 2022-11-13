const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

require('dotenv').config()

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello server")
  })
  
process.on('unhandledRejection', (err, promise) => {
    console.log(`Алдаа гарлаа: ${err.message}`)
    server.close(() => {
        process.exit(1)
    })
  })