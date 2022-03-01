const express = require('express');
const cors = require('cors');
const app = express();
// const AWS = require('aws-sdk');
let multer = require('multer');
const path = require("path");
// let upload = multer();
let cookieParser = require('cookie-parser');


// const mongoose = require('mongoose');

// const uri = "mongodb+srv://trafik:Ediku126@cluster0.qrw9g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("MongoDB Connected…")
// })
// .catch(err => console.log(err))



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use('/api',require('./routes/auth'));

app.use(function(err,req,res,next){
  res.status(422).send({error: err.message});
});














app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});



// app.listen("192.168.43.225" || 3000);
// console.log('Web Server is listening at port '+ ("192.168.43.225" || 3000));
app.listen(process.env.PORT || 3000);
console.log('Web Server is listening at port '+ (process.env.port || 3000));