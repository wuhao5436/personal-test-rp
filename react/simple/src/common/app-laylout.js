import React, { Component } from 'react'
import Menu from '../components/menu';
import Content from '../components/content';
export default class extends Component {
  render() {
    return (
    <div>
    <header style={{borderBottom: '2px solid #ccc', marginBottom: 5}}>
        <h1 style={{textIndent: 300}}>我是标题，我是博客标题</h1>
        <p style={{textAlign: "right", paddingRight:'300px'}}>我爱学习，学习使我快乐  -- 麦克杰克·浪</p>
    </header>
      <div style={{ height: '100%' ,width:'100%', display: 'flex'}}>
        <Menu style={{width: 200}}/>
        <Content style={{flex: 1}}/>
      </div>
      </div>
    )
  }
}
