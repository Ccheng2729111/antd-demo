import React, { Component } from 'react';
import './App.less';



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                {cycle:'05.29-06.04',type:'周报告',time:'2017年6月4日'},
                {cycle:'05.01-05.31',type:'月报告',time:'2017年5月31日'},
                {cycle:'05.22-05.28',type:'周报告',time:'2017年5月28日'},
                {cycle:'05.15-05.22',type:'周报告',time:'2017年5月12日'},
                {cycle:'05.01-05.15',type:'周报告',time:'2017年5月1日'},
            ]
        }
    }
  render() {
    return (
        <div className="App">
            <div className="HeaderPart">
                <h1>H.RPT报告历史纪录</h1>
                <div>注：报告生成后数据将不再发生变化，因此当数据发生修改，周报告与月报告数据可能不匹配。</div>
            </div>
            <div className="ListPart">
                {
                    this.state.data.map(function (index,item) {
                        return(
                            <div key={index}>
                                <div>
                                    <div>
                                        <span>H.RPT手术报台周回顾</span>
                                        <span>报台周期：{item.cycle}</span>
                                    </div>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
  }
}

export default App;
