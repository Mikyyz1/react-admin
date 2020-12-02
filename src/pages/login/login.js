/*
 * @Author: 叶有志 
 * @Date: 2019-08-23 00:22:52 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 00:13:02
 */

import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import './login.less';
import { login } from '../../redux/actions'

class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err) {
                const { username, password } = values;
                this.props.login(username, password);
            }
            else {
                message.success(err);
            }
        })
    }
    handlePwd = (rule, value, callback) => {
        if(value === '') {
            callback('密码不能为空');
        } else if(value.length < 4) {
            callback('密码长度不能大于4位');
        } else if(value.length > 12) {
            callback('密码长度不能超过12位')
        } else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文,数字或下划线')
        } else {
            callback();
        }
    }

    render () {
        //如果从内存中没有读取到user,就说明用户没有登录，否则已经登录，就直接跳转到管理页面
        const user = this.props.user;
        if(user && user._id) {
            return <Redirect to='/home' />
        }

        const { errorMsg } = this.props.user;
        const form = this.props.form;
        const { getFieldDecorator } = form;

        return (
            <div className="login">
                <header className="login-header">
                    <span className="logo-text">React项目-后台管理系统</span>
                </header>
                <section className="login-content">
                    <h1>用户登录</h1>
                    <div className={errorMsg ? 'error-alert show' : 'error-alert'}>{errorMsg}</div>
                    <div className="login-wrapper">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('username', {
                                        rules: [
                                            { required: true, whitespace: true, message: '用户名不能为空！' },
                                            { min: 4, message: '用户名至少4位' },
                                            { max: 12, message: '用户名最多12位' },
                                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文,数字或下划线' }
                                        ],
                                        initialValue: 'admin'
                                    })(
                                        <Input  
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="用户名"
                                            />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password', {
                                        rules: [
                                            {validator: this.handlePwd}
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="密码"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

const WrappedLoginForm = Form.create()(Login);

export default connect(
    state => ({user: state.user}),
    {login}
)(WrappedLoginForm);

