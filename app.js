
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var MongoStore = require("connect-mongo")(express),
    settings = require("./settings");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  //会话保持
  app.use(express.cookieParser());
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        db: settings.db
    })
  }));
  
  app.use(express.static(path.join(__dirname, 'public')));
});
/*
app.dynamicHelpers({
    user: function(req, res) {
        return req.session.user;
    },
    error: function(req, res) {
        var err = req.flash("error");
        if ( err.length ) {
            return err;
        } else {
            return null;
        }
    },
    success: function(req, res) {
        var succ = req.flash("success");
        if ( succ.length ) {
            return succ;
        } else {
            return null;
        }
    }
});
*/
app.get("/", routes.index);
app.get("/reg", routes.reg);
app.post("/reg", routes.postReg);

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
