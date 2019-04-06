const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = 'mongodb+srv://spaceman:spaceman@spaceman-zytnz.mongodb.net/test?retryWrites=true';
const dbName = 'final-frontier';

app.listen(5000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
  console.log("I'm on 5k")
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {
      messages: result
    })
  })
})

app.post('/', (req, res) => {
  db.collection('messages').save({image: req.body.image}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
//
// app.put('/messages', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//       $set: {
//         thumbUp:req.body.thumbUp + 1
//       }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })
//
// app.put('/thumbDown', (req, res) => {
// db.collection('messages')
// .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//   $set: {
//     thumbUp:req.body.thumbUp - 1
//   }
// }, {
//   sort: {_id: -1},
//   upsert: true
// }, (err, result) => {
//   if (err) return res.send(err)
//   res.send(result)
// })
// })
//
//
// app.delete('/messages', (req, res) => {
//   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })
