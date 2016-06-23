import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Insert from '../components/Insert'


class Saver extends Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate() {
    //browserHistory.push(`/${nextValue}`)
  }

  render() {
    return (
      <div>
        <Insert onChange={this.handleUpdate} />
        <hr />
      </div>
    )
  }
}

Saver.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
  }
}

export default connect(mapStateToProps, {
})(Saver)
