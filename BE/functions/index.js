require('dotenv').config();
const cors = require('cors');
const express = require('express')
const app = express()
// const port = process.env.PORT || 3000
const router = require('./routes');
const serverles = require('serverless-http');

app.use(cors());

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// app.use(router);

// app.listen(port, () => console.log(`Running on port ${port}`))
app.use('/.netlify/functions/index', router);

module.exports.handler = serverles(app);