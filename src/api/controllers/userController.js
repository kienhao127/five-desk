var express = require('express');
var userRepo = require('../repos/userRepo');

var router = express.Router();

router.post('/login', (req, res) => {
    // console.log(req);
    var u = {
        email: req.body.email,
        password: req.body.password
    }
    userRepo.login(u)
        .then(value => {
            var user = value[0];
            var message = '';
            var returnCode = 0;
            if(user != null) {
                message = 'login success';
                returnCode = 1;

                if(user.isActive == 0) {
                    message = 'inactive account';
                    returnCode = 3;
                }
            } else {
                message = 'login fail';
            }
            res.statusCode = 201;
            res.json({
                returnCode: returnCode,
                message: message,
                user: user,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

router.post('/register', (req, res) => {
    userRepo.insertCompany(req.body.company)
        .then(value => {
            var u = {
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phonenumber: req.body.phone,
                company: value.insertId,
                isdelete: 0,
                type: 2,
                isactive: 0
            }
            
            userRepo.register(u)
                .then(value => {
                    var message = '';
                    var returnCode = 0;
                    if(value != null) {
                        if(value.insertId > 0) {
                            message = 'success';
                            returnCode = 1;
                        } else {
                            message = 'fail';
                        }
                    }
                    
                    res.statusCode = 201;
                    res.json({
                        returnCode: returnCode,
                        message: message
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.statusCode = 500;
                    res.end('View error log on server console');
                })
        })
})

router.post('/changePassword', (req, res) => {
    var u = {
        userID: req.body.userID,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
    }
    userRepo.getUserInfo(u)
    .then(value => {
        var user = value[0];
        if (user.Password == u.oldPassword){
            userRepo.changePassword(u)
            .then(value => {
                res.statusCode = 201;
                res.json({
                    returnCode: 1,
                    message: 'Đổi mật khẩu thành công'
                })
            })
            .catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('View error log on server console');
            })
        } else {
            res.statusCode = 201;
            res.json({
                returnCode: 0,
                message: 'Mật khẩu cũ không chính xác'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on server console');
    })
})

router.post('/getUserInfo', (req, res) => {
    var u = {
        userID: req.body.userID,
    }
    userRepo.getUserInfo(u)
    .then(value => {
        var user = value[0];
        res.json({
            returnCode: 0,
            message: 'success',
            user: user
        })
    })
    .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on server console');
    })
})

router.post('/updateProfile', (req, res) => {
    var u = {
        userID: req.body.userID,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber
    }
    userRepo.updateProfile(u)
        .then(value => {
            console.log(value);
            if (value.affectedRows > 0){
                res.statusCode = 201;
                res.json({
                    returnCode: 1,
                    message: 'Cập nhật thông tin thành công'
                })
            } else {
                res.statusCode = 201;
                res.json({
                    returnCode: 0,
                    message: 'Cập nhật thông tin thất bại'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

router.post('/getListUser', (req, res) => {
    var u = {
        companyID: req.body.companyID
        // companyID: 1
    }
    userRepo.getListUser(u)
        .then(value => {
            res.statusCode = 201;
            res.json({
                returnCode: 1,
                message: 'success',
                users: value,
            })
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on server console');
        })
})

module.exports = router;