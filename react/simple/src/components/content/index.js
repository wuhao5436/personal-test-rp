import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';
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
                我是内容
             </div>
        )
    }
}
