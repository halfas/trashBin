export default (express, bodyParser, createReadStream, crypto, http, mongoose)=>{
  const app = express();
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
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
      const url = req.body.URL;
      const login = req.body.login;
      const password = req.body.password;

      const Schema = mongoose.Schema;
      const userScheme = new Schema({
        login: String,
        password: String
    });
      mongoose.connect(url, { useNewUrlParser: true });
      const User = mongoose.model("User", userScheme);
      const user = new User({
          login: login,
          password: password
      });
      user.save(function(err){
        mongoose.disconnect(); 
      });
  });
  
    app.get('/wordpress/', (req, res) => {
    res.set(CORS);
    res.redirect("https://gfngfm.herokuapp.com/")
  });
  
  
  
  app.get('/render/', (req, res) => {
    res.set(CORS);
    const adress = req.query.addr;
    const random2 = req.body.random2;
    const random3 = req.body.random3;

    var req = http.get(adress, function(resp) {
      var bodyChunks = [];
      resp.on('data', function(chunk) {
        bodyChunks.push(chunk);
      }).on('end', function() {
        var body = Buffer.concat(bodyChunks);

        res.render(body, {
          random2,
          random3
        });
      })
    });    
  }); 
  
  app.all('*', (req, res) => {
    res.set(CORS);
    res.send('rip123123')
  })
  return app;
}
