import { SAVE_PROFILE, SAVE_LISTMAIL_SELECTED } from './actiontype';
import { getNotCloseByUserIDApi, getUnassignedTicketApi, getAllNotCloseApi, getNewSticketApi, getPendingSticketApi, getClosedSticketApi, getDeletedSticketApi, sendMailApi, getMailApi, updateMailStatusApi, updateMailTypeApi, updateMailPriorityApi, deleteMailApi, countQuantityMailApi } from '../../api/AppApi';


export const getNotCloseByUserID = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getNotCloseByUserIDApi(token)
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

export const getUnassignedTicket = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getUnassignedTicketApi(token)
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
export const getAllNotClose = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getAllNotCloseApi(token)
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
export const getNewSticket = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getNewSticketApi(token)
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

export const getPendingSticket = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getPendingSticketApi(token)
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

export const getClosedSticket = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getClosedSticketApi(token)
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

export const getDeletedSticket = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getDeletedSticketApi(token)
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

export const getMail = (mailID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            getMailApi(mailID)
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

export const updateMailStatus = (mailID, statusID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            updateMailStatusApi(mailID, statusID)
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


export const updateMailType = (mailID, typeID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            updateMailTypeApi(mailID, typeID)
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


export const updateMailPriority = (mailID, priorityID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            updateMailPriorityApi(mailID, priorityID)
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

export const deleteMail = (listMailID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            deleteMailApi(listMailID)
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

export const selectedMail = (listMailID) => {
    return (dispatch) => {
        dispatch(saveSelectedMailID(listMailID));
    }
}

export const saveSelectedMailID = (selectedMailID) => {
    return {
        type: SAVE_LISTMAIL_SELECTED,
        selectedMailID: selectedMailID
    };
}


export const countQuantityMail = (token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            countQuantityMailApi(token)
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
