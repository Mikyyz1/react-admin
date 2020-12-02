/*
 * @Author: 叶有志 
 * @Date: 2019-09-21 22:36:48 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-09-21 22:42:18
 */

/**
 * 存储读取loacal中数据的工具函数
 */

 import store from 'storejs';

 const USER_KEY = 'user_key';

 export default  {
     //保存用户
     saveUser(user) {
         store.set(USER_KEY, user)
     },

     //读取user
     getUser() {
         return store.get(USER_KEY) || {} //防止返回null，设置返回一个{};
     },

     //删除user
     removeUser() {
         store.remove(USER_KEY);
     }
 }