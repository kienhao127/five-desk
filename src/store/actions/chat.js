import { getListTopicApi, getTopicApi, transferTopicApi, updateUnreadMessageCountApi, seenMessageApi } from "../../api/AppApi";

export const getListTopic = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        var token = sessionStorage.getItem('token');
        getListTopicApi(token)
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

export const getTopic = (topicID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        getTopicApi(topicID)
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

export const transferTopic = (topicID, servicerID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        transferTopicApi(topicID, servicerID)
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

export const updateUnreadMessageCount = (topicID, unreadCount) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        updateUnreadMessageCountApi(topicID, unreadCount)
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

export const seenMessage = (topicID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        seenMessageApi(topicID)
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


