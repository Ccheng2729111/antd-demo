import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import SortableTree from 'react-sortable-tree';
import './App.less'
import { addNodeUnderParent ,removeNodeAtPath, getNodeAtPath , changeNodeAtPath} from '../node_modules/react-sortable-tree/dist/umd/react-sortable-tree'
import fuck from './fuck'
import Default from './Default'

class Aom extends Component{
    constructor(props){
        super(props);
        this.state = {
            treeData:[{title:(
                <input />
            )}],
            showTree:true,
            value:'',
            childerValue:''
        }
    }
    render(){
        return (
            <div className={this.state.showTree ?  "showContainPart" : "hideContainPart" }>
                <div onClick={()=>this.setState({showTree:false})} className='delete-btn'>删除</div>
                <SortableTree
                    className="test"
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    scaffoldBlockPxWidth={300}
                    generateNodeProps={rowInfo => ({
                        buttons: [
                            <button onClick={(event) => this.addNode(rowInfo)}>addchirld</button>,
                            <button onClick={(event) => this.addSameNode(rowInfo)}>add</button>,
                            <button onClick={(event) => this.saveNode(rowInfo)}>save</button>
                        ],
                    })}/*
                    nodeContentRenderer={Default}
                    handlerChange={this.handlerChange.bind(this)}*/
                />
            </div>
        )
    }
    handlerChange(e){
        console.log(e.target.value)
    }
    /*removeNode(rowInfo) {
        let {node, treeIndex, path} = rowInfo;
        const deleteNode = removeNodeAtPath({
            treeData: this.state.treeData,
            path: path,   // You can use path from here
            getNodeKey: ({node: TreeNode, treeIndex: number}) => {
                return number;
            },
            ignoreCollapsed: false,
        });
        this.setState({
            treeData:deleteNode
        })
        console.log(this.state.treeData[0])
    }*/
    saveNode(rowInfo){
        const input = ReactDOM.findDOMNode(this.refs.inputValue);
        const value = input.value;
        let NEW_NODE = {title:value};
        let { path } = rowInfo;
        console.log(rowInfo);
        let newTree = changeNodeAtPath({
            treeData: this.state.treeData,
            path:path,
            newNode: NEW_NODE,
            getNodeKey: ({ treeIndex }) =>  treeIndex
        });
        this.setState({treeData: newTree});
    }
    addSameNode(rowInfo){
        {
            let NEW_NODE = {title:(
                <fuck />
            )};
            let {node, treeIndex, path} = rowInfo;
            path.pop();
            let parentNode = getNodeAtPath({
                treeData: this.state.treeData,
                path : path,
                getNodeKey: ({ treeIndex }) =>  treeIndex,
                ignoreCollapsed : true
            });
            let getNodeKey = ({ node: object, treeIndex: number }) => {
                return number;
            };
            let parentKey = getNodeKey(parentNode);
            if(parentKey === -1) {
                parentKey = null;
            }
            console.log(parentKey);
            let newTree = addNodeUnderParent({
                treeData: this.state.treeData,
                newNode: NEW_NODE,
                expandParent: true,
                parentKey: parentKey,
                getNodeKey: ({ treeIndex }) =>  treeIndex
            });
            this.setState({treeData: newTree.treeData});
        }
    }
    addNode(rowInfo) {
        let NEW_NODE = {
            title: (
                <fuck />
            )
        };
        let { path} = rowInfo;
        let newTree = addNodeUnderParent({
            treeData: this.state.treeData,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: path.pop(),
            getNodeKey: ({treeIndex}) => treeIndex
        });
        this.setState({treeData: newTree.treeData});
    }
}

export  default Aom