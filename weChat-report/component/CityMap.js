import React, { Component } from 'react';
import '../App.less'
import echarts from 'echarts'
import chinaJson from '../image/china.json'
import $ from 'jquery'
echarts.registerMap('china', chinaJson);

const option = {
    grid: {
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
    },
    tooltip: {
        trigger: 'none',
    },
    visualMap: {
        type: 'continuous',
        show: true,
        itemHeight:50,
        inRange: {
            color: ['#e5eef7', '#4084cf']
        },
        textStyle: {
            color: '#60aae2'
        },
        text: ['高','低'], // 文本，默认为数值文本
        calculable: false
    },
    series: [
        {
            name: '中国',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#e5eef7',
                    borderColor: '#fff',
                },
                emphasis: {
                    areaColor: '#e5eef7',
                    borderWidth: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 3
                }
            },
            data:[
                { name:'广东',  value: 120 },
                { name:'浙江',  value: 20 },
                { name:'四川',  value: 340 },
                { name:'黑龙江',  value: 100 },
                { name:'江西',  value: 21 },
                { name:'江苏',  value: 210 },
            ]
        }
    ]
};
const option1 = {
    grid: {
        right: '10%',
        left: '10%',
        bottom: 0,
        top:0,
        containLabel: true,
    },
    color: ['#3398DB'],
    textStyle: {
        color: "#ffffff",

    },
    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        axisTick:{
            show:false
        },
        axisLine:{
            show:false,
            lineStyle:{
                color:'rgba(255,255,255,0.2)'
            }
        },
        interval:5,
        type: 'value',
        axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %',
            textStyle:{
                color:'rgba(255,255,255,0.7)'
            }
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
        axisLabel:{
            textStyle:{
                color:'rgba(255,255,255,0.7)'
            }
        },
        type: 'category',
        data: ['广东','浙江','四川','黑龙江','江西','江苏','湖北']
    },
    series: [
        {
            type: 'bar',
            barWidth: 10,
            data: [4, 5, 8, 11, 14, 15,20],
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        const colorList = ['#157ed7','#1d7de2','#3c91dd','#519de3','#62abe9','#7abbee','#8ecbf2'].reverse();
                        return colorList[params.dataIndex]
                    },
                }
            }
        }
    ]
};

const data = {
    mostCity:'南京',
    pie:'14.3%',
    noCity:'苏州,舟山',
    number:5
}

class CityMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            chart1:null
        }
    }
    resize = () => {
        this.state.chart.resize();
        this.state.chart1.resize();
    }
    componentDidMount() {
        const chart = echarts.init(document.getElementById('china-map'));
        const chart1 = echarts.init(document.getElementById('MapRight'));
        chart.setOption(option);
        chart1.setOption(option1);
        this.setState({ chart: chart,chart1: chart1}, ()=> {
            $(window).resize(this.resize);
        })
    }
    render() {
        return (
            <div className='OperationNum'>
                <h1>城市贡献度排行</h1>
                <span className="englishPart">Ranking of urban contribution</span>
                <div className="OperationWord">
                    本周<span>{data.mostCity}</span>贡献了所有辖区中<span>{data.pie}</span>份额，在本周位居榜首；<span>{data.noCity}</span>等
                    <span>{data.number}</span>个城市本周未见业务。
                </div>
                <div className="MapPart">
                    <div id='china-map' style={{ height: 300}} ref={ ref => this.chart = ref}>
                    </div>
                    <div id='MapRight' style={{ height: 300}} ref={ ref => this.chart = ref}>
                    </div>
                </div>
            </div>
        );
    }
}

export default CityMap;