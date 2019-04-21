import React, { Component } from 'react'

export default class Detail extends Component {
  render() {
    console.log(this.props.match.params.id)
    const {id} = this.props.match.params
    return (
      <div>
        这里是详情页{id}
      </div>
    )
  }
}
