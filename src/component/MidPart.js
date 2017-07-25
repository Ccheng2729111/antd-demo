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
                    <div><span>Brand:</span><span className="span1">{data.Brand}</span></div>
                    <div><span>Belong:</span><span className="span1">{data.Belong}</span></div>
                </div>
                <div className="AreaPart">
                    <div><span>Area:</span><span className="span2">{data.Area}</span></div>
                    <div><span>Time:</span><span className="span2">{data.Time}</span></div>
                </div>
            </div>
        );
    }
}

export default MidPart;