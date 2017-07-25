import React, { Component } from 'react';
import './App.less';
import CityMap from './component/CityMap'



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
    return (
        <div className="Test-part">
            <CityMap />
        </div>
    );
  }
}

export default App;
