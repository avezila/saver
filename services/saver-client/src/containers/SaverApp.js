import React, { Component, PropTypes } from 'react';
import styles from './SaverApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SaverActions from '../actions';
import { Rows, Filter } from '../components';

@connect(state => ({
  saver: state.saver,
}))
export default class SaverApp extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render () {
    const { saver : { rows, from, count, max, hash,numPush,lenPush }, dispatch } = this.props;
    const actions = bindActionCreators(SaverActions, dispatch);

    return (
      <div className={styles.saverApp}>
        <h1>The App for save bin data by id</h1>
        <Filter filterRows={actions.fetchRows} pushRows={actions.pushRows} from={from} hash={hash} count={count} max={max} numPush={numPush} lenPush={lenPush}/>
        <Rows rows={rows} />
      </div>
    );
  }
}
