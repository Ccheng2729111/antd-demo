import React, { Component } from 'react';
import '../App.less'

const data = {
    Brand:'核盛',
    Belong:'王永成',
    Area:'hangzhou',
    Time:'2017-06-29 21:00'
}

class MidPart extends Component {
    render() {
        return (
            <div className='MidPart'>
                <div className="BrandPart">
                    <span>Brand:{data.Brand}</span>
                    <span>Belong:{data.Belong}</span>
                </div>
                <div className="AreaPart">
                    <span>Area:{data.Area}</span>
                    <span>Time:{data.Time}</span>
                </div>
            </div>
        );
    }
}

export default MidPart;