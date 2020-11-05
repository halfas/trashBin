const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const options = {
  inflate: true,
  limit: 1000,
  type: ['text/plain', 'text/html']
};
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.raw());
const CORS = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
'Access-Control-Allow-Headers':'x-test,CORS,my,Content-Type,Accept,Access-Control-Allow-Headers'
};

const parseRawBody = (req, res, next) => {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', (chunk) => {
    req.rawBody += chunk;
  });
  req.on('end', () => {
    next();
  });
}
app.use(parseRawBody);

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello Express app!')
});

app.post('/result4/', (req, res) => {
  res.set(CORS);
  res.setHeader('Content-Type', 'application/json');
  let data = {
    message: 'rip123123', 
    ['x-result']: req.get('x-test'),
    ['x-body']: req.rawBody,   
  }
  res.send(data)
});
app.get('/result4/', (req, res) => {
  res.set(CORS);
  res.setHeader('Content-Type', 'application/json');
  let data = {
    message: 'rip123123', 
    ['x-result']: req.get('x-test'),
    ['x-body']: req.rawBody,   
  }
  res.send(data)
});
app.delete('/result4/', (req, res) => {
  res.set(CORS);
  res.setHeader('Content-Type', 'application/json');
  let data = {
    message: 'rip123123', 
    ['x-result']: req.get('x-test'),
    ['x-body']: req.rawBody,   
  }
  res.send(data)
});
app.options('/result4/', (req, res) => {
  res.set(CORS);
  res.setHeader('Content-Type', 'application/json');
  let data = {
    message: 'rip123123', 
    ['x-result']: req.get('x-test'),
    ['x-body']: req.rawBody,   
  }
  res.send(data)
});
app.get('/login/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('itmo287663')
});
app.get('/promise/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('function task(x){ return new Promise((resolve,rejected) =>{x < 18 ? resolve("yes"): rejected("no")})}')
});
app.get('/fetch/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.sendFile(__dirname + '/index.html')
});
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
