import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';

//Register User
export const signUp = (newUser, history) => {
    return (dispatch) => {
		axios.post('/api/users/register', newUser)
			.then(res => history.push('/login'))
			.catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
        
    }
}

//Login User
export const signIn = (userData) => {
    console.log(userData);
    return (dispatch) => {
        axios.post('/api/users/login', userData)
            .then(res => {
                //Save token to local storage
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                //Set token to auth header
                if(token){
                    axios.defaults.headers.common['Authorization'] = token;
                } else {
                    delete axios.defaults.headers.common['Authorization'];
                }
                //Decode token to get user data
                const decoded = jwt_decode(token);
                //Dispatch action
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: decoded
                });

            })
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
    }
};


export const signOut = () => {
    return (dispatch) => {
        //remove token from local storage
        localStorage.removeItem('jwtToken');
        //Remove auth header for future requests
        delete axios.defaults.headers.common['Authorization'];
        //Set current user to {} which will set isAuthenticated to false
        dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        });
    };
}