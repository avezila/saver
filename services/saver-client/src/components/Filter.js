import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Filter.css';

export default class Filter extends Component {
  static propTypes = {
    filterRows: PropTypes.func.isRequired,
    pushRows: PropTypes.func.isRequired,
    from: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    numPush: PropTypes.number.isRequired,
    lenPush:PropTypes.number.isRequired,
  }
  pushRows(){
    window.refs = this.refs
    this.props.pushRows(+this.refs.pushNum.getDOMNode().value,+this.refs.pushLen.getDOMNode().value);
  }
  changePage(d){
    let val = this.props.from;
    this.props.from += d;
    if (this.props.from < 0){
      this.props.from = 0;
    } else if (this.props.from > this.props.max) {
      this.props.from = Math.floor((this.props.max-1)/10)*10;
    }
    if (val == this.props.from) return;
    this.props.filterRows(this.props.hash,this.props.from,this.props.count);
  }
  
  render () {
    return (
      <div className={styles.filterBlock}>
      
        <div className={styles.pushBlock}>
          <div>
          Push random N=
          </div>
          <input
          type="text"
          ref="pushNum"
          defaultValue={this.props.numPush}
          className={classnames('form-control', styles.filter)}
          placeholder="3" />
          <div>
            Length=
          </div>
          <input
          type="text"
          ref="pushLen"
          defaultValue={this.props.lenPush}
          className={classnames('form-control', styles.filter)}
          placeholder="256" />
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.pushRows()}>
            Push
            <i className="fa fa-floppy-o" />
          </button>
        </div>


          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.changePage(-10)}>
            <i className="fa fa-chevron-left" />
          </button>
          <div className={styles.counter}>
            {Math.floor((this.props.from) / 10) + 1}/{Math.floor((this.props.max-1) / 10) + 1}
          </div>
          <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.changePage(10)}>
            <i className="fa fa-chevron-right" />
          </button>

      <input
        type="text"
        autoFocus="true"
        className={classnames('form-control', styles.filter)}
        placeholder="Type id"
        value={this.state.hash}
        onChange={this.handleChange.bind(this)} />
      </div>
    );
    //onKeyDown={this.handleChange.bind(this)} />
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      hash: this.props.hash || '',
      from : this.props.from || 0,
      count : this.props.count || 10,
      max : this.props.max || 0,
    };
  }

  handleChange (e) {
    this.setState({ hash: e.target.value });
    this.props.filterRows(e.target.value,0,this.props.count)
  }
}
