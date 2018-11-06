var db = require('../fn/mysql-db');

exports.getListTopic = function(topic) {
    var sql = `select * from topic where CompanyID = '${topic.id}' and isDelete = 0 order by LastMessageSendTime desc`;
	return db.load(sql);
}

exports.getTopic = function(topic) {
    var sql = `select * from message where TopicID = '${topic.id}' order by SendTime asc`;
	return db.load(sql);
}

exports.insertMessage = function(msg) {
    var sql = `insert into message(TopicID, SenderID, RecieverID, Content, SendTime, TypeID) values('${msg.TopicID}', '${msg.SenderID}', '${msg.RecieverID}', '${msg.Content}', '${msg.SendTime}', '${msg.TypeID}')`;
    return db.write(sql);
}