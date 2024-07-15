
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

  router.get("/ids", function(req,res){
      db.getAllProductIds()
      .then(result => {
          res.json(result);
          
      })
      .catch(err => {
          res.status(204).end();
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

  router.get("/:name", function(req,res){
      db.getProductByName(req.params.name)
      .then(result => {
          res.json(result, null, 2);
      })
      .catch(err => {
          res.status(204).end();
      }); 
  });

   
  
  return router;
}

