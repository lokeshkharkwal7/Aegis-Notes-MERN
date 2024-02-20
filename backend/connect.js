// getting-started.js
const mongoose = require('mongoose');
const uri = "mongodb+srv://lokeshkharkwal:lokeshkharkwal@testingcluster.2l2kjor.mongodb.net/?retryWrites=true&w=majority"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
  console.log("Connected to the Data base")
  
 
 

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

