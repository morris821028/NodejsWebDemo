var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

var mysql = require('mysql');  
var DB_NAME = 'demo_nodejs';  
  
var pool  = mysql.createPool({  
    host     : 'localhost',  
    user     : 'nodejs',  
    password : 'nodejs'  
});  