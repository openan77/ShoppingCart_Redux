import {LOGIN_REQUEST, LOGIN_FAILED, LOGIN_INPUT_CHANGE, LOGIN_SUCCESS } from '../actions/index';

const initialState = {
    isFetching: false,
    user: "",
    password: "",
    errors: {},
    isOpen: false,
    loading: 'hide',
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
                 errors: {},
                 loading: 'loading'
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
                loading: 'hide'
            };

        case LOGIN_INPUT_CHANGE:
        console.log('reducer:LOGIN_INPUT_CHANGE');
        if (action.action.loginData.user === defaultuserData.user && action.action.loginData.password ===  defaultuserData.password){
            return {
                ...state,
                isFetching: false,
                user: action.action.loginData.user,
                isOpen: true,
                loading: 'hide'
            }
        }
        else {
            console.log('reducer:LOGIN_fail');
            return {
                ...state,
                isFetching: false,
                isOpen: false,
                errors: {message: 'Wrong User'},
                loading: 'hide'
            }            
        }
        
        default: 
            return state;
    }
};

export default loginReducer ;