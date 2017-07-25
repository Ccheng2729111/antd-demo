import React, { Component } from 'react';
import '../App.less'

class Header extends Component {
    render() {
        return (
            <div className='HeaderPart'>
                <div className="HeaderTitle">
                    <div className="h1">H.RPT</div>
                    <div>
                        <div className="operaReport">手术周报回顾</div>
                        <div className="HeaderTitleContain">
                            <div className="HeaderData">报告周期：
                                <span>{this.props.startTime} -</span>
                                <span>{this.props.endTime}</span>
                            </div>
                            <div className="Triangle"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;