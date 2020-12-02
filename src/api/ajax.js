/*
 * @Author: 叶有志 
 * @Date: 2019-09-17 00:36:35 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-09-21 02:48:24
 */

 import axios from 'axios';
 import { message } from 'antd'

/**
 * 
 * 发送ajax异步请求模块
 */

const ajax = (url, data ={}, type='GET') => {
    return new Promise((resolve, reject) => {
        let promise = '';

        if(type === 'GET') {
            promise = axios.get(url, {
               params: data
            })
        } else {
            promise =  axios.post(url, data)
        }

        promise.then((response) => {
            resolve(response.data)
        }).catch((err) => {
            message.error('请求出错了' + err.message);
        });
    })
    
}

export default ajax;