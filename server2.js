//dependencies
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
//parse through request body
const bodyParser   = require('body-parser');
//has object that has url and db username and password (stored in git ignore to keep valuable info safe)
const configDB = require('./config/database.js');

var db

mongoose.connect(configDB.url, { useNewUrlParser: true }, (err, database) => {
    if(err) return console.log(err)
    db = database
    console.log("connected to db")
    require ('./app/routes.js')(app, db);
  })

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + '/public'))
app.listen(port);
console.log(`I'm on 5k`)
