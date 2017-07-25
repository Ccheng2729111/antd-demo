import React, { Component } from 'react';
import SortableTree, {getNodeAtPath,defaultGetNodeKey, addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, NodeRendererCustom } from '../lib/react-sortable-tree';

import { Icon } from 'antd';
import 'antd/dist/antd.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.updateTreeData = this.updateTreeData.bind(this);
        this.onInputSave = this.onInputSave.bind(this);
        this.delNode = this.delNode.bind(this);
    }


    // 更改名字功能
    onInputSave({node: targetNode, path, value }) {
        const treeData = changeNodeAtPath({
            treeData: this.props.treeData,
            path,
            newNode: ({node}) => ({...node,title: value}),
            getNodeKey: defaultGetNodeKey
        });

        this.updateTreeData(treeData);
    }

    // 删除节点功能
    delNode({path}) {
        this.updateTreeData(removeNodeAtPath({
            treeData: this.props.treeData,
            path,
            getNodeKey: defaultGetNodeKey
        }))
    }


    //添加子集元素
    addChilderNode(rowInfo) {
        let NEW_NODE = {
            title: ''
        };
        let { path} = rowInfo;
        let newTree = addNodeUnderParent({
            treeData: this.props.treeData,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: path.pop(),
            getNodeKey: ({treeIndex}) => treeIndex
        });
        this.updateTreeData(newTree.treeData)
    }

    // 更新treeData的逻辑，由于单向数据流的原因，数据源才有修改数据的权限。
    updateTreeData(treeData) {
        this.props.onChange(treeData);
    }
    render() {
        return (
            <div style={{height: 650}}>
                <SortableTree
                    nodeContentRenderer={NodeRendererCustom}
                    onInputSave={this.onInputSave}
                    treeData={this.props.treeData}
                    onChange={this.updateTreeData}
                    canDrag={({node}) => !node.noDragging}
                    generateNodeProps={rowInfo => ({
                        buttons: [
                            <Icon type="close-circle-o" onClick={() => this.delNode(rowInfo)} style={{ fontSize: 20, color: '#08c', background: '#fff', cursor: 'pointer' }} />,
                            <button onClick={this.addChilderNode.bind(this,rowInfo)}>addChilderNode</button>
                        ]
                    })}
                />
            </div>
        );
    }
}