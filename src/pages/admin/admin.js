/*
 * @Author: 叶有志 
 * @Date: 2019-09-23 00:22:22 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 01:23:44
 */

import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home';
import Category from '../category/category';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import NotFound from '../not-found/not-found';

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    render () {
        const user = this.props.user;
        //如果内存中没有存储user, 当前没有登录
        if(!user || !user._id) {
            //自动条转到登录页
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout >
                    <Header>Header</Header>
                    <Content style={{margin:'20px', backgroundColor: '#fff'}}>
                        <Switch>
                            <Redirect exact from='/' to='/home' />
                            <Route path="/home" component={Home}/>
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/category" component={Category} />
                            <Route path="/product" component={Product} />
                            <Route path="/role" component={Role} />
                            <Route path="/user" component={User} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer className="footer" style={{textAlign: 'center'}}>推荐使用谷歌浏览器，以获得更佳的页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(Admin);