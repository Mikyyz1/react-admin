/*
 * @Author: 叶有志 
 * @Date: 2019-10-11 23:16:43 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-04 23:30:43
 */

import React, { Component } from 'react';
import {
   Card,
   List,
   Icon
}   from 'antd';
import LinkButton from "../../components/link-button";
import { BASE_IMG_URL } from '../../utils/constants';
//import { reqCategoryName } from '../../api';

const Item = List.Item;

class ProductDetail extends Component {
    state = {
        pName: '',
        sName: ''
    }

    // async componentDidMount() {
    //     // const {pCategoryId, categoryId } = this.props.location.state;
    //     // if (pCategoryId === '0') {  //一级分类下的商品
    //     //     const result = await reqCategoryName(categoryId);
    //     //     const pName = result.data.name;
    //     //     this.setState({pName});
    //     // } else { //二级分类
    //     //     const results = await Promise.all([reqCategoryName(pCategoryId), reqCategoryName(categoryId)]);
    //     //     // const pName = results[0].data.name;
    //     //
    //     // }
    // }

    render () {
        // 读取state携带过来的数据
        const {name, price, desc, detail, imgs} = this.props.location.state;
        
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 18}} />
                </LinkButton>
                <span>商品管理</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='item-left'>商品名称:</span>
                        <span className='item-right'>{name}</span>
                    </Item>
                    <Item>
                        <span className='item-left'>商品描述:</span>
                        <span className='item-right'>{desc}</span>
                    </Item>
                    <Item>
                        <span className='item-left'>商品价格:</span>
                        <span className='item-right'>{price}元</span>
                    </Item>
                    <Item>
                        <span className='item-left'>所属分类:</span>
                        <span className='item-right'></span>
                    </Item>
                    <Item>
                        <span className='item-left'>商品图片:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img}
                                        className='product-img'
                                        src={BASE_IMG_URL + img}
                                        alt={name}
                                    />
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='item-left'>商品详情:</span>
                        <span className='item-right' dangerouslySetInnerHTML={{__html: detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}

export default ProductDetail;
