/*
 * @Author: 叶有志 
 * @Date: 2019-09-23 23:38:58 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-11-29 21:31:35
 */

import React, { Component } from 'react';
import {Card, Table, Button, Modal, message} from 'antd';
import {PAGE_SIZE} from "../../utils/constants";
import dateFormat from "../../utils/dateFormat";
import LinkButton from "../../components/link-button";
import {reqDeleteUser, reqUsers} from "../../api";
import UserForm from './user-form';

const { confirm } = Modal;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], //用户列表
            roles: [
                {
                    _id: 'ssggheh5wtwtqq5566777te',
                    name: '经理'
                }
            ], //角色列表
            isShow: false
        }
        this.initColumns();
    }

    /*
    * 初始化列表
    * */
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: dateFormat
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: role_id => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: user => (
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    //删除用户
    deleteUser = user => {
        confirm({
            title: `确认删除${user.username}吗？`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                if(result.status === 0) {
                    message.success('用户删除成功！');
                    this.getUsers();
                }
            }
        })
    }

    //根据roles的数组，生成包含所有角色名称的对象
    initRoleNames = roles => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        }, {});

        this.roleNames = roleNames;
        this.roleNames = {};
    }

    getUsers = async () => {
        const result = await reqUsers();
        if(result.status === 0) {
            const { users, roles = [] } = result.data;
            this.initRoleNames(roles);
            this.setState({
                users,
                roles
            })
        }
    }

    /*
    * 添加或更新用户
    * */
    addOrUpdateUser = () => {
       //收集输入数据
        const user = this.form.getFieldsValue();
        console.log(user);
    }
    /*
    * 取消模态框
    * */
    cancelModal = () => {
        this.setState({
            isShow: false
        })
    }
    /*
    * 点击显示添加模态框
    * */
    showAddUserModal = () => {
        this.setState({
            isShow: true
        })
    }

    componentDidMount() {
        this.getUsers();
    }

    render () {
        const { users, roles, isShow } = this.state;
        const title = <Button type='primary' onClick={this.showAddUserModal}>创建用户</Button>;
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    columns={this.columns}
                    dataSource={users}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                />
                <Modal
                    title='添加用户'
                    visible={isShow}
                    okText={'确认'}
                    cancelText={'取消'}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.cancelModal}
                >
                    <UserForm
                        setForm={form => this.form = form}
                        roles={roles}
                    />
                </Modal>
            </Card>
        )
    }
}

export default User;
