import { combineReducers } from 'redux';
import userReducer from './user';
import mailReducer from './mail';


export default combineReducers({
  user: userReducer,
  mail: mailReducer,
});