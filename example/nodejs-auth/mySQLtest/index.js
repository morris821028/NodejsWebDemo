var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  port:3306
});
 
db.query('USE test',function(err){
    if(err)
        console.log('use error');
});
db.query('SELECT 12 + 34 AS result', function(err, rows, fields) {  
    if (err) throw err;  
    console.log('The result is: ', rows[0].result);  
});   
db.end();
// test connection valid