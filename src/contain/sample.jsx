import React, { Component } from 'react';
import OperationNum from '../component/OperationNum'
import CityMap from '../component/CityMap'
import HrList from '../component/HrList'
import Splashes from '../component/Splashes'
import TopList from '../component/BingChart'
import Supplies from '../component/Supplies'
import { Table } from 'antd'
import ReactPDF  from 'react-pdf'
import pdf from '../image/qqq.pdf'
import sample from './sample.pdf'

class Example extends Component {
    state = {
        pageIndex: null,
        pageNumber: null,
        total: null,
    }

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
        });
    }

    onDocumentLoad = ({ total }) => {
        this.setState({ total });
    }

    onPageLoad = ({ pageIndex, pageNumber }) => {
        this.setState({ pageIndex, pageNumber });
    }

    changePage(by) {
        this.setState(prevState => ({
            pageIndex: prevState.pageIndex + by,
        }));
    }

    render() {
        const {  pageIndex, pageNumber, total } = this.state;

        return (
            <div className="Example">
                <h1>react-pdf sample page</h1>
                <div className="Example__container">
                    <div className="Example__container__load">
                        <label htmlFor="file">Load from file:</label>&nbsp;
                        <input
                            type="file"
                            onChange={this.onFileChange}
                        />
                    </div>
                    <div className="Example__container__preview">
                        <ReactPDF
                            file={pdf}
                            onDocumentLoad={this.onDocumentLoad}
                            onPageLoad={this.onPageLoad}
                            pageIndex={pageIndex}
                            width={300}
                        />
                    </div>
                    <div className="Example__container__controls">
                        <button
                            disabled={pageNumber <= 1}
                            onClick={() => this.changePage(-1)}
                        >
                            Previous
                        </button>
                        <span>Page {pageNumber || '--'} of {total || '--'}</span>
                        <button
                            disabled={pageNumber >= total}
                            onClick={() => this.changePage(1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;