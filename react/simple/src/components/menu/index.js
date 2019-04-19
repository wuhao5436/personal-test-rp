import React, { Component } from 'react';
import { dataCreater } from '../../data/dataSource';
import { Link } from 'react-router-dom';    

export default class Meun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuData: []
        }
    }
    componentDidMount() {
        const menuData  = dataCreater('menuData');
        console.log('menuData', menuData)
        this.setState({
            menuData
        })
    }
  render() {
    const {menuData} = this.state;
    return (
      <div style={Object.assign({}, this.props.style, {background:'red'})}>
        <ul>
            {
                menuData.map(item => {
                    return <li key={item.id} style={{float:'left', margin:'5px 2px', width:'100%'}}>
                    <Link to={`/detail/${item.id}`}>{item.title}</Link>
                    </li>
                })
            }
        </ul>
      </div>
    )
  }
}
