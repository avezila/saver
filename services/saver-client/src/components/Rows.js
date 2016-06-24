import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/object/mapValues';

import styles from './Rows.css';
import Row from './Row';

export default class Rows extends Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
  }

  render () {
    return (
      <ul className={styles.rows}>
        {
          mapValues(this.props.rows, (row) => {
            return (<Row
              id={row.id}
              data={row.data} />);
          })
        }
      </ul>
    );
  }

}
