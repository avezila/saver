export const ROWS_REQUEST = 'ROWS_REQUEST'
export const ROWS_SUCCESS = 'ROWS_SUCCESS'
export const ROWS_FAILURE = 'ROWS_FAILURE'


function fetchRows(from,count) {
  return {
    [CALL_GRPC]: {
      types: [ ROWS_REQUEST, ROWS_SUCCESS, ROWS_FAILURE ],
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO
    }
  }
}

export function loadRows(from, count) {
  return (dispatch, getState) => {
    return dispatch(fetchRepo(from,count))
  }
}