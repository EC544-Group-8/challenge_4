var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');

// Create variables for the file location of any routes (connected to views)
var routes = require('./routes/index');
var historical = require('./routes/historical');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/historical', historical);

// --------- DEFINE AJAX POST REQUESTS HERE --------- //
var Average = require('./models/average.js');
var Measurement = require('./models/measurement.js');

// For saving any new data readings from the Particle cloud webhook
app.post('/save_temp', function(req, res){
  // console.log(req);
  var reading = req.body['data'];
  var id = req.body['coreid'];
  var date_published = req.body['published_at'];

  Measurement.create(id, reading, function (err, insert_id) {
    console.log('inserted reading as id ' + insert_id);
  });
});

//----------------------------Historical------------------------------------

// For retreiving the historic average data for each sensor 
app.get('/get_hist_sensor/1', function(req,res) {
  Measurement.getAllBySensor('430034000947353235303037', function (err, hist_data) {
    console.log('TRYING TO GET SENSOR 1 DATA...');
    if(hist_data) {
      console.log('GOT THE GOODS FOR SENSOR 1');
      res.send(hist_data);
    }
  });
});

app.get('/get_hist_sensor/2', function(req,res) {
  Measurement.getAllBySensor('38003f000b47353235303037', function (err, hist_data) {
    if(hist_data) {
      res.send(hist_data);
    }
  });
});

app.get('/get_hist_sensor/3', function(req,res) {
  Measurement.getAllBySensor('36001f000b47353235303037', function (err, hist_data) {
    if(hist_data) {
      res.send(hist_data);
    }
  });
});

app.get('/get_hist_sensor/4', function(req,res) {
  Measurement.getAllBySensor('1a0027001447353236343033', function (err, hist_data) {
    if(hist_data) {
      res.send(hist_data);
    }
  });
});

app.get('/get_hist_sensor/5', function(req,res) {
  Measurement.getAllBySensor('3f0031000947353235303037', function (err, hist_data) {
    if(hist_data) {
      res.send(hist_data);
    }
  });
});

//---------------------Real-Time--------------------------

app.get('/get_most_recent_sensor/1', function(req,res) {
  Measurement.getMostRecentBySensor('430034000947353235303037',function (err, last_reading) {
    if(last_reading && last_reading[0]){
      res.send(last_reading[0]);
    }
  });
});

app.get('/get_most_recent_sensor/2', function(req,res) {
  Measurement.getMostRecentBySensor('38003f000b47353235303037',function (err, last_reading) {
    if(last_reading && last_reading[0]){
      res.send(last_reading[0]);
    }
  });
});

app.get('/get_most_recent_sensor/3', function(req,res) {
  Measurement.getMostRecentBySensor('36001f000b47353235303037',function (err, last_reading) {
    if(last_reading && last_reading[0]){
      res.send(last_reading[0]);
    }
  });
});

app.get('/get_most_recent_sensor/4', function(req,res) {
  Measurement.getMostRecentBySensor('1a0027001447353236343033',function (err, last_reading) {
    if(last_reading && last_reading[0]){
      res.send(last_reading[0]);
    }
  });
});

app.get('/get_most_recent_sensor/5', function(req,res) {
  Measurement.getMostRecentBySensor('3f0031000947353235303037',function (err, last_reading) {
    if(last_reading && last_reading[0]){
      res.send(last_reading[0]);
    }
  });
});



// --------- END AJAX POST REQUESTS --------- //



// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...');
    });
  }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
