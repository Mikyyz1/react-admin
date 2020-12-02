/*
 * @Author: 叶有志 
 * @Date: 2019-09-23 23:37:57 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-10-11 22:55:38
 */

import React, { Component } from 'react';
import { Card, Table, Button, Icon, message, Breadcrumb, Modal } from 'antd';

import LinkButton from '../../components/link-button';
import { reqCategorys, reqUpdateCategory, reqDeleteCategory, reqAddCategory } from '../../api';
import AddForm from './add-form';
import UpdateForm from './update-form'

class Category extends Component {
    state = {
        loading: false,
        categorys: [], //定义一级分类列表状态
        subCategorys: [], //二级分类列表
        parentId: '0',
        parentName: '',
        showStatus: 0, //控制模态框显示，0:代表不显示，1:代表添加显示， 2:代表更新显示
    }

    // 获取列表数据
    getCategorys = async (parentIds) => {
        //获取数据之前将loading设置为true
        this.setState({
            loading: true
        })
        const parentId = parentIds || this.state.parentId;
        const result = await reqCategorys(parentId);
        
        
        //获取数据之后将loading设置为false
        this.setState({
            loading: false
        })

        if(result.status === 0) {
            const categorys = result.data;

            //如果parentId为0
            if(parentId === '0') {
                this.setState({
                    categorys
                }) 
            } else {
                this.setState({
                    subCategorys: categorys
                })
            }
        } else {
            message.error('获取分类列表失败')
        }
        
    }

    //显示一级列表
    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }

    /**
     * 响应点击取消，隐藏模态框
     */
    handleCancel = () => {
        //清除数据
        this.form.resetFields();

        this.setState({
            showStatus: 0
        });
    }

    /**
     * 显示添加模态框
     */
    addShow = () => {
        this.setState({
            showStatus: 1
        });
    }
    
    /**
     * 
     * 显示更新模态框
     */
    updateShow = (category) => {
        this.category = category;

        this.setState({
            showStatus: 2
        })
    }

    /**
     * 添加模态框
     */
    addCategory = () => {
        this.form.validateFields(async (err, values) => {
            if(!err) {
                 //点击确定后隐藏模态框
                this.setState({
                    showStatus: 0
                });
                //获取请求参数
                const {categoryName, parentId} = values;
                console.log('parentId', parentId)

                //清除数据
                this.form.resetFields();

                //调用添加分类接口
                const result = await reqAddCategory(categoryName, parentId);

                if(result.status === 1) {
                    message.warning(result.msg);
                } else if(result.status === 0) {
                    //添加的分类就是当前列分类列表下的分类
                    if(parentId === this.state.parentId) {
                        this.getCategorys();
                    } else if(parentId === '0') {  //在二级列表下添加一级分类
                        this.getCategorys('0');
                    }
                }
            }
        })
    }

    /**
     * 更新模态框
     */
    updateCategory = () => {
        
        this.form.validateFields(async (err, values) => {
            console.log(values);
            if(!err) {
                //隐藏模态框
                this.setState({
                    showStatus: 0
                });
                
                const categoryId = this.category._id;
                const { categoryName } = values;
                
                //清除数据
                this.form.resetFields();

                //发送请求
                const result = await reqUpdateCategory({categoryId, categoryName});
                
                if(result.status === 0) {
                    //更新列表
                    console.log('更新了')
                    this.getCategorys();
                }
            }
        })
    }  

    //显示二级列表
    showSubCategorys = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            console.log('parentId',this.state.parentId)
            this.getCategorys();
        })
    }

    //删除分类
    deleteCategory = async(category) => {
        const categoryId = category._id;
        console.log(categoryId)
        const result = await reqDeleteCategory(categoryId);
        if(result.status === 0) {
            message.success(result.msg);
            this.getCategorys();
        } else {
            message.error(result.msg)
        }
    }

    //点击删除显示模态框
    deleteShow = (category) => {
        Modal.confirm({
            title: '确定删除此分类吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.deleteCategory(category)
            }
        });
    }
    
    /**
     * 获取分类
     */
    componentDidMount() {
        this.getCategorys();
    }

    render () {
        const { categorys, loading, parentId, parentName, subCategorys, showStatus } = this.state;
        const category = this.category || {};
        //card左侧
        const title = parentId === '0' ? '一级分类列表' : (
            <Breadcrumb>
                <Breadcrumb.Item onClick={this.showCategorys}>
                    <LinkButton>一级分类列表</LinkButton>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{parentName}</Breadcrumb.Item>
            </Breadcrumb>
        )

        //card右侧
        const extra = (
            <Button type='primary' onClick={this.addShow}>
                <Icon type='plus' />
                添加
            </Button>
        )
        const columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width: 300,
              render: (category) => (
                  <span>
                      <LinkButton onClick={() => this.updateShow(category)}>修改分类</LinkButton>
                      {
                          this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
                          : null
                      }
                      <LinkButton onClick={() => this.deleteShow(category)}>删除</LinkButton>
                  </span>
              )
            },
        ];
        return (
            <Card title={title} extra={extra}>
                <Table 
                    dataSource={ parentId === '0' ? categorys : subCategorys} 
                    columns={columns} 
                    rowKey='_id' 
                    loading={loading}
                    bordered
                    pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    >
                    <AddForm
                        setForm={form => this.form = form}
                        categorys={categorys} 
                        parentId={parentId}
                    />
                </Modal>
                
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    >
                    <UpdateForm categoryName={category.name} setForm={form => this.form = form} />
                </Modal>
            </Card>
        )
    }
}

export default Category;