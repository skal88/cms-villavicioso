var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Engine template sistem for express
// Estas linis sirven para decirle a Express que usaremos archivos HTML en lugar de templates ejs
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(process.cwd() + '/public')); // public folder


// Connection to DB
mongoose.connect('mongodb://localhost/cmspiso', function(err, res) {
  if(err) throw err;
  console.log('Conectado a la Base de datos "cmspiso"');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var GastosModel     = require('./models/gastos')(app, mongoose);
var GastosCtrl = require('./controllers/gastos');


// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.render("index.html")
});
app.use(router);

// API routes
var gastos = express.Router();

gastos.route('/gastos')
  .get(GastosCtrl.findAllGastos)
  .post(GastosCtrl.addGasto);

gastos.route('/gastos/:id')
  .get(GastosCtrl.findById)
  .put(GastosCtrl.updateGasto)
  .delete(GastosCtrl.deleteGasto);

app.use('/api', gastos);



app.get('/about', function (req, res)
{
    res.render('about.html');
});



// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});