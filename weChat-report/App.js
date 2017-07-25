import React, { Component } from 'react';
import Header from './component/Header'
import MidPart from './component/MidPart'
import ChartList from './contain/ChartList'
import './App.less';
import { Table } from 'antd'



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            startTime:'05.08',
            endTime:'05.12'
        }
    }
  render() {
    return (
        <div className="App">
            <div className="noneCeng"></div>
            <Header startTime={this.state.startTime} endTime={this.state.endTime}/>
            <MidPart />
            <ChartList />
        </div>
    );
  }
}

export default App;
