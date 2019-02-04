import { SET_CURRENT_USER } from '../actions/types';
const isEmpty = require('lodash/isEmpty');

const initState = {
    isAuthenticated: false,
    user: {}
};

export default function authReducer(state = initState, action){
	switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
		default:
			return state;
	}
};

