/*
 * @Author: 叶有志 
 * @Date: 2019-12-04 20:38:57 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 01:45:46
 */

import { 
    SET_HEAD_TITLE, 
    RECEIVE_USER, 
    SHOW_ERROR_MSG,
    RESET_USER
} from './action-types';
import { reqLogin } from '../api';
import storageUtil from '../utils/storageUtil';


/**
 * 设置头部标题的同步action
 */
export const setHeadTitle = headTitle => ({type: SET_HEAD_TITLE, data: headTitle});

/**
 * 接收用户的同步action
 */
export const receiveUser = user => ({type:RECEIVE_USER, user});

/**
 * 登录失败后的错误提示信息的同步action
 */
export const showErrorMsg = errorMsg => ({type: SHOW_ERROR_MSG, errorMsg });


/**
 * 退出登录后的同步action
 */
export const logout = () => {
    //先清空localStorage
    storageUtil.removeUser();
    return {type: RESET_USER}
}

 /**
  * 登录的异步action
  */
export const  login = (username, password) => {
    return async dispatch => {
        //执行异步的ajax请求
        const result = await reqLogin(username, password);
        if(result.status === 0) {
            const user = result.data;
            //将user存储到local中
            storageUtil.saveUser(user);
            //如果成功分发成功的同步action
            dispatch(receiveUser(user));
        } else {
            //登录失败
            const msg = result.msg;
            dispatch(showErrorMsg(msg));
        }
    }
}