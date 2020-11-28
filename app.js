export default (express, bodyParser, createReadStream, crypto, http)=>{
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
    res.set({'Content-Type': 'text/plain; charset=utf-8'});
    createReadStream(import.meta.url.substring(7)).pipe(res);
  });
  app.get('/sha1/:input/', (req, res) => {
    res.set(CORS);
    const forCode = req.params.input;
    const shasum = crypto.createHash('sha1')
    shasum.update(forCode)
    res.send(shasum.digest('hex'))
  });
  app.get('/req/', (req, res) => {
    res.set(CORS);
    const adress = req.query.addr;
    http.get(adress,(resp)=>{
      resp.on('data', function (chunk) {
        res.send(chunk+'');
      });
      
    })
  });
  app.post('/req/', (req, res) => {
    res.set(CORS);
    const adress = req.body.substring(8).slice(0, -1);
    http.get(adress,(resp)=>{
      resp.on('data', function (chunk) {
        res.send(chunk+'');
      });
      
    })
  });
    app.post('/insert/', (req, res) => {
    res.set(CORS);
    const adress = req.body.substring(8).slice(0, -1);
    res.send(adress)
  });
  app.all('*', (req, res) => {
    res.set(CORS);
    res.send('rip123123')
  })
  return app;
}
