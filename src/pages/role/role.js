/*
 * @Author: 叶有志 
 * @Date: 2019-09-23 23:40:54 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 00:53:47
 */

import React, { Component } from 'react';
import { Card, Table, Button, Modal, message } from 'antd';
import { connect } from 'react-redux';

import './role.less'
import {PAGE_SIZE} from "../../utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api';
import AddRole from "./add-role";
import AuthForm from './auth-form';
import dateFormat from '../../utils/dateFormat'


class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            role: {},
            isShowAddRoleModal: false,
            isShowAuthRoleModal: false
        };
        this.auth = React.createRef();
        this.initColumns();
    }

    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: dateFormat
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: dateFormat
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }
    onRow = role => {
        return {
            onClick: event => {
               this.setState({role})
                console.log(role);
            }, // 点击行
        }
    }

    getRoles = async () => {
        const result = await reqRoles();
        const role = result.data;
        if(result.status === 0) {
            //更新state
            this.setState({
                roles: role
            })
        }
    }
    showAddRoleModal = () => {
        this.setState({
            isShowAddRoleModal: true 
        })
    }

    handleAddRole = () => {
        //验证输入成功后再继续下面操作
        this.form.validateFields(async (errors, values) => {
            if (!errors) {
                //隐藏确认框
                this.setState({
                    isShowAddRoleModal: false
                })
                //收集输入数据
                const { roleName } = values;
                this.form.resetFields();
                //请求添加
                const result =  await reqAddRole(roleName);
                if (result.status === 0) {
                    //添加成功
                    message.success('角色添加成功');
                    //新产生的角色
                    const role = result.data;
                    // const {roles} = this.state;
                    // this.setState({
                    //     roles: [...roles, role]
                    // })

                    //更新roles状态，基于原本数据更新
                    this.setState(state => ({
                        roles: [...state.roles, role]
                    }))
                } else {
                    //添加失败
                    message.error('角色添加失败');
                }

            }
        })
    }

    handleCancel = () => {
        this.form.resetFields();
        this.setState({
            isShowAddRoleModal: false
        });
    }

    //添加权限部分
    showAuthRoleModal = () => {
        this.setState({
            isShowAuthRoleModal: true
        })
    }
    cancelAuthRoleModal = () => {
        this.setState({
            isShowAuthRoleModal: false
        })
    }

    handleAuthRole = async () => {
        this.setState({
            isShowAuthRoleModal: false
        });

        const { role } = this.state;
        const menus = this.auth.current.getMenus();
        role.menus = menus;
        role.auth_name = this.props.user.username;
        const result = await reqUpdateRole(role);
        if(result.status === 0) {
            //更新权限成功
            message.success('权限更新成功');
            this.getRoles();
        } else {
            //权限更新失败
            message.error('权限更新失败')
        }
    }


    componentDidMount() {
        this.getRoles()
    }

    render () {
        const {roles, role, isShowAddRoleModal, isShowAuthRoleModal} = this.state;
        const title = (
            <span>
                <Button type='primary' className='role-manage' onClick={this.showAddRoleModal}>创建角色</Button>
                <Button type='primary' disabled={!role._id} onClick={this.showAuthRoleModal}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
              <Table
                bordered
                rowKey='_id'
                columns={this.columns}
                dataSource={roles}
                pagination={{defaultPageSize: PAGE_SIZE}}
                onRow={this.onRow}
                rowSelection={{type: 'radio', selectedRowKeys: role._id, onSelect: (role) => this.setState({role})}}
              />
              <Modal
                  title='添加角色'
                  visible={isShowAddRoleModal}
                  okText={'确认'}
                  cancelText={'取消'}
                  onOk={this.handleAddRole}
                  onCancel={this.handleCancel}
              >
                 <AddRole
                     setForm={form => this.form = form}
                 />
              </Modal>
              <Modal
                  title='设置角色权限'
                  visible={isShowAuthRoleModal}
                  okText={'确认'}
                  cancelText={'取消'}
                  onOk={this.handleAuthRole}
                  onCancel={this.cancelAuthRoleModal}
              >
                  <AuthForm role={role} ref={this.auth} />
              </Modal>
            </Card>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(Role);
