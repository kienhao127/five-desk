var db = require('../fn/mysql-db');

exports.getListTopic = function(u) {
    var sql = `select * from topic order by LastMessageSendTime desc`;
	return db.load(sql);
}

exports.getTopic = function(topic) {
    var sql = `select * from message where TopicID = '${topic.id}' order by SendTime asc`;
	return db.load(sql);
}