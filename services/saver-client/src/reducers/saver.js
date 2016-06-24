import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';


const initialState = {
  rows : [],
  hash : "",
  from : 0,
  count: 10,
  max  : 0,
  numPush : 3,
  lenPush : 256,
};

export default function saver(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_ROWS:
      return {
        ...state,
        hash : action.hash,
        from : action.from,
        count: action.count,
      }
    case types.RENDER_ROWS:
      return {
        ...state,
        rows : action.rows,
        max  : action.max,
      }
    default:
      return state;
  }
}
