import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Row.css';

export default class Row extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }

  render () {
    let data = this.props.data.toString("hex").replace(/\w\w/g,"$& ").toUpperCase();
    return (
      <li className={styles.row}>
        <div className={styles.rowInfo}>
          <div><span>{this.props.id}</span></div>
          <div><small>{data}</small></div>
        </div>
      </li>
    );
  }
}
