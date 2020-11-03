const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const options = {
  inflate: true,
  limit: 1000,
  type: ['text/plain', 'text/html']
};
app.use(express.json());

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello Express app!')
});

app.post('/result4/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', `origin, content-type, accept,  x-text`);
  res.setHeader('Content-Type', 'application/json');
  let data = {
    message: 'rip123123', 
    ['x-result']: req.get('x-test'),
    ['x-body']: req.body,   
  }
  console.log(req.body)
  
  res.send(JSON.stringify(data))
});
app.get('/login/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('rip123123')
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
