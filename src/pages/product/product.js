/*
 * @Author: 叶有志 
 * @Date: 2019-09-23 23:40:19 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-10-11 23:32:17
 */

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import ProductHome from './home';
import ProductDetail from './detail';
import ProductAddUpdate from './add-update';
import './product.less';


class Product extends Component {
    render () {
        return (
            <Switch>
                <Route path='/product' exact component={ProductHome} />
                <Route path='/product/detail' component={ProductDetail} />
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}

export default Product;
