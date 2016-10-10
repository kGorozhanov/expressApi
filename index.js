const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const connectMongo = require('connect-mongo');
var MongoStore = connectMongo(session);

const config = require('./config');
const routes = require('./routes');

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(morgan('tiny'));
app.use('/', routes);

app.use(session({
  secret: config.secrets.session,
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    db: 'api'
  })
}));

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
