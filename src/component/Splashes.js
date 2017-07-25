import React, { Component } from 'react';
import '../App.less'
import echarts from 'echarts'
import $ from 'jquery'
import { Table } from 'antd'

const data = [
    [5,1,5,"杭州元气医疗机械有限公司"],
    [8,1,8,"杭州白梓生有限公司"],
    [7,2,3.5,"航海工艺有限公司"],
    [10,3,3.3,"苏州广开贸易有限公司"],
    [34,4,8.5,"上海显赫上行"],
    [15,5,3,"上海戏院医疗器械有限公司"],
    [30,5,6,"上海生物科技有限公司"],
    [20,6,3.5,"上海生病商贸行"],
    [40,7,5.8,"杭州还打医疗器械有限公司"]
];
const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    className:'test'
}, {
    title: '本月未见手术',
    dataIndex: 'opera',
    key: 'opera',
    className:'test'
}, {
    title: '医院级别',
    dataIndex: 'class',
    key: 'class',
    className:'test'
}, {
    title: '所在城市',
    dataIndex: 'local',
    key: 'local',
    className:'test'
}];
const dataTree = [
    {id:1,opera:'苏州第一医院',class:'三级',local:'苏州'},
    {id:2,opera:'无锡市第七人民医院',class:'三级',local:'无锡'},
    {id:3,opera:'绍兴市中医院',class:'三级',local:'绍兴'},
    {id:4,opera:'绍兴市中医院',class:'三级',local:'苏州'},
    {id:5,opera:'嘉兴市医院',class:'三级',local:'嘉兴'},
    {id:6,opera:'绍兴市第二人民医院',class:'三级',local:'绍兴'},
    {id:7,opera:'绍兴市第一人民医院',class:'二级',local:'绍兴'},
    {id:8,opera:'无锡市第一人民医院',class:'二级',local:'无锡'},
];
const option = {
    textStyle: {
        color: "rgba(255,255,255,0.5)",
        fontSize:'10'

    },
    grid: {
        top:'10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.2)'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.2)'
            }
        },
    },
    yAxis: {
        axisLine: { show: false },
        axisTick: { length: 0 },
        splitLine: {
            show:false,
            lineStyle: {
                color: ['#f0f0f0']
            }
        },
        scale: true
    },
    series: [{
        name: '1990',
        data: data,
        type: 'scatter',
        symbolSize:40,
        itemStyle: {
            normal: {
                color: function(params) {
                    // build a color map as your need.
                    const colorList = ['#ade9b6','#96e5a4','#7ee08a','#5fd972','#47d660','#44d35b','#43d45b'];
                    return colorList[params.dataIndex]
                },
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 1
            }
        }
    }]
};

class Splashes extends Component {
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
        const chart = echarts.init(this.chart);
        chart.setOption(option);
        this.setState({ chart: chart }, ()=> {
            $(window).resize(this.resize);
        })
    }
    render() {
        const data = {
            number:3.26,
            name:'浙江邵逸夫医院',
            day:5,
            operaNumber:41,
            endTime:'5月14日',
            pie:'98%',
            hosNumber:8
        }
        return (
            <div className='OperationNum'>
                <h1>医院手术量情况</h1>
                <span className="englishPart">Number of hospital surgery</span>
                <div className="OperationWord">
                    本周平均每家医院手术量<span>{data.number}</span>台/天；其中<span>{data.name}</span>手术量最大，<span>{data.day}</span>天共<span>{data.operaNumber}</span>台手术。
                </div>
                <div className="OperationWordOther">
                    截止到<span>{data.endTime}</span>，本月医院覆盖率<span>{data.pie}</span>，尚有<span>{data.hosNumber}</span>家目标医院未见手术。
                </div>
                <div className='Splashes'>
                    <div className="chart" style={{height:400,width:'60%',margin:'0 auto'}} ref={ ref => this.chart = ref} />
                </div>
                <div className="rpt-table-warp center">
                    <Table bordered
                           columns={columns}
                           dataSource={dataTree}
                           rowKey={row => row.id}
                           pagination={false}
                           size='default'
                    />
                </div>
            </div>

        );
    }
}

export default Splashes;