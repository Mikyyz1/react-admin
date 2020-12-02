/*
 * @Author: 叶有志 
 * @Date: 2019-09-23 23:43:02 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-11-30 22:41:50
 */

import React, { Component } from 'react';
import { Card, Button } from 'antd';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'

class Bar extends Component {

    state = {
        sales: [150, 200, 360, 100, 100, 200, 300],
        stocks: [350, 270, 340, 180, 170, 210, 380]
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale => sale + 5),
            stocks: state.stocks.reduce((acc, cur) => {
                acc.push(cur - 5)
                return acc;
            }, [])
        }))
    }

    getOption = (sales, stocks) => {
        return {
            title: {
                text: '某公司销量和库存统计'
            },
            tooltip: {},
            legend: {
                data:['销量', '库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,0,0,1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    }
                },
                data: sales
            }, {
                name: '库存',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,0,0,1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: stocks
            }]
        }
    }
    render () {
        const { sales, stocks } = this.state;
        return (
            <div>
                <Card style={{borderBottom: 0}}>
                    <Button type="primary" onClick={this.update}>更新</Button>
                </Card>
                <Card title="柱状图一">
                    <ReactEcharts option={this.getOption(sales, stocks)} />
                </Card>
            </div>
        )
    }
}

export default Bar;