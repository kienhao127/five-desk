var express = require('express');
var visitorRepo = require('../repos/visitorRepo');

var router = express.Router();

router.post('/getVisitorInfo', (req, res) => {
    // console.log(req);
    var visitor = {
        VisitorID: req.body.visitorID,
    }
    visitorRepo.getVisitorInfo(visitor)
        .then(value => {
            var visitor = value[0];
            var message = '';
            var returnCode = 0;

            if(visitor != null) {
                message = 'success';
                returnCode = 1;
            } else {
                message = 'fail';
            }
            res.statusCode = 201;
            res.json({
                returnCode: returnCode,
                message: message,
                visitor: visitor,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;