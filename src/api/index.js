/*
 * @Author: 叶有志 
 * @Date: 2019-09-17 22:10:35 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-10-11 00:19:59
 */
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
const BASE = '';

/**
 * 根据接口文档定义接口请求函数
 * 包含应用中所有接口请求函数模块
 * 每个函数的返回值都是promise
 */

//登录
 export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST');

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');

//获取分类列表请求函数
export const reqCategorys = parentId => ajax(BASE + '/manage/category/list',{parentId});

//添加分类的请求函数
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST');

//删除分类的请求函数
export const reqDeleteCategory = (categoryId) => ajax(BASE + '/manage/category/delete', {categoryId}, 'DELETE');

//更新分类名称请求函数
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST');

//根据商品id获取商品对象
export const reqCategoryName = productId => ajax(BASE + '/manage/product/info', {productId});

// 更新产品状态(上架/下架)请求函数
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST');

//搜索商品分页列表(根据商品名称/商品描述)
//searchType: 搜索的类型，productName/productDesc
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
})

//请求商品列表请求函数
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list',{pageNum, pageSize});

//删除图片的请求函数
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST');

//更新或添加商品的接口函数
export const reqAddOrUpdateProduct = product => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product,'POST');


//获取角色列表请求函数
export const reqRoles = () => ajax(BASE + '/manage/role/list');

//添加角色请求函数
export const reqAddRole = roleName => ajax(BASE + '/manage/role/add', {roleName}, 'POST');

//更新角色权限请求函数
export const reqUpdateRole = role => ajax(BASE + '/manage/role/update', role, 'POST');

//获取用户列表
export const reqUsers = () => ajax(BASE + '/manage/role/list' );

//删除用户
export const reqDeleteUser = userId => ajax(BASE + '/manage/user/delete',{userId}, 'POST');

//添加用户
export const reqAddUsers = user => ajax(BASE + '/manage/user/add', user, 'POST');

//jsonp的接口请求函数
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        let url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (err, data) => {
            if(!err && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0];
                resolve({ dayPictureUrl, weather })
            } else {
                message.error('获取天气信息失败！');
            }
        })
    })
};
