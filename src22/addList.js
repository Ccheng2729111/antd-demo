import React, { Component } from 'react';
import './App.less'
import Item from './item'
import NewItem from './newItem'


function removeByValue(arr, val) {
    for(let i=0; i<arr.length; i++) {
        if(arr[i] === val) {
            arr.splice(i, 1);
            return(
                arr
            )
        }
    }
}

class AddList extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            dataArray: ['腰椎后路钢板','钢板','微型钢板','钛合金螺钉','钛合通用型螺钉','普通钢板'],
        }
    }
    changeHandler(e){
        this.setState({
            value: e.target.value
        })
    }
    onKeyUpHandler(e){
        if(e.keyCode !== 13){
            return
        } else {
            this.setState({
                dataArray:this.state.dataArray.concat(this.state.value),
                value:''
            })
        }
    }
    deleteHandler(item){
        this.setState({
            dataArray: removeByValue(this.state.dataArray,item)
        });
    }
    render(){
        const dataArray = this.state.dataArray;
        const list = dataArray.map(function (item,index) {
            if(index <= 5){
                return (
                    <Item name={item}/>
                )
            } else {
                return (
                    <NewItem name={item} deleteHandler = {this.deleteHandler.bind(this)}/>
                )
            }
        }.bind(this));
        return(
            <div className="add-list">
                <header>本次新增</header>
                <div className="add-Task">
                    <ul>
                        {list}
                        <input style={{cursor:'pointer'}}
                               type="text"
                               placeholder="点此添加新增一条"
                               value={this.state.value}
                               onChange={this.changeHandler.bind(this)}
                               onKeyUp={this.onKeyUpHandler.bind(this)}/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddList