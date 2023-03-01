
// seeting up database
// using mongodb
const mongoose = require('mongoose');
const env = require("../environment");
mongoose.connect(env.DATABASE_URL);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting To Database"));

db.once('open',function(){
    console.log("Database Successfully Connected");
});