import React, {Component} from 'react';
import SortableTree, {addNodeUnderParent, getNodeAtPath, removeNodeAtPath,toggleExpandedForAll} from 'react-trees-view';
import Record from './components/record';
import Upload from './components/uploader';
import UploadForm from './components/upload_form';
import UploadOption from './components/upload_option';
import Nav from '../view/nav.js';

import '../dist/css/reset.css';
import '../dist/otherCss/tree.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      //树
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        {
          title:  (
            <div className="tree-item">
              <input className="tree-input" type="text" placeholder="请输入选项的文字"/>
              <Upload />
              <Record />
            </div>
          ),
          expanded: true,
          noChildren: true,
          children: [
             {
              title: (
                <div className="tree-item">
                  <input className="tree-input" type="text" placeholder="请输入选项的文字"/>
                  <Upload />
                  <Record />
                </div>
              )
            }
          ]
        }
      ]
    };
    // this.changeText = this.changeText.bind(this);
  }
  addChildNode(rowInfo) {
    let NEW_NODE = {
      title: (
        <div className="tree-item">
          <input className="tree-input" type="text" placeholder="请输入选项的文字"/>
          <Upload />
          <Record />
        </div>
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
  removeNode(rowInfo)
  {
    let { path} = rowInfo;
    let newTree = removeNodeAtPath({
      treeData: this.state.treeData, path: path, // You can use path from here
      getNodeKey: ({ treeIndex: number}) => {
        return number;
      },
      ignoreCollapsed: false
    });
    this.setState({treeData: newTree});
  }
  expand(expanded) {
      this.setState({
          treeData: toggleExpandedForAll({
              treeData: this.state.treeData,
              expanded,
          }),
      });
  }
  expandAll() {
      this.expand(true);
  }
  collapseAll() {
      this.expand(false);
  }
  render() {
    const {
        searchString,
        searchFocusIndex,
        searchFoundCount,
    } = this.state;
    const selectPrevMatch = () => this.setState({
        searchFocusIndex: searchFocusIndex !== null ?
            ((searchFoundCount + searchFocusIndex - 1) % searchFoundCount) :
            searchFoundCount - 1,
    });

    const selectNextMatch = () => this.setState({
        searchFocusIndex: searchFocusIndex !== null ?
            ((searchFocusIndex + 1) % searchFoundCount) :
            0,
    });
    const treeContainerStyle = { height: 450 } ;
    return (
      <div>
        <Nav />
        <UploadForm />
        <div>
          <button className="tree-record" onClick={this.expandAll.bind(this)}>
              展开所有
          </button>

          <button className="tree-record"  onClick={this.collapseAll.bind(this)}>
              关闭所有
          </button>

          <form
              style={{ display: 'inline-block' }}
              onSubmit={(event) => {
                  event.preventDefault();
              }}
          >
              <label htmlFor="find-box">
                  搜索选项:
                  <input
                      id="find-box"
                      type="text"
                      value={searchString}
                      onChange={event => this.setState({ searchString: event.target.value })}
                  />
              </label>

              <button
                  type="button"
                  className="tree-record"
                  disabled={!searchFoundCount}
                  onClick={selectPrevMatch}
              >
                  &lt;
              </button>

              <button
                  type="submit"
                   className="tree-record"
                  disabled={!searchFoundCount}
                  onClick={selectNextMatch}
              >
                  &gt;
              </button>

              <span>
                  &nbsp;
                  {searchFoundCount > 0 ? (searchFocusIndex + 1) : 0}
                  &nbsp;/&nbsp;
                  {searchFoundCount || 0}
              </span>
          </form>
          <div  style={treeContainerStyle}>
          <SortableTree
            treeData={this.state.treeData}
            isVirtualized={true}
            onChange={treeData => this.setState({treeData})}
            onMoveNode={({ node, treeIndex, path }) =>
                console.log( // eslint-disable-line no-console
                    'node:', node,
                    'treeIndex:', treeIndex,
                    'path:', path,
                )
            }
            canDrag={({ node }) => !node.noDragging}
            canDrop={({  nextParent }) => !!nextParent}
            generateNodeProps={rowInfo => ({
                buttons: [
                    <button  key='1' onClick={() => this.addChildNode(rowInfo)}>添加子集选项</button>,
                    rowInfo.treeIndex!=0 && <button  key='2' onClick={() => this.removeNode(rowInfo)}>删除该选项</button>
                ],
            })}
            searchFinishCallback={matches =>
                this.setState({
                    searchFoundCount: matches.length,
                    searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
                })
            }
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
          />
      </div>
      </div>
    </div>
    );
  }
}

export default App;
