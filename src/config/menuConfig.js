/*
 * @Author: 叶有志 
 * @Date: 2019-09-24 02:32:54 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-10-03 23:26:20
 */

const menuList = [
    {
        "title": "首页",
        "path": "/home",
        "icon": "home"
    },
    {
        "title": "商品",
        "icon": "appstore",
        "path": "/products",
        "children": [
            {
                "title": "品类管理",
                "path": "/category",
                "icon": "bars"
            },
            {
                "title": "商品管理",
                "path": "/product",
                "icon": "tool"
            }
        ]
    },
    {
        "title": "用户管理",
        "path": "/user",
        "icon": "user"
    },
    {
        "title": "角色管理",
        "path": "/role",
        "icon": "safety"
    },
    {
        "title": "图形管理",
        "path": "/charts",
        "icon": "area-chart",
        "children": [
            {
                "title": "饼图",
                "path": "/charts/pie",
                "icon": "pie-chart"
            },
            {
                "title": "折线图",
                "path": "/charts/line",
                "icon": "line-chart"
            },
            {
                "title": "条形图",
                "path": "/charts/bar",
                "icon": "bar-chart"
            }
        ]
    }
];

export default menuList;