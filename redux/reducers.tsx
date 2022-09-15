import { combineReducers } from "redux";

const initialState = {
  searchValue: '',
};

function store(state = initialState, action: { type: String; value: String; }) {
  switch (action.type) {
    case 'searchValue': {
      return Object.assign({}, state, {
        searchValue: action.value,
      });
    }

    default:
      return state;
  }
}



export default store;
