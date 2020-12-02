import React, {Component} from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'

const Item = Form.Item;

class AddRole extends Component {
    constructor(props) {
        super(props);
        this.props.setForm(this.props.form);
        console.log(this.props.form);
    }
    static propTypes = {
        setForm: PropTypes.func.isRequired
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 18}
        }
        return (
            <Form>
                <Item {...formItemLayout} label='角色名称'>
                    {
                        getFieldDecorator('roleName', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '角色名称必须输入' }
                            ]
                        })(
                            <Input placeholder='请输入角色名称' />
                        )
                    }
                </Item>
            </Form>
        );
    }
}

export default Form.create()(AddRole);
