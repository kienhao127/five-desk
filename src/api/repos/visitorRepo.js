var db = require('../fn/mysql-db');

exports.getVisitorInfo = function(visitor) {
    var sql = `select * from visitor where VisitorID = '${visitor.VisitorID}' and isDelete = 0`;
	return db.load(sql);
}