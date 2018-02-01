import {LOGIN_REQUEST, LOGIN_FAILED, LOGIN_INPUT_CHANGE, LOGIN_SUCCESS } from '../actions/index';

const initialState = {
    isFetching: false,
    user: "",
    password: "",
    errors: {},
    isOpen: true
};

let defaultuserData = {
    user: 'admin',
    password: '1234'
};


const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        console.log('reducer:LOGIN_REQUEST');
            return {
                 ...state, 
                 isFetching: true, 
                 errors: {} 
                };

        case LOGIN_SUCCESS:
        console.log('reducer:LOGIN_SUCCESS');
            return {
                 ...state, 
                 isFetching: false, 
                 errors: {} 
                };

        case LOGIN_FAILED:
        console.log('reducer:LOGIN_FAILED');
            return {
                ...state,
                isFetching: false,
                errors: action.errors,
            };

        case LOGIN_INPUT_CHANGE:
        console.log('reducer:LOGIN_INPUT_CHANGE');
        if (action.action.loginData.user === defaultuserData.user && action.action.loginData.password ===  defaultuserData.password){
            console.log('SUCCESSSSS');
            return {
                ...state,
                isFetching: false,
                user: action.action.loginData.user,
                isOpen: false
            }
        }
        else {
            console.log('reducer:LOGIN_fail');
            return {
                ...state,
                isFetching: false,
                isOpen: true,
                errors: {message: 'Wrong User'}
            }            
        }
        
        default: 
            return state;
    }
};

export default loginReducer ;