
const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = (db) =>{
  router.get("/", function(req,res){
  db.getAllProducts().then(products => {
    res.json(products);
  }).catch(err=>{
res.status(500).json({messages:`Error in getAll: ${err}`});
  });  
});
  
  return router;
}

