/*
 * @Author: mikyyz  
 * @Date: 2019-11-13 01:15 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-11-29 21:24:39
 */

import React, {PureComponent} from 'react';
import { Form, Select, Input } from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;

class UserForm extends PureComponent {
    constructor(props) {
        super(props);
        this.props.setForm(this.props.form);
    }
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        roles: PropTypes.array.isRequired
    }
    render() {
        const { roles } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 18}
        }
        return (
            <Form {...formItemLayout}>
                <Item label='用户名'>
                    {
                        getFieldDecorator('username', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '用户名必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入用户名' />
                        )
                    }
                </Item>
                <Item label='密码'>
                    {
                        getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '密码必须输入'}
                            ]
                        })(
                            <Input type='password' placeholder='请输入密码' />
                        )
                    }
                </Item>
                <Item label='手机号'>
                    {
                        getFieldDecorator('phone', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '手机号必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入手机号' />
                        )
                    }
                </Item>
                <Item label='邮箱'>
                    {
                        getFieldDecorator('email', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '邮箱必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入邮箱' />
                        )
                    }
                </Item>
                <Item label='角色'>
                    {
                        getFieldDecorator('role_id', {
                            initialValue: undefined,
                            rules: [
                                {required: true, message: '角色必须选择'}
                            ]
                        })(
                            <Select placeholder="请选择角色">
                                {
                                    roles.map(role => (
                                        <Option key={role._id} value={role._id}>{role.name}</Option>
                                    ))
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        );
    }
}

export default Form.create()(UserForm);
