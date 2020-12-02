/*
 * @Author: 叶有志 
 * @Date: 2019-12-02 23:16:12 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 01:44:29
 */

import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import { setHeadTitle } from '../../redux/actions';
import './not-found.less';

class NotFound extends Component {

    goHome = () => {
        this.props.setHeadTitle('首页');
        this.props.history.replace('/home');
    }

    render () {
        return (
            <Row className="not-found">
                <Col span={12} className="left"></Col>
                <Col span={12} className="right">
                    <h1>404</h1>
                    <h2>抱歉，你访问的页面不存在</h2>
                    <div>
                        <Button type="primary" onClick={this.goHome}>返回首页</Button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({}),
    {setHeadTitle}
)(NotFound);