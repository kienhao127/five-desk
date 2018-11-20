import { SAVE_PROFILE } from './actiontype';
import { getNotCloseByUserIDApi, getUnassignedTicketApi, getAllNotCloseApi, getNewSticketApi, getPendingSticketApi, getClosedSticketApi, getDeletedSticketApi, sendMailApi } from '../../api/AppApi';


export const getNotCloseByUserID = (UserId,token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getNotCloseByUserIDApi(UserId,token)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getUnassignedTicket = (UserId,token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getUnassignedTicketApi(UserId,token)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}
export const getAllNotClose = (UserId,token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getAllNotCloseApi(UserId,token)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}
export const getNewSticket = (UserId,token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getNewSticketApi(UserId,token)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getPendingSticket = (UserId,token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getPendingSticketApi(UserId,token)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getClosedSticket = (UserId,token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getClosedSticketApi(UserId,token)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getDeletedSticket = (UserId,token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getDeletedSticketApi(UserId,token)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const sendMail = (mail) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            sendMailApi(mail)
                .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}