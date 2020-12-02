/*
 * @Author: 叶有志 
 * @Date: 2019-10-08 23:28:49 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-10-11 22:58:10
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const Item = Form.Item;

class UpdateForm extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form);
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName,
                            rules: [
                                {required: true, message: '分类名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入分类名称' />
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);
