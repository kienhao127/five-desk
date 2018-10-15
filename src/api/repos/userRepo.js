var db = require('../fn/mysql-db');

exports.login = function(u) {
    var sql = `select * from user where Email = '${u.email}' and Password = '${u.password}'`;
	return db.load(sql);
}