/*
 * @Description: In User Settings Edit
 * @Author: luoshi
 * @Date: 2019-08-21 10:38:29
 * @LastEditTime: 2019-08-21 11:34:21
 * @LastEditors: Please set LastEditors
 */

// 这个文件是用来测试 memoizeOne 的作用的


import React, { Component } from 'react'
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';

export default class index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      a: 100,
      b: 200,
      totle: 0,
      obja: {name:'xiaoli'},
      objb: {age: 15},
      combinedObj : {}
    }
  }
  componentDidMount () {
    this.autoRunner();
    // this.inceraseParam();
  }

  inceraseParam = () => {
    window.setInterval(() => {
      this.setState({
        a: this.state.a + 1
      })
    }, 1000)
  }
  add = (a,b) => {
    console.log('calculate is runing');
    return a+b
  }
  combile = (a, b) => {
    console.log('combie is runing');
    return Object.assign({}, a,b);
  }
  autoRunner= () => {
    const momoizedAdd =  memoizeOne(this.add)
    const combile = this.combile;
    const momoizedCombile = memoizeOne(this.combile)
    window.setInterval(() => {
      const {a, b, obja, objb, combinedObj} = this.state;
      console.log('Interval is runing');
      const totle =  momoizedAdd(a,b);
      const newCombinedObj = momoizedCombile(obja, objb);
      // console.log( 'equal' , combinedObj === newCombinedObj);
      this.setState({
        totle,
        combinedObj: newCombinedObj
      })
    },1000)
  }
  render() {
    const {totle, combinedObj} = this.state;
    return (
      <div>
      <div>
        totle: {totle}
        <br/>
        json: {JSON.stringify(combinedObj)}
      </div>
      <code>
        const momoizedCombile = memoizeOne(this.combile)
        <br/>
        const momoizedCombile = memoizeOne(this.combile, isEqual)
        <br/>
        如果参数相同（复杂类型（引用相同））memoizeOne 计算后的值是相等的, 可以用===判断
        <br/>
        如果复杂类型相同，但是引用不同，那么memoizeOne 计算后的值是不等的，这个时候可以用isEqual，再判断===就是相等的了
      </code>
      </div>
    )
  }
}
