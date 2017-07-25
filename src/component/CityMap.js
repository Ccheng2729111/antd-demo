import React, { Component } from 'react';
import '../App.less'
import echarts from 'echarts'
import chinaJson from '../image/china.json'
import $ from 'jquery'
import { Checkbox } from 'antd';
import chinaData from '../chinaData'
import _ from 'underscore'
const CheckboxGroup = Checkbox.Group;
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
        trigger: 'item',
    },
    visualMap: {
        type: 'continuous',
        show: true,
        itemHeight:100,
        inRange: {
            color: ['#3675b5', '#b1d7f4']
        },
        textStyle: {
            color: '#60aae2'
        },
        text: ['高','低'], // 文本，默认为数值文本
        calculable: false,
        left:'150px',
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
                    areaColor: '#4b5e72',
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
            selectCity:'',
            indeterminate: false,
            checkAll: false,
            checkedList:['乌鲁木齐','克拉玛依','拉萨'],
            dataList:['乌鲁木齐','克拉玛依','拉萨']
        }
    }
    mapChinaData(name){
        for(let key in chinaData){
            const newDataList = [];
            if(name === key){
                chinaData[name].map(function (item,index) {
                    newDataList.push(item);
                });
                return newDataList
            }
        }
    }
    resize = () => {
        this.state.chart.resize();
    }
    componentDidMount() {
        //const that = this;
        const chart = echarts.init(document.getElementById('china-map'));
        chart.setOption(option);
        this.setState({ chart: chart}, ()=> {
            $(window).resize(this.resize);
        })
        chart.on('click',function (params) {
            let city = params.name;
            this.setState({
                selectCity:city,
            },()=>this.setState({
                indeterminate:this.state.dataList.length === 0 ? false :
                    _.intersection(this.state.dataList,this.mapChinaData(this.state.selectCity)).length === this.mapChinaData(this.state.selectCity).length ?
                        true : false ,
                checkAll: this.state.dataList.length === 0 ? false :
                    _.intersection(this.state.dataList,this.mapChinaData(this.state.selectCity)).length === this.mapChinaData(this.state.selectCity).length ?
                        true : false,
            }))
        }.bind(this))
    }
    onChange(checkedList) {
        console.log(_.difference(this.state.checkedList,checkedList))
        this.setState({
            dataList:checkedList.length >= this.state.checkedList.length ?
                _.uniq(this.state.dataList.concat(_.difference(checkedList,this.state.checkedList))) :
                _.difference(this.state.dataList,_.difference(this.state.checkedList,checkedList))
        },()=>this.setState({
            checkedList:checkedList,
        },()=>this.setState({
            indeterminate: !!checkedList.length && (checkedList.length < this.mapChinaData(this.state.selectCity).length)
            || _.intersection(checkedList,this.mapChinaData(this.state.selectCity)).length === this.mapChinaData(this.state.selectCity).length,
            checkAll: checkedList.length === this.mapChinaData(this.state.selectCity).length
            || _.intersection(checkedList,this.mapChinaData(this.state.selectCity)).length === this.mapChinaData(this.state.selectCity).length,
        })));
    }
    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? _.uniq(this.state.checkedList.concat(this.mapChinaData(this.state.selectCity))): _.difference(this.state.checkedList,this.mapChinaData(this.state.selectCity)),
            dataList:e.target.checked ?
                _.intersection(this.state.dataList,this.mapChinaData(this.state.selectCity)).length === this.mapChinaData(this.state.selectCity).length ?
                    [] :
                    _.uniq(this.state.dataList.concat(this.mapChinaData(this.state.selectCity)))
                    /*this.state.dataList.length > this.mapChinaData(this.state.selectCity).length ?
                    this.state.dataList.concat(_.difference(this.state.dataList,this.mapChinaData(this.state.selectCity))):
                        this.state.dataList.concat(_.difference(this.mapChinaData(this.state.selectCity),this.state.dataList))*/:
                _.uniq(_.difference(this.state.dataList,this.mapChinaData(this.state.selectCity))),
            indeterminate: true,
            checkAll:e.target.checked
        });
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
                    <div id='china-map' style={{ height: 400,width:'100%'}} ref={ ref => this.chart = ref}>
                    </div>
                </div>
                {
                    this.state.dataList === [] ? null :
                        <div>
                            {this.state.dataList.map(function (item,index) {
                                return(
                                    <div key={index}>
                                        <h1>{item}</h1>
                                    </div>
                                )
                            })}
                        </div>
                }
                {
                    this.state.selectCity === '' ? null :
                        <div className="checkBoxList">
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                Check all
                            </Checkbox>
                            <CheckboxGroup options={this.mapChinaData(this.state.selectCity)}
                                           value={this.state.dataList}
                                           onChange={this.onChange.bind(this)} />
                        </div>
                }
            </div>
        );
    }
}

export default CityMap;