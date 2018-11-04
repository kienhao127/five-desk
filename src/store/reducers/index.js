import { combineReducers } from 'redux';
import userReducer from './user';
// import floatCartReducer from './floatCartReducer';
// import updateCartReducer from './updateCartReducer';
// import filterReducer from './filterReducer';
// import sortReducer from './sortReducer';


export default combineReducers({
  user: userReducer,
//   cartProducts: floatCartReducer,
//   cartTotals: updateCartReducer,
//   filters: filterReducer,
//   sort: sortReducer,
});