import React, { Component } from 'react';
import MyTree from '../js/widgets/tree';

class SortTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData1: [{
                title: ''
            }],
        };



        this.updateTree1 = this.updateTree1.bind(this);
        //this.updateTree2 = this.updateTree2.bind(this);
        //this.updateTree3 = this.updateTree3.bind(this);
    }


    updateTree1(treeData1) {
        this.setState({treeData1});
    }

    /*updateTree2(treeData2) {
        this.setState({treeData2});
    }

    updateTree3(treeData3) {
        this.setState({treeData3});
    }*/


    render() {
        return (
            <div style={{height: 650}}>
                <MyTree
                    onChange={this.updateTree1}
                    treeData={this.state.treeData1}
                />
                {/*<MyTree
                    onChange={this.updateTree2}
                    treeData={this.state.treeData2}
                />
                <MyTree
                    onChange={this.updateTree3}
                    treeData={this.state.treeData3}
                />*/}
            </div>
        );
    }
}

export default SortTree