import {SAVE_LISTMAIL_SELECTED} from '../actions/actiontype'

const initalState = {
    selectedMailID: null,
};

const mailReducer = (state = initalState, action) => {
  switch(action.type) {
    case SAVE_LISTMAIL_SELECTED:
      return {
        ...state,
        selectedMailID: action.selectedMailID
      };
    default:
      return state;
  }
};

export default mailReducer;
