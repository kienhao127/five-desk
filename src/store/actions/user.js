import {SAVE_PROFILE} from './actiontype';
import { loginApi } from '../../api/AppApi';


export const login = (email, password) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
        console.log(email + password);
        loginApi(email, password)
            .then((responseJson)=> {
                console.log(responseJson);
                if(responseJson.returnCode === 1) {
                    dispatch(saveProfile(responseJson.user));
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

export const saveProfile = (profile) => {
    return {
        type: SAVE_PROFILE,
        profile: profile
      };
  }