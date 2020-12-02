/*
 * @Author: 叶有志 
 * @Date: 2019-09-22 00:36:38 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 01:51:02
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { connect } from 'react-redux';

import LinkButton from '../link-button';
import dateFormat from '../../utils/dateFormat';
import { reqWeather } from '../../api';
import menuList from '../../config/menuConfig';
import { logout } from '../../redux/actions';
import './index.less';

class Header extends Component {
    state = {
        currentDate: '',
        dayPictureUrl: '',
        weather: ''
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentDate = dateFormat(Date.now());
            this.setState({currentDate}) 
        }, 1000)
    }

    getWeather = async() => {
        const { dayPictureUrl, weather } = await reqWeather('北京');
        this.setState({ dayPictureUrl, weather });
    }

    getTitle = () => {
        let title = '';
        const path = this.props.location.pathname;
        menuList.forEach(item => {
            if(item.path === path) {
                title = item.title;
            } else if(item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0); // (/product/detail)(/product)
                if(cItem) {
                    title = cItem.title;
                }
            }
        });

        return title;
    }

    handleLogout = () => {
        Modal.confirm({
            title: '确定需要退出吗?',
            onOk: () => {
              this.props.logout();
            }
        })
    }

    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    componentWillUnmount() {
         clearInterval(this.intervalId);
    }

    render () {
        const { dayPictureUrl, weather, currentDate } = this.state;
        //const title = this.getTitle();
        const title = this.props.headTitle;
        const username = this.props.user.username;
        return (
            <div className="header">
                <div className="header-top">
                <span className="user-text">您好, {username}</span>
                    <LinkButton onClick={this.handleLogout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className={title ? 'header-bottom-left' : ''}>{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentDate}</span>
                        <img src={dayPictureUrl} alt="天气" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({headTitle: state.headTitle, user: state.user}),
    {logout}
)(withRouter(Header));
