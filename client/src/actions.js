export const GET_STOCKS_SUCCESS = 'GET_STOCKS_SUCCESS';
export const GET_STOCKS_REQUEST = 'GET_STOCKS_REQUEST';
export const GET_STOCKS_FAILURE = 'GET_STOCKS_FAILURE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export function getStocksRequest() {
  return {
    type: GET_STOCKS_REQUEST
  };
}

export function getStocksFailure(error) {
  return {
    type: GET_STOCKS_FAILURE,
    error
  };
}

export function getStocksSuccess(data) {
  return {
    type: GET_STOCKS_SUCCESS,
    data
  };
}

export function getStocks(date) {
  return dispatch => {
    dispatch(getStocksRequest());

    fetch(`api/quandl/${date}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        dispatch(getStocksSuccess(json));
      })
      .catch(error => {
        dispatch(getStocksFailure(error));
      });
  };
}

export function getInitialStocks() {
  return dispatch => {
    dispatch(getStocks(20160129));
  };
}

export function setSearchTerm(data) {
  return {
    type: SET_SEARCH_TERM,
    data
  };
}
