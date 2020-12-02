/*
 * @Author: 叶有志 
 * @Date: 2019-09-22 00:33:39 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-04 21:52:04
 */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import{ connect } from 'react-redux';

import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';
import { setHeadTitle } from '../../redux/actions';

const { SubMenu } = Menu;

class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.menuNodes = this.getMenuNodes(menuList);
    }

    // getMenuNodes = menuList => {
    //     return menuList.map(item => {
    //         if(!item.children){
    //             return (
    //                 <Menu.Item key={item.path}>
    //                     <Link to={item.path}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return(
    //                 <SubMenu
    //                     key={item.path}
    //                     title={
    //                     <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </span>
    //                     }
    //                 >
    //                     {this.getMenuNodes(item.children)}
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }
    getMenuNodes = menuList => {
        //获取当前路由
        const path = this.props.location.pathname;

        return menuList.reduce((prev, item) => {
            //向prevt添加Menu.Item
            if(!item.children) {
                //判断item是否为当前的item
                if(item.path === path || path.indexOf(item.path) === 0) {
                    this.props.setHeadTitle(item.title);
                }
                prev.push((
                    <Menu.Item key={item.path}>
                         <Link to={item.path} onClick={() => this.props.setHeadTitle(item.title)}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                const curItem = item.children.find(items => items.path === path);
                if(curItem) {
                    this.openKey = item.path;
                }
                prev.push((
                    <SubMenu
                         key={item.path}
                         title={
                         <span>
                             <Icon type={item.icon} />
                             <span>{item.title}</span>
                         </span>
                        }
                     >
                         {this.getMenuNodes(item.children)}
                     </SubMenu>
                ))
            }

            return prev;

        }, [])
    }

    // //在第一次render之前执行一次
    // componentWillMount() {
    //     this.menuNodes = this.getMenuNodes(menuList)
    // }
    
    render () {
        const path = this.props.location.pathname;
        const openKey = this.openKey;
        // console.log(openKey);
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="" />
                    <h1>React后台管理系统</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

//withRouter是一个高阶组件，
//包装非路由组件，返回一个新的组件
//新的组件向非路由组件传递3个属性，history/location/match

export default connect(
    state => ({}),
    {setHeadTitle}
)(withRouter(LeftNav));