import express from 'express';
import bodyParser from 'body-parser';
import {createReadStream} from 'fs';
import http from 'http';
import crypto from 'crypto';
import appSrc from './app.js';
import mongoose  from 'mongoose';
import fetch from 'node-fetch';

const app = appSrc(express, bodyParser, createReadStream, crypto, http, mongoose,fetch);

app.listen(process.env.PORT || 5000);
