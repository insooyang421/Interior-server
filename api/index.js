const express = require("express");
const cors = require("cors");
const InteriorsDB = require("./controllers/interiorsDB.js");

const app = express();

//Middleware 
app.use(cors());

require("dotenv").config();

app.use(express.json());

//variables
const HTTP_PORT = process.env.PORT || 3000;

//initialize db
const db = new InteriorsDB();

db.initialize(process.env['MONGODB_CONN_STR']).then(()=>{
  app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});

//add routes
const productsController = require("./controllers/productsController.js")(db);

app.use("/api/products", productsController);

app.get("/",(req,res)=>{
  //res.send("home");
  res.redirect("/api/products")
})

app.get("/loadData",(req,res)=>{
  
  db.loadData().then(()=>{
    console.log("fake data added successfully");
  }).catch(err=>{
    console.log(err);
  })  
})