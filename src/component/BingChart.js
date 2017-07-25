import React, { Component } from 'react';
import echarts from 'echarts'
import $ from 'jquery'


const option1 = {
    grid: {
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
    },
    series: [
        {
            type:'pie',
            radius: ['40%', '50%'],
            hoverAnimation:true,
            labelLine:{
                normal:{
                length:20,
                length2:25,
                }
            },
            label:{
                normal:{
                    formatter:'{b}\n{d}%',
                    show:true,
                    textStyle:{
                        color:'#fff',
                        fontSize:18
                    }
                }
            },
            data:[
                {value:5, name:'90岁以上',itemStyle:{normal:{color:'#eca27f'}}},
                {value:15, name:'14岁一下',itemStyle:{normal:{color:'#f5cf88'}}},
                {value:18, name:'80-89岁',itemStyle:{normal:{color:'#6dcad9'}}},
                {value:24, name:'15-44岁',itemStyle:{normal:{color:'#71ade9'}}},
                {value:38, name:'45-59岁',itemStyle:{normal:{color:'#689ee4'}}},
            ]
        }
    ]
};


const option = {
    grid: {
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
    },
    series: [
        {
            type:'pie',
            hoverAnimation:true,
            radius: ['40%', '50%'],
            labelLine:{
                normal:{
                length:20,
                length2:25,
                }
            },
            label:{
                normal:{
                    show:true,
                    formatter:'{b}\n{d}%',
                    textStyle:{
                        color:'#fff',
                        fontSize:18
                    }
                }
            },

            data:[
                {value:35, name:'男',itemStyle:{normal:{color:'#71ade9'}}},
                {value:65, name:'女',itemStyle:{normal:{color:'#eca27f'}}},
            ]
        }
    ]
};

class TopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            chart1: null,
        }
    }


    resize = () => {
        this.state.chart.resize();
        this.state.chart1.resize();
    }

    componentDidMount() {
        const chart = echarts.init(this.chart);
        const chart1 = echarts.init(this.chart1);
        chart.setOption(option);
        chart1.setOption(option1);
        this.setState({ chart: chart,chart1:chart1 }, ()=> {
            $(window).resize(this.resize);
        })
    }


    render() {
        const data = {
            age:'45-59',
            sex:'男'
        }
        return (
            <div className='OperationNum'>
                <h1>患者比例分布</h1>
                <span className="englishPart">Proportion of patients</span>
                <div className="OperationWord">
                    从患者分布信息来看，患者年龄主要集中在<span>{data.age}</span>岁区间；<span>{data.sex}</span>性居多。
                </div>
                <div className="BingChart">
                    <div className="chart" ref={ ref => this.chart = ref} style={{ height: 400,width:'50%'}} />
                    <div className="chart1" ref={ ref => this.chart1 = ref} style={{ height: 400,width:'50%' }} />
                </div>
            </div>
        )
    }
}

export default TopList