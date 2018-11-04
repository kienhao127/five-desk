import { getListTopicApi, getTopicApi } from "../../api/AppApi";

export const getListTopic = (companyID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        getListTopicApi(companyID)
            .then((responseJson)=> {
                console.log(responseJson);
                if(responseJson.returnCode === 1) {
                    resolve(responseJson);
                }
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
                if(responseJson.returnCode === 1) {
                    resolve(responseJson);
                }
            })
            .catch((error)=>{
                console.log(error);
            });
        })
        return promise;
    }
}



