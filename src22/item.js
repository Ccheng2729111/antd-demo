import React, { Component } from 'react';
import './App.less'


class Item extends Component{
    render(){
        return(
            <li>{this.props.name}</li>
        )
    }
}

export default Item