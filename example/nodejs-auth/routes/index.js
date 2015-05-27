var express = require('express');
var router = express.Router();
var apptitle = 'NodeApp';

// SQL
var mysql = require('mysql');  
var DB_NAME = 'demo_nodejs';  
  
var connection  = mysql.createPool({  
    host     : 'localhost',  
    user     : 'root',  
    password : '',
    port:3306  
});  
connection.query('USE ' + DB_NAME,function(err){
    if(err)
        console.log('use error');
});
function User(user) {  
    this.username = user.username;  
    this.password = user.password;  
};  

User.prototype.save = function save(callback) {  
    var user = {  
        username: this.username,  
        password: this.password
    };  

    var cmd = "INSERT INTO userinfo(id, username, userpass) VALUES(0,?,?)";  
    connection.query(cmd, [user.username, user.password], function (err,result) {  
        callback(err,result);                       
    });         
};  

User.getUserNumByName = function getUserNumByName(username, callback) {  
    var cmd = 'select COUNT(1) AS num from user info where username = ?';
    connection.query(cmd, [username], function (err, result) {  
        connection.release(); 
        callback(err,result);                      
    });         
};  
User.getUserByUserName = function getUserNumByName(username, callback) {  
    var cmd = 'select * from userinfo where username = ?';  
    connection.query(cmd, [username], function (err, result) {  
        callback(err,result);                      
    });         
}; 
// SQL

/* GET home page. */
router.get('/', function(req, res, next) {

	console.log('loggedIn ' + req.session.loggedIn);
	if (req.session.loggedIn)
		res.render('index', { title: apptitle, username: req.session.username});
	else
  		res.render('index', { title: apptitle, username: 'Firend' });
});

router.get('/user/registration', function (req, res) {
    res.render("reg", {title: apptitle});
});

router.post("/user/create", function (req, res) {
    var user = new User({
        username:req.body.username,
        password:req.body.password,
    });
    user.save(function (err, sql_user) {
        if (err) res.json(err)
        console.log('Registration '+user.username +' Ok!');
    	console.dir(user);
        req.session.loggedIn = true;
        req.session.username = user.username;
		console.log('loggedIn ' + req.session.loggedIn);
		res.redirect('/');
    });
});

router.get('/user/login', function(req, res) {
	var username = "";
	if (req.session.username) {
		username = req.session.username;
	} 
	res.render('login',{title: apptitle});  
});

router.post('/user/login', function(req, res) {
	var user = new User({
        username:req.body.username,
        password:req.body.password,
    });

	User.getUserByUserName(user.username, function (err, results) {
        if(results == '') {  
            res.locals.error = 'Username not exits.';  
            res.render('login',{title: apptitle});  
            return;  
        }  
        console.dir(results[0]);
        if(results[0].UserName != user.username || results[0].UserPass != user.password) {  
            res.locals.error = 'Username or password error.';  
            res.render('login',{title: apptitle});  
            return;  
        } else {  
        	res.locals.error = '';
            res.locals.username = user.username;

            req.session.username = res.locals.username;   
            req.session.loggedIn = true;
            console.log(req.session.username);                         
            res.redirect('/');  
            return;  
        }      
    }); 
});

module.exports = router;
