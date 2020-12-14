import express from 'express';
import bodyParser from 'body-parser';
import fs, {createReadStream} from 'fs';
import http from 'http';
import crypto from 'crypto';
import appSrc from './app.js';
import mongoose  from 'mongoose';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer'

const app = appSrc(express, bodyParser, createReadStream, crypto, http, mongoose, fetch, fs);

app.listen(process.env.PORT || 5000);
