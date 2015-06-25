var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('monk')('localhost/password-demo');
var passwordCollection = db.get('password');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.post("/signup", function(req, res, next) {
    var password = req.body.password;
    var compare = req.body.confirm;
    var email = req.body.email;
    var hash = bcrypt.hashSync(password, 8);
    if (password === compare) {
        passwordCollection.insert({
            email: email,
            password: hash
        });
        res.redirect('/');
    } else {
        res.render('index', {
            error: "Passwords do not match"
        });
    }
});
router.post('/login', function(req, res, next) {
    var password = req.body.passwordIn;
    // var hashIn = bcrypt.hashSync(password, 8);
  var hashIn =  '$2a$08$E.PVAnuiIQKgOfHU792nUOMvQe7RyLvyi9wlk4l/EBBbeOHxZ.nXu';


    passwordCollection.findOne({email:req.body.emailIn, password:hashIn }, function(err, record){
          console.log(record.password);
          console.log("###########");
          console.log(hashIn);

     if (record.password === hashIn) {

  res.render('index', {welcome:"Welcome " + record.email});

  }
});


});



module.exports = router;
