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
      passwordCollection.findOne({email:req.body.emailIn }, function(err, record){
      if (!record) {res.render("index" , {error:"Email Not Found"});}
        else if (bcrypt.compareSync(password, record.password) ) {
     res.render('index', {welcome:"Welcome " + record.email});
   }


});
});



module.exports = router;
