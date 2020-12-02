/*
 * @Author: 叶有志 
 * @Date: 2019-10-11 23:18:23 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-11-29 23:14:30
 */

import React, { Component } from 'react';
import { Card, Select, Button, Icon, Input, Table, Tag, message } from 'antd';


import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/constants'

const { Option } = Select;

class ProductHome extends Component {

    state = {
        total: 0,
        products: [],
        loading: false,
        searchType: 'productName',
        searchName: ''
    }


    handleSelectChange = (value, e) => {
        this.setState({
            searchType: value
        })
    }

    handleInputChange = e => {
        e.preventDefault();
        this.setState({
            searchName: e.target.value
        })
    }

    getProducts = async (pageNum) => {
        this.setState({
            loading: true
        });
        //保存页码供其他函数使用
        this.pageNum = pageNum;
        const { searchName, searchType } = this.state;
        let result;
        if(searchName) {
            result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE);
        }
        this.setState({
            loading: false
        })
        if (result.status === 0) {
             const {total, list} = result.data;
             this.setState({
                 total,
                 products: list
             })
        }
    }
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status);
        if (result.status === 0) {
            message.success('状态更新成功');
            this.getProducts(this.pageNum);
        }
    }

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => `¥${price}`
            },
            {
                title: '状态',
                width: 100,
                //dataIndex: 'status',
                render: product => {
                    const {status, _id } = product;
                    const newStatus = status === 1 ? 2 : 1;
                    return (
                        <span>
                            <Button type='primary' onClick={() => this.updateStatus(_id, newStatus)}>
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <Tag color={status === 1 ? 'cyan' : 'red'}>{status === 1 ? '在售' : '已下架'}</Tag>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: product => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.props.history.push('/product/detail', product)}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
        ]
    };

    componentDidMount() {
        this.getProducts(1);
    }

    componentWillMount() {
        this.initColumns();
    }
    
    render () {
        const { products, total, loading, searchType, searchName } = this.state;

        const title = (
            <span>
                <Select value={searchType}
                        style={{width: 150}}
                        onChange={this.handleSelectChange}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder='关键字'
                       style={{width: 150, margin: '0 15px'}}
                       value={searchName}
                       onChange={this.handleInputChange}
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
                <Icon type='plus' />
                添加商品
            </Button>
        )    
        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    bordered
                    pagination={{
                        total,
                        current: this.pageNum,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}

export default ProductHome;
