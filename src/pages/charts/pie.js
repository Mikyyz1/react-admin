/*
 * @Author: 叶有志 
 * @Date: 2019-09-23 23:43:34 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-04 23:29:36
 */

import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react'

class Pie extends Component {

    getOptionOne = () => {
        return {
            title: {
                text: '站点用户访问来源',
                subtext: '具体统计',
                x: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/> {b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }
    getOptionTwo = () => {
        return {
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie Two',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc',
                    fontSize: 20,
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/> {b} : {c} ({d}%)'
            },

            visualMap: {
                show: true,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },

            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function(a, b) {return a.value - b.value}),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, .3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function() {
                        return Math.random * 200
                    }
                }
            ]

        }
    }
    render () {
        return (
            <div>
                <Card title="饼图一" style={{borderBottom: 0}}>
                    <ReactEcharts option={this.getOptionOne()} />
                </Card>
                <Card title="饼图二">
                    <ReactEcharts option={this.getOptionTwo()} />
                </Card>
            </div>
        )
    }
}

export default Pie;