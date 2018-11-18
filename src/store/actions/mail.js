import {SAVE_PROFILE} from './actiontype';
import { getNotCloseByUserIDApi,getUnassignedTicketApi,getAllNotCloseApi,getNewSticketApi, getPendingSticketApi,getClosedSticketApi ,getDeletedSticketApi} from '../../api/AppApi';


export const getNotCloseByUserID = (UserID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getNotCloseByUserIDApi(UserID)
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

export const getUnassignedTicket = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getUnassignedTicketApi()
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
export const getAllNotClose = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getAllNotCloseApi()
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
export const getNewSticket = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getNewSticketApi()
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

export const getPendingSticket = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getPendingSticketApi()
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

export const getClosedSticket = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getClosedSticketApi()
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

export const getDeletedSticket= () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getDeletedSticketApi()
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