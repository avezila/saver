import React, { Component, PropTypes } from 'react'


export default class Insert extends Component {
  constructor(props) {
    super(props)
    this.handleInsertClick = this.handleInsertClick.bind(this)
  }

  getValue() {
    return {
      count : this.refs.count.value,
      len : this.refs.len.value
    }
  }

  setValue(o) {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.refs.count.value = o.count;
    this.refs.len.value = o.len;
  }

  handleInsertClick() {
    console.log(this.getValue())
    this.props.onChange()
  }

  render() {
    return (
      <div>
        <div>Count:</div>
        <input size="10"
               ref="count"
               defaultValue={this.props.count} />
        <div>Length:</div>
        <input size="10"
               ref="len"
               defaultValue={this.props.len} />
        <button onClick={this.handleInsertClick}>
          Insert
        </button>
      </div>
    )
  }
}

Insert.propTypes = {
  onChange: PropTypes.func.isRequired
}
Insert.defaultProps = {
  count: 10,
  len: 128
}
