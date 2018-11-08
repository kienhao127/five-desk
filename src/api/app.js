var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
    
var userCtrl = require('./controllers/userController');
var chatCtrl = require('./controllers/chatController');
var visitorCtrl = require('./controllers/visitorController');
var chatRepo = require('./repos/chatRepo');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var utils = require('./utils/Utils');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs api'
    });
})

app.use('/user', userCtrl);
app.use('/chat', chatCtrl);
app.use('/visitor', visitorCtrl);

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        //Nhận tin nhắn từ client
        console.log('message: ' + msg);
        chatRepo.insertMessage(msg)
            .then(value => {
                console.log(value);
            })
            .catch((error)=>{
                console.log(error);
            });
            
        //Gửi tin nhắn đến client
        io.emit('chat message', msg);

        // //Kiểm tra xem còn tin nhắn chưa đọc hay không
        // var user = utils.verifyToken(msg.token);
        // chatRepo.countUnreadMessage(user)
        //     .then(value => {
        //         io.emit('unread message', value[0].UnreadMessageCount > 0);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     });

        //cập nhật là số lượng tin nhắn chưa đọc của 1 topic
        // chatRepo.getUnreadMessageOfTopic(msg.TopicID)
        //     .then(value => {
        //         var topic = {
        //             unreadCount: value[0].UnreadOfTopic,
        //             topicID: msg.TopicID,
        //         }
        //         chatRepo.updateUnreadMessage(topic)
        //         .then(value => {
        //             console.log(value);
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     });
        });
})

http.listen(4000, function(){
    console.log('listening on *:4000');
  });

var port = process.env.port || 8888;
app.listen(port, () => {
    console.log(`api running on port ${port}`);
})