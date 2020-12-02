/*
 * @Author: 叶有志 
 * @Date: 2019-12-04 20:38:48 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 01:43:25
 */

import { combineReducers } from 'redux';
import storageUtil from '../utils/storageUtil';
import { 
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER
 } from './action-types';

/**
 * 用来管理头部标题的reducer
 */

const initHeadTitle = '';
let headTitle = (state = initHeadTitle, action) => {
    switch(action.type) {
        case SET_HEAD_TITLE:
            return action.data;
        default:
            return state;
    }
}


/**
 * 用来管理当前登录用户的reducer
 */
const initUser = storageUtil.getUser();
let user = (state = initUser, action) => {
    switch(action.type) {
        case RECEIVE_USER:
            return action.user;
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg;
            return {...state, errorMsg};
        case RESET_USER:
            return {}
        default:
            return state;
    }
}

/**
 * 向外报露合并后的reducer
 */
export default combineReducers({
    headTitle,
    user
})