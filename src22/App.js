import React, { Component } from 'react';
import './App.less'
import Aom from './component'
import AddList from './addList'
import SortTree from './entry/launcher'



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            addList:[],
            time:0,
            treeTime:[]
        }
    }
    render() {
        return (
            <div className='set-class-component'>
                <AddList />
                <div className="empty-part"></div>
                <div className="sortable-tree">
                    <div className="root-dir">
                        <header>根目录</header>
                        <div className="add-fitst-btn" onClick={this.addFirstTitleHandler.bind(this)}>新增一级类别</div>
                    </div>
                    <div className="first-class">
                        <header>一级类别</header>
                    </div>
                    <div className="second-class">
                        <header>二级类别</header>
                    </div>
                    <div className="third-class">
                        <header>三级类别</header>
                    </div>
                    <div className="tree-part">
                        {
                            this.state.treeTime.map(function (index,item) {
                                return(
                                    <SortTree key={index} item={item}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
    addFirstTitleHandler(){
        const time = this.state.time;
        this.setState({
            treeTime:this.state.treeTime.concat(time),
            time: time + 1
        })

    }

}

export default App;
