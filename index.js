import express from 'express';
import bodyParser from 'body-parser';
import {createReadStream} from 'fs';
import http from 'http';
import crypto from 'crypto';
import appSrc from './app.js';
import mongoose  from 'mongoose';

const app = appSrc(express, bodyParser, createReadStream, crypto, http, mongoose);

app.listen(process.env.PORT || 5000);
