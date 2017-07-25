import React, { Component } from 'react';
import '../App.less'
import echarts from 'echarts'
import $ from 'jquery'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import  'echarts/lib/chart/bar';

const data = {
    dataTime:' (2017.05.08 - 2017.05.14) ',
    number:94,
    addNum:' 增加15 ',
    Rnumber:197
};
class OperationNum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }
    }
    resize = () => {
        console.log(this.state.chart);
        this.state.chart.resize();
    }
    componentDidMount(){
        const myChart = echarts.init(document.getElementById('test'));
        myChart.setOption( {
            color: ["#3fc9d3", "#4bd461"],
            textStyle: {
                color: "rgba(255,255,255,0.5)",
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'yellow',
                    }
                },
                lineStyle: {
                    color: "red"
                },

                data: ['一','二','三','四','五','六','日']
            }],
            yAxis: [{
                interval:5,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
            }],
            tooltip: {
                trigger: 'none',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            series: [{
                name: '上周手术量',
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        barBorderRadius: 6
                    }
                },
                data: [12, 13, 4, 5, 16, 6, 9]
            }, {
                name: '本周手术量',
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5
                    }
                },
                data: [15, 14, 5, 8, 4, 14, 20]
            }, ]
        });

        this.setState({ chart: myChart }, ()=> {
            $(window).resize(this.resize);
        })
    }
    render() {
        return (
            <div className='OperationNum'>
                <h1>本周每日手术量</h1>
                <span className="englishPart">Daily surgery volume this week</span>
                <div className="OperationWord">
                    本周<span>{data.dataTime}</span>手术量总计<span>{data.number}</span>,与上周相比<span>{data.addNum}</span>台，本月累计达到了<span>{data.Rnumber}</span>台。
                </div>
                <div className="OreraContain">
                    <div id="test" style={{height:200}} ref={ ref => this.chart = ref}>
                    </div>
                </div>
            </div>
        );
    }
}

export default OperationNum;