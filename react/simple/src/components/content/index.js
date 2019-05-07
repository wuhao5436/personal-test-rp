import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import {Link, Route} from 'react-router-dom';
import Example from '../detail';
import { Table, Button } from 'antd';
const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
export default class Content extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      };
      start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      }
    
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            // onChange: (selectedRowKeys, selectedRows)=>{console.log('selectedRowKeys, selectedRows', selectedRowKeys, selectedRows)},
            onSelect: (record, selected, selectedRows, nativeEvent) =>{console.log('record, selected, selectedRows', record, selected, selectedRows)}
          };
        return (
            <div style={Object.assign({}, this.props.style)}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">文章1</a></Breadcrumb.Item>
                </Breadcrumb>
             {/* <Route path='/detail/:id' component={Example}></Route> */}
             <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
             </div>
        )
    }
}
