var express = require('express');
var userRepo = require('../repos/userRepo');

var router = express.Router();

router.post('/login', (req, res) => {
    // console.log(req);
    var u = {
        email: req.body.email,
        password: req.body.password
    }
    userRepo.login(u)
        .then(value => {
            var user = value[0];
            var message = '';
            var returnCode = 0;
            if(user != null) {
                message = 'login success';
                returnCode = 1;

                if(user.isActive == false) {
                    message = 'inactive account';
                    returnCode = 3;
                }
            } else {
                message = 'login fail';
            }
            res.statusCode = 201;
            res.json({
                returnCode: returnCode,
                message: message,
                user: user,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;