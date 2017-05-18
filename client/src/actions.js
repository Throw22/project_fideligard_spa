export const GET_STOCKS_SUCCESS = 'GET_STOCKS_SUCCESS';
export const GET_STOCKS_REQUEST = 'GET_STOCKS_REQUEST';
export const GET_STOCKS_FAILURE = 'GET_STOCKS_FAILURE';

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
  console.log('Ran getStocks action');
  return dispatch => {
    dispatch(getStocksRequest());

    fetch(`api/quandl/${date}`)
      .then(response => {
        console.log('Fetch response:', response);
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        console.log('GetStocks json data:', json);
        dispatch(getStocksSuccess(json));
      })
      .catch(error => {
        dispatch(getStocksFailure(error));
      });
  };
}

export function getInitialStocks() {
  console.log('Dispatching getStocks');
  return dispatch => {
    dispatch(getStocks(20160129));
  };
}
