import {SAVE_PROFILE} from './actiontype';
import { getVisitorInfoApi, updateVisitorInfoApi } from '../../api/AppApi';

export const getVisitorInfo = (visitorID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        getVisitorInfoApi(visitorID)
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

export const updateVisitorInfo = (visitorID, email, notes, phoneNumber) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        updateVisitorInfoApi(visitorID, email, notes, phoneNumber)
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