import { func } from "prop-types";

var BASE_URL = 'https://fivedesk.herokuapp.com/'
// var BASE_URL = 'http://localhost:8888/'

function fetchApi(url, method, data) {
    var path = BASE_URL + url;
    // console.log(path);
    console.log(data)
    return fetch(path,
        {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json; charset=utf-8",
            },
            method: method,
            body: JSON.stringify(data)
        }).then(response => response.json()).catch((error) => {
            console.log(error);
        });
}

export function meFromToken(token) {
    var body = {
        token: token
    }
    return fetchApi('user/meFromToken', 'POST', body);
}

export function loginApi(email, password) {
    var body = {
        email: email,
        password: password
    }
    return fetchApi('user/login', 'POST', body);
}

export function registerApi(email, password, avatar, firstname, lastname, phoneNumber, company) {
    var body = {
        email: email,
        password: password,
        avatar: avatar,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        company: company
    }
    return fetchApi('user/register', 'POST', body);
}

export function getListTopicApi(token) {
    var body = {
        token: token
    }
    return fetchApi('chat/getListTopic', 'POST', body);
}

export function getTopicApi(topicID) {
    var body = {
        topicID: topicID
    }
    return fetchApi('chat/getTopic', 'POST', body);
}

export function getVisitorInfoApi(visitorID) {
    var body = {
        visitorID: visitorID
    }
    return fetchApi('visitor/getVisitorInfo', 'POST', body);
}

export function getListUserApi(token) {
    var body = {
        token: token
    }
    return fetchApi('user/getListUser', 'POST', body);
}

export function getUserInfoApi(userID) {
    var body = {
        userID: userID
    }
    return fetchApi('user/getUserInfo', 'POST', body);
}

export function updateProfileApi(token, firstname, lastname, phoneNumber) {
    var body = {
        token: token,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber
    }
    return fetchApi('user/updateProfile', 'POST', body);
}

export function changePasswordApi(token, oldPassword, newPassword) {
    var body = {
        token: token,
        oldPassword: oldPassword,
        newPassword: newPassword
    }
    return fetchApi('user/changePassword', 'POST', body);
}

export function updateVisitorInfoApi(visitorID, email, notes, phoneNumber) {
    var body = {
        visitorID: visitorID,
        email: email,
        notes: notes,
        phoneNumber: phoneNumber,
    }
    return fetchApi('visitor/updateVisitorInfo', 'POST', body);
}

export function transferTopicApi(topicID, servicerID) {
    var body = {
        topicID: topicID,
        servicerID: servicerID,
    }
    return fetchApi('chat/transferTopic', 'POST', body);
}

export function updateUnreadMessageCountApi(topicID, unreadCount) {
    var body = {
        topicID: topicID,
        unreadCount: unreadCount
    }
    return fetchApi('chat/updateUnreadMessage', 'POST', body);
}

export function seenMessageApi(topicID) {
    var body = {
        topicID: topicID,
    }
    return fetchApi('chat/seenMessage', 'POST', body);
}

export function addUserApi(user) {
    var body = {
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        companyID: user.companyID,
    }
    return fetchApi('user/addUser', 'POST', body);
}

//mail
export function getNotCloseByUserIDApi(token) {
    var body = {
        token:token
    }
    return fetchApi('mail/getNotCloseByUserID', 'POST', body);
}
export function getUnassignedTicketApi(token) {
    console.log('ttttttttttttttttttt'+token);
    var body = {
        token:token
    }
    return fetchApi('mail/getUnassignedTicket', 'POST', body);
}
export function getAllNotCloseApi(token) {
    var body = {
        token:token
    }
    return fetchApi('mail/getAllNotClose', 'POST', body);
}
export function getNewSticketApi(token) {
    var body = {
        token:token
    }
    return fetchApi('mail/getNewSticket', 'POST', body);
}
export function getPendingSticketApi(token) {
    var body = {
        token:token
    }
    return fetchApi('mail/getPendingSticket', 'POST', body);
}
export function getClosedSticketApi(token) {
    var body = {
        token:token
    }
    return fetchApi('mail/getClosedSticket', 'POST', body);
}
export function getDeletedSticketApi(token) {
    var body = {
        token:token
    }
    return fetchApi('mail/getDeletedSticket', 'POST', body);
}
export function sendMailApi(mail) {
    var body = {
        token: mail.token,
        to: mail.to,
        subject: mail.subject,
        content: mail.content,
        typeID: mail.typeID,
        priorityID: mail.priorityID,
        statusID: mail.statusID,
        replyTo: mail.replyTo != undefined ? mail.replyTo : null
    }
    return fetchApi('mail/sendMail', 'POST', body);
}

export function getMailApi(mailID) {
    var body = {
        mailId: mailID,
    }
    return fetchApi('mail/getMail', 'POST', body);
}

export function updateMailStatusApi(mailID, statusID){
    var body = {
        mailID: mailID,
        statusID: statusID,
    }
    return fetchApi('mail/updateStatus', 'POST', body);
}

export function updateMailTypeApi(mailID, typeID){
    var body = {
        mailID: mailID,
        typeID: typeID,
    }
    return fetchApi('mail/updateType', 'POST', body);
}

export function updateMailPriorityApi(mailID, priorityID){
    var body = {
        mailID: mailID,
        priorityID: priorityID,
    }
    return fetchApi('mail/updatePriority', 'POST', body);
}

export function deleteMailApi(listMailID){
    var body = {
        listMailID: listMailID,
    }
    return fetchApi('mail/deleteMail', 'POST', body);
}

export function countQuantityMailApi(token){
    var body = {
        token: token,
    }
    return fetchApi('mail/countQuantityMail', 'POST', body);
}