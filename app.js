const appSrc = (express, bodyParser, createReadStream, crypto, http)=>{
  const app = express();
  app.use(bodyParser.text());
  const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers':'CORS,my,Content-Type,Accept,Access-Control-Allow-Headers'
  };
  app.get('/login/', (req, res) => {
    res.set(CORS);
    res.send('rip123123')
  });
  app.get('/code/', (req, res) => {
    res.set(CORS);
    var readStream = createReadStream(__dirname+`\\app.js`);
    // var readStream = createReadStream(import.meta.url.substring(7));
    readStream.on('data', function (chunk) { 
    res.send(chunk.toString())
    }); 
  });
  app.get('/sha1/', (req, res) => {
    res.set(CORS);
    const forCode = req.query.input;
    const shasum = crypto.createHash('sha1')
    shasum.update(forCode)
    res.send(shasum.digest('hex'))
  });
  app.get('/req/', (req, res) => {
    res.set(CORS);
    const adress = req.query.addr;
    console.log(adress)
    http.get(adress,(resp)=>{
      resp.on('data', function (chunk) {
        res.send(chunk+'');
      });
      
    })
  });
  app.post('/req/', (req, res) => {
    res.set(CORS);
    const adress = req.body;
    console.log(adress)
    http.get(adress,(resp)=>{
      resp.on('data', function (chunk) {
        res.send(chunk+'');
      });
      
    })
  });
  return app;
}
// const getBody = (adress)=>{
//   http.get(adress,(resp)=>{
//     resp.on('data', function (chunk) {
//       return chunk
//     });
//   })
// }
module.exports = {
  appSrc
};
// export default appSrc;
