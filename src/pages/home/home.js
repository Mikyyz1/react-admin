/*
 * @Author: 叶有志 
 * @Date: 2019-09-24 00:19:14 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-12-05 23:33:42
 */

import React, { Component } from 'react';
import { ChartCard, yuan, Field, MiniArea, MiniBar, MiniProgress, Bar} from 'ant-design-pro/lib/Charts';
import {} from 'ant-design-pro/lib/NumberInfo';
import { Card, Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import './home.less';
import Trend from 'ant-design-pro/lib/Trend';
import 'ant-design-pro/dist/ant-design-pro.css';
import moment from 'moment';

class Home extends Component {
    state = {
      noTitleKey: 'sales_volume'
    }

    onTabChange = (key, type) => {
      this.setState({[type]: key})
    }
  
    render () {
      const { noTitleKey } = this.state;
      //访问数据
      const visitData = [];
      const beginDay = new Date().getTime();
      for (let i = 0; i < 20; i += 1) {
        visitData.push({
          x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
          y: Math.floor(Math.random() * 100) + 10,
        });
      }
      //销售数据
      const salesData = [];
      for(let i = 0; i < 12; i += 1) {
        salesData.push({
          x: `${i + 1}月`,
          y: Math.floor(Math.random() * 1000) + 200
        })
      }
      //tab选项
      const tabListNoTitle = [
        {
          key: 'sales_volume',
          tab: '销售额'
        },
        {
          key: 'page_view',
          tab: '访问量'
        }
      ]
      const contentListNoTitle = {
        sales_volume: <Bar height={300} title="销售额趋势" data={salesData} />,
        page_view: <Bar height={300} title="访问量趋势" data={salesData} />
      }
      // const tabBarExtraContent = (
      //   <div>
      //     <Button type="link">今日</Button>
      //     <Button type="link">今日</Button>
      //     <Button type="link">今日</Button>
      //     <Button type="link">今日</Button>
      //   </div>
      // )
        return (
            <div className="home-container">
               <Row gutter={16}>
                    <Col span={6}>
                      <ChartCard
                        style={{border: 0}}
                        title="销售额"
                        action={
                          <Tooltip title="销售额">
                            <Icon type="info-circle-o" />
                          </Tooltip>
                        }
                        total={() => <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />}
                        footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
                        contentHeight={46}
                      >
                        <span>
                          周同比
                          <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                            12%
                          </Trend>
                        </span>
                        <span style={{ marginLeft: 16 }}>
                          日环比
                          <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                            11%
                          </Trend>
                        </span>
                      </ChartCard>
                    </Col>
                    <Col span={6}>
                        <ChartCard
                          title="访问量"
                          style={{border: 0}}
                          action={
                            <Tooltip title="访问量">
                              <Icon type="info-circle-o" />
                            </Tooltip>
                          }
                          total={numeral(8846).format('0,0')}
                          footer={<Field label="日访问量" value={numeral(1234).format('0,0,')} />}
                          contentHeight={46}
                        >
                          <MiniArea height={45} data={visitData} color="rgb(151, 95, 228)" />
                        </ChartCard>
                    </Col>
                    <Col span={6}>
                        <ChartCard 
                          title="支付笔数"
                          style={{border: 0}}
                          action={
                            <Tooltip title="支付笔数">
                              <Icon type="info-circle-o" />
                            </Tooltip>
                          }
                          total={numeral(6560).format('0,0')}
                          footer={<Field label="转化率" value="60%" />}
                          contentHeight={46}
                        >
                          <MiniBar height={46} data={visitData} />
                        </ChartCard>
                    </Col>
                    <Col span={6}>
                        <ChartCard 
                          title="运营活动效果"
                          style={{border: 0}}
                          action={
                            <Tooltip title="运营活动效果">
                              <Icon type="info-circle-o" />
                            </Tooltip>
                          }
                          total={"78%"}
                          footer={
                            <div>
                              <span>
                                周同比
                                <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>
                                   12%
                                </Trend>
                              </span>
                              <span>
                                日环比
                                <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>
                                    11%
                                </Trend>
                              </span>
                            </div>
                          }
                          contentHeight={46}
                        >
                          <MiniProgress percent={78} strokeWidth={8} target={80} />
                        </ChartCard>
                    </Col>
               </Row>
               <Row style={{marginTop: 20}}>
                    <Card 
                      bordered={false}
                      style={{ width: '100%' }}
                      tabList={tabListNoTitle}
                      activeTabKey={noTitleKey}
                      onTabChange={key => {
                        this.onTabChange(key, 'noTitleKey')
                      }}
                      >
                        <Col span={15}>
                          {contentListNoTitle[noTitleKey]}
                        </Col>
                    </Card>          
               </Row>
            </div>
        )
    }
}

export default Home;