import { SAVE_PROFILE } from './actiontype';
import { loginApi, meFromToken, getListUserApi, getUserInfoApi, changePasswordApi, updateProfileApi } from '../../api/AppApi';
var md5 = require('md5');

export const login = (email, password) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log(email + password);
            var md5Password = md5(password);
            loginApi(email, md5Password)
                .then((responseJson) => {
                    console.log(responseJson);
                    var token = responseJson.token;
                    sessionStorage.setItem('token', token);
                    var user = responseJson.user;
                    var u = {
                        Email: user.Email,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        UserID: user.UserID.toString(),
                        PhoneNumber: user.PhoneNumber != null ? user.PhoneNumber.toString() : null,
                        CompanyID: user.CompanyID,
                    }
                    if (responseJson.returnCode === 1) {
                        dispatch(saveProfile(u));
                        resolve(responseJson);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const loadUserFromToken = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            let token = sessionStorage.getItem('token');
            meFromToken(token)
                .then((responseJson) => {
                    var user = responseJson.user;
                    if (responseJson.returnCode === 1) {
                        var token = responseJson.token;
                        sessionStorage.setItem('token', token);
                        dispatch(saveProfile(user));
                    }
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const saveProfile = (profile) => {
    return {
        type: SAVE_PROFILE,
        profile: profile
    };
}

export const getListUser = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        var token = sessionStorage.getItem('token');
        getListUserApi(token)
            .then((responseJson)=> {
                console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error)=>{
                console.log(error);
            });
        })
        return promise;
    }
}

export const getUserInfo = (UserID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        getUserInfoApi(UserID)
            .then((responseJson)=> {
                console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error)=>{
                console.log(error);
            });
        })
        return promise;
    }
}

export const changePassword = (oldPassword, newPassword) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        var token = sessionStorage.getItem('token');
		var md5_Old_Password = md5(oldPassword);
		var md5_New_Password = md5(newPassword);
        changePasswordApi(token, md5_Old_Password, md5_New_Password)
            .then((responseJson)=> {
                console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error)=>{
                console.log(error);
            });
        })
        return promise;
    }
}

export const updateProfile = (firstname, lastname, phoneNumber) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        var token = sessionStorage.getItem('token');
        updateProfileApi(token, firstname, lastname, phoneNumber)
            .then((responseJson)=> {
                console.log(responseJson);
                resolve(responseJson);
            })
            .catch((error)=>{
                console.log(error);
            });
        })
        return promise;
    }
}