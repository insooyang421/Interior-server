
const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = (db) =>{
  router.get("/", function(req,res){
  db.getAllProducts().then(products => {
    res.json(products, null, 2);
  }).catch(err=>{
res.status(500).json({messages:`Error in getAll: ${err}`});
  });  
});
  
  router.get("/:_id", function(req,res){
    db.getProductById(req.params._id)
    .then(result => {
        res.json(result, null, 2);
    })
    .catch(err => {
        res.status(204).end();
    }); 
});
  
  return router;
}

