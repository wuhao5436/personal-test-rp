import React, { Component } from 'react'
import Menu from '../components/menu';
import Content from '../components/content';
import {HashRouter as Router, Route} from 'react-router-dom';
import Example from '../components/detail';
import Timer from '../components/timer.js';


export default class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    window.timerInterVal = setInterval(() => {
      const { count } = this.state;
      console.log(123)
       this.setState({
         count: count+1
       }) 
    }, 2000);
  }
  componentWillUnmount () {
    clearInterval(window.timerInterVal)
  }
  render() {
    const { count } = this.state;
    return (
      <Router>
        <header style={{ borderBottom: '2px solid #ccc', marginBottom: 5, height: 120 }}>
          <h1 style={{ textIndent: 300 }}>我是标题，我是博客标题</h1>
          <p style={{ textAlign: "right", paddingRight: '300px' }}>我爱学习，学习使我快乐  -- 麦克杰克·浪</p>
        </header>
        {/* <Route path='/' exact>
          <div style={{ height: '100%', width: '100%', display: 'flex' }}>
            <Menu style={{ width: 200 }} />
            <Content style={{ flex: 1 }} />
          </div>
        </Route> */}
          <Timer count={count} />
      </Router>
    )
  }
}
