import React, { Component } from 'react'
import { Button } from 'antd';


export default class Timer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			count: 100,
		 	aaa: 'aaa'
		}
	}
	getSnapshotBeforeUpdate(prevProps, prevState) {
		// console.log('prevProps, prevState',prevProps, prevState)
		var span = document.getElementById('span_count')
		return span.innerText
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		// console.log('snapshot', snapshot)
	}
	render() {
	  const { count } = this.state
		return (
			<div>
				<span id="span_count"> {count} </span>
				<Button onClick={() => this.setState({ count: 0 })}> 点击清零 </Button>
			</div>
		)
	}
}

Timer.getDerivedStateFromProps = function (nextProps, prevState) {
	console.log('nextProps, prevState', nextProps, prevState)
	return Object.assign({}, prevState, nextProps)
}