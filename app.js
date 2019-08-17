var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var admin = require('firebase-admin');
var firebase = require('firebase');

var app = express();

process.env.GOOGLE_APPLICATION_CREDENTIALS = "TriviaAPI-8749187274a7.json";

const firebaseConfig = {
  apiKey: "AIzaSyBLR6Sx_UZh8W1doAkDD8IdH8MW2JT0Euw",
  authDomain: "triviaapi-d1d92.firebaseapp.com",
  databaseURL: "https://triviaapi-d1d92.firebaseio.com",
  projectId: "triviaapi-d1d92",
  storageBucket: "",
  messagingSenderId: "169366846849",
  appId: "1:169366846849:web:f6f7686449ffc153"
};

admin.initializeApp(firebaseConfig);

let db = admin.firestore();

var id = 0;

app.post('/addQuestion', (request, respond) =>
{
  const title = request.get("title");
  const correct = request.get("correct");
  const wrong1 = request.get("wrong1");
  const wrong2 = request.get("wrong2");
  const wrong3 = request.get("wrong3");
  const category = request.get("category");

  const data = 
  {
    "title" : title,
    "correct_answer" : correct,
    "wrong1": wrong1,
    "wrong2" : wrong2,
    "wrong3" : wrong3,
    "category": category,
    "id": id


  };

  db.collection('Questions').add(data).then(ref =>
    {
      respond.sendStatus(200).send(ref);

    }).catch(error =>
      {
        respond.sendStatus(500).send(error)
      })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// app.listen(5000, () =>
// {
//   console.log("Server is up")
// })

