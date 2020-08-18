const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const watchRoutes = require('./routes/watch');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');
const engine = require('ejs-mate');
const path = require('path');

const mongoose = require("mongoose");

// const mongoUrl = "mongodb://mongo:27017/expressmongo"
mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.Promise = global.Promise;

const app = express();
require('./passport/local-auth');

app.use(morgan('dev'));


//step 1/3 follow the order
app.use(session({
    secret: 'mySecretString',
    resave: false, //
    saveUninitialized: false, //no requiere
    store: new MongoStore({
        url: process.env.DB_URL,
        collection: 'sessions'
    })
}))

app.use(passport.initialize());//step 2/3
app.use(passport.session());//step 3/3



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
});

//ejs-mate configuration
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');




// app.use('/', express.static(__dirname + './../dist'));//watchRoutes
app.use('/dist', express.static(__dirname + './../dist'));//watchRoutes
app.use('/', watchRoutes);//
app.use('/scss', watchRoutes);
app.use('/bundle', watchRoutes);
app.use('/watch', watchRoutes);
app.use('/nointernet', watchRoutes);

app.use('/auth', authRoutes);


// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // res.redirect('/')
    res.json({
        error: {
            message: error.message // 'Not found'
        }
    });
});



module.exports = app;