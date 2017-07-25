import React, { Component } from 'react';
import '../App.less'
import echarts from 'echarts'
import $ from 'jquery'
import { Table ,Switch ,Calendar} from 'antd'

const option = {
    textStyle: {
        color: "rgba(255,255,255,0.5)",
        fontSize:'10'

    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top:'5%',
        bottom:'5%',
        containLabel: true
    },
    xAxis: {
        axisLine:{
            show:false,
            lineStyle:{
                color:'rgba(255,255,255,0.2)'
            }
        },
        axisTick:{
            show:false
        },
        type: 'value',
        axisLabel: {
            show: true,
            interval: 'auto',
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.2)'
            }
        },
        show: true
    },
    yAxis: {
        axisTick:{
            show:false
        },
        axisLine:{
            lineStyle:{
                color:'rgba(255,255,255,0.2)'
            }
        },
        type: 'category',
        data: ['湖北托康','上海粉圆','杭州一帮','杭州光滑','上海循声','上海蔡振','丽水市太尉','金华市一大','宁波博鳌','杭州亚太','杭州正航','上饶市正从']
    },
    series: [
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        const colorList = ['#fca479','#fd9479','#fd873','#fb6e65','#ff6567','#fa6965','#fc6861'];
                        return colorList[params.dataIndex]
                    },
                    barBorderRadius: 6
                }
            },
            barWidth: 10,
            data: [7, 8,9,10,11,12,13,14,15,16,17,18]
        }
    ]
};

const data = [
    {id:1,name:'杭州元气医疗机械有限公司',city:'杭州',time:'2017-05-09 12:32'},
    {id:2,name:'苏州广开贸易有限公司',city:'苏州',time:'2017-05-09 12:32'},
    {id:3,name:'上海生病商贸行',city:'上海',time:'2017-05-09 12:32'},
    {id:4,name:'上海戏院医疗器械有限公司',city:'上海',time:'2017-05-09 12:32'},
    {id:5,name:'上海显赫上行',city:'上海',time:'2017-05-09 12:32'},
    {id:6,name:'上海生物科技有限公司',city:'上海',time:'2017-05-09 12:32'},
    {id:7,name:'航海工艺有限公司',city:'上海',time:'2017-05-09 12:32'},
    {id:8,name:'杭州白梓生有限公司',city:'杭州',time:'2017-05-09 12:32'},
    {id:9,name:'杭州还打医疗器械有限公司',city:'杭州',time:'2017-05-09 12:32'},
];

const dataTree = {
    number:32,
    pie:'30%',
    endTime:'2017.05.14',
    noEntry:9
}

class HrList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }
    }

    resize = () => {
        // console.log(this.state.chart);
        this.state.chart.resize();
    }

    componentDidMount() {
        const chart = echarts.init(document.getElementById('chart'));
        chart.setOption(option);
        this.setState({ chart: chart }, ()=> {
            $(window).resize(this.resize);
        })
    }
    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            className:'test'
        }, {
            title: '本月尚未报台',
            dataIndex: 'name',
            key: 'name',
            className:'test'
        }, {
            title: '公司所在地',
            dataIndex: 'city',
            key: 'city',
            className:'test'
        }, {
            title: '最近报台时间',
            dataIndex: 'time',
            key: 'time',
            className:'test'
        }];
        return (
            <div className='OperationNum'>
                <h1>经销商报台情况</h1>
                <span  className="englishPart">Distributor reporting situation</span>
                <div className="OperationWord">
                    本周共<span>{dataTree.number}</span>家经销商参与报告，报台率<span>{dataTree.pie}</span>；截至<span>{dataTree.endTime}</span>，本月尚有<span>{dataTree.noEntry}</span>家经销商还未报台。
                </div>
                <div id="chart"  style={{height:400,width:'60%',margin:'0 auto'}}>
                </div>
                <div className="rpt-table-warp center">
                    <Table bordered
                           columns={columns}
                           dataSource={data}
                           rowKey={row => row.id}
                           pagination={false}
                           size='default '
                    />
                </div>
            </div>
        );
    }
}

export default HrList;