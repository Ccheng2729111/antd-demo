import React, { Component } from 'react';
import './App.less'
import { DragSource } from 'react-dnd';

const boxSource = {
    beginDrag(props) {
        return {
            name: props.name,
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            window.alert( // eslint-disable-line no-alert
                `You dropped ${item.name} into ${dropResult.name}!`,
            );
        }
    },
};

class NewItem extends Component{
    deleteFn(name){
        const deleteHandler = this.props.deleteHandler;
        deleteHandler(name)
    }
    render(){
        const { isDragging, connectDragSource } = this.props;
        const { name } = this.props;
        return(
            connectDragSource(
                <li  onClick={this.deleteFn.bind(this,this.props.name)}>{name}</li>
            )
        )
    }

}

export default DragSource('aaa', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(NewItem)