// importing the modules

var cors = require('cors')
 const express = require("express");
const app = express();
app.use(express.json())
app.use(cors({
  origin: [" https://aegis-notes-mern-frontend.vercel.app"],
  // origin: ["https://wizstore.vercel.app"],
 
    methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true
}))



// importing the connection
const mgdbConnect = require("./connect");
mgdbConnect;

// importing the created packages routes which is using the schemas that are in the model dir
const authenticatorR = require("./routes/authentication");
const notesN = require("./routes/gettingNotes")

// using express instance. use to use the following router created

app.use("/", authenticatorR);
app.use("/notes", notesN)

// listen to the required port
app.listen(4000);
