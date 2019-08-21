/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 09:05:31
 * @LastEditTime: 2019-08-21 10:54:53
 * @LastEditors: Please set LastEditors
 */
import React, { PureComponent } from 'react'
import Menu from '../components/menu';
import Content from '../components/content';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Example from '../components/detail';
import Timer from '../components/timer.js';

import LodashComponents from '../pages/lodash';

export default class extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/lodash' component={LodashComponents} />
        </Switch>
      </Router>
    )
  }
}

{/*
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
          {/* <Timer count={count} /> */}