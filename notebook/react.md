# 关于react 16.3 以后的生命周期的变更
### 变更的生命周期
* componentWillMount
* componentWillReceiveProps
* componentWillUpdate
### 为什么变更
* react17  将推出 async Rendering, 这个操作可能会打断虚拟dom挂载到真实dom的阶段，也就是这三个生命周期，这三个方法可能会不安全了。
### 新的生命周期
* static getDerivedStateFromProps
* getSnapshotBeforeUpdate
### 老生命周期的替换方案
* componentWillReceiveProps -> 使用 static getDerivedStateFromProps 代替
    * 此方法适用state 的值在任何时候都取决于 props。
    * static getDerivedStateFromProps触发时机，组件在rerender的时候
    * 该方法的返回值作为新的state，如果是null不返回任何值
    * 内部调用setState的时候也会执行这个生命周期
    * 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
    * 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控 代替。
* componentWillMount 
    * 执行时机在render之前被调用，react官方建议使用constructor来初始化state
* componentWillUpdate 
    * 执行时机在组件收到props或者state的更新，会在渲染之前调用
    * 如果需要在此方法中读取dom信息，可以在getSnapshotBeforeUpdate()中执行此逻辑
    * getSnapshotBeforeUpdate 要和 componentDidUpdate 配合使用 

```
import React, { Component } from 'react'
import { Button } from 'antd';


export default class Timer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            count: 100,
            aaa: 'aaa'
        }
    }
    getSnapshotBeforeUpdate (prevProps, prevState) {
        // console.log('prevProps, prevState',prevProps, prevState)
        var span = document.getElementById('span_count')
        return span.innerText
    }
    componentDidUpdate (prevProps, prevState, snapshot) {
        // console.log('snapshot', snapshot)
    }
    render() {
        const { count } = this.state
        return (
        <div>
            <span id="span_count"> {count} </span>
            <Button onClick={()=> this.setState({count: 0})}> 点击清零 </Button>
        </div>
        )
    }
}

Timer.getDerivedStateFromProps = function (nextProps, prevState) {
    console.log('nextProps, prevState', nextProps, prevState)
    return Object.assign({}, prevState, nextProps)
}

```