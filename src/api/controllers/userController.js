var express = require('express');
var userRepo = require('../repos/userRepo');

var router = express.Router();

router.post('/login', (req, res) => {
    console.log(req);
    var u = {
        email: req.body.email,
        password: req.body.password
    }
    userRepo.login(u)
        .then(value => {
            console.log(value);
            res.statusCode = 201;
            res.json({
                returnCode: 1,
                message: 'success',
                user: value,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;