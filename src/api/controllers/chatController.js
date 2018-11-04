var express = require('express');
var chatRepo = require('../repos/chatRepo');

var router = express.Router();

router.get('/getListTopic', (req, res) => {
    chatRepo.getListTopic()
        .then(value => {
            var listTopic = value;
            var message = '';
            var returnCode = 0;
            
            res.statusCode = 201; //tam thoi de 201
            res.json({
                returnCode: returnCode,
                message: message,
                listTopic: listTopic,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;