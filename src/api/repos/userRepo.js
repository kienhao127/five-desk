var db = require('../fn/mysql-db');

exports.login = function(u) {
    var sql = `select * from user where Email = '${u.email}' and Password = '${u.password}'`;
	return db.load(sql);
}

exports.register = function(u) {
    var sql = `insert into user(Email, Password, Avatar, FirstName, LastName, PhoneNumber, CompanyID, IsDelete, UserType, IsActive)
                values('${u.email}', '${u.password}', '${u.avatar}', '${u.firstname}', '${u.lastname}', '${u.phonenumber}', '${u.company}', 
                '${u.isdelete}', '${u.type}', '${u.isactive}')`;
    return db.write(sql);
}

exports.insertCompany = function(name) {
    var sql = `insert into company(CompanyName) values('${name}')`;
    return db.write(sql);
}