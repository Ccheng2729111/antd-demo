import React, { Component } from 'react';
import OperationNum from '../component/OperationNum'
import CityMap from '../component/CityMap'
import HrList from '../component/HrList'
import Splashes from '../component/Splashes'
import TopList from '../component/BingChart'
import Supplies from '../component/Supplies'
import '../App.less'

class ChartList extends Component {

    render() {
        return (
            <div className='ChartList'>
                <OperationNum />
                <CityMap />
                <HrList />
                <Supplies />
                <Splashes />
                <TopList />
            </div>
        );
    }
}

export default ChartList;