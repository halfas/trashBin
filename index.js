const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const http = require('http');
const {appSrc} = require('./app');
//import appSrc from './app.js';

const app = appSrc(express, bodyParser, fs.createReadStream, crypto, http);
app.listen(3000);
// app.listen(process.env.PORT);