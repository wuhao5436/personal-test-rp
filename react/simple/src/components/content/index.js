import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import {Link, Route} from 'react-router-dom';
import Example from '../detail';
import { Column, Table } from 'react-virtualized';

export default class Content extends Component {
   
    render() {
        return (
            <div style={Object.assign({}, this.props.style)}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">文章1</a></Breadcrumb.Item>
                </Breadcrumb>
             <Route path='/detail/:id' component={Example}></Route>
             </div>
        )
    }
}
