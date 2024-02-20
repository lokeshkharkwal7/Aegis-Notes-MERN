// Importing the required modules
const jwt = require("jsonwebtoken");
const JSWTSECRET = "SSSSh a Secret!!"; //ideally secret key is taken from resorce file must be encrypted

  function fetchuser(req, res, next) {
 
    // getting auth token
    const authToken = req.header("auth-token");
    console.log(authToken)
    
    // checking quality of the token to save from hacker 
    if(!authToken){
        res.status(401).send("Invalid Token")
    }
    // extracting user id
    // try{
      console.log("authtoken inside middleware ",authToken)
    let decodedInfo =   jwt.verify(authToken, JSWTSECRET);
    if(!decodedInfo){return res.status(400).send("Error Not Allowed")}
    //   dynamically saving it to request.user
    req.user = decodedInfo.user;
    next()
  //  }catch{
  //      res.status(400).send("Not Allowed")
  //     //  console.log(decodedInfo)
  //   }
   
  }
//   next will make sure the the above function will be send to either next middleware or next route 
 
 

module.exports = fetchuser;