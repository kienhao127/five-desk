var db = require('../fn/mysql-db');

exports.getListTopic = function(u) {
    var sql = `select * from topic order by LastMessageSendTime desc`;
	return db.load(sql);
}