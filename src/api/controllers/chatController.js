var express = require('express');
var chatRepo = require('../repos/chatRepo');

var router = express.Router();

router.post('/getListTopic', (req, res) => {
    var topic = {
        id: req.body.companyID
    }
    chatRepo.getListTopic(topic)
        .then(value => {
            var listTopic = value;
            var message = '';
            var returnCode = 0;
            
            console.log('listTopic.length');
            console.log(listTopic.length);
            res.statusCode = 201; //tam thoi de 201
            res.json({
                returnCode: listTopic.length > 0 ? 1 : 0,
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

router.post('/getTopic', (req, res) => {
    var topic = {
        id: req.body.topicID
    }
    chatRepo.getTopic(topic)
        .then(value => {
            var topic = value;
            var message = '';
            var returnCode = 0;
            
            res.statusCode = 201; //tam thoi de 201
            res.json({
                returnCode: topic.length > 0 ? 1 : 0,
                message: message,
                topic: topic,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;