import {SAVE_PROFILE} from './actiontype';
import { getVisitorInfoApi } from '../../api/AppApi';

export const getVisitorInfo = (visitorID) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        getVisitorInfoApi(visitorID)
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