import 'isomorphic-fetch'

function checkResponseStatus(response) {
  if (!response.ok) {
    let error = new Error(response.status, response.statusText)
    error.body = response
    throw error
  }
  return response
}

function responseToJson(response) {
  return response.json()
}

function analyzeResponse(response) {
  if (response.errorCode) {
    return ({
      occurRestException: true,
      errorCode: response.errorCode,
      errorMessage: response.errorMessage,
    })
  }
}

export function restCall(url, requestConfig, successCallback, failedCallback) {
  return dispatch => {
    fetch(url, requestConfig)
      .then(checkResponseStatus)
      .then(responseToJson)
      .then(json => dispatch(successCallback(json)))
      .catch(error => {
        // Todo: error handle
        console.log('Exception:', error)
        dispatch(failedCallback(error.body))
      })
  }
}

export function mockRestCall(url, requestConfig, successCallback, failedCallback) {
  let failed = {
    type: 'LOGIN_FAILED',
    errorCode: 1234,
    errorMsg: 'Password incorrect!',
  }

  let success = {
    type: 'LOGIN_SUCCESS',
    response: 'Welcome!',
  }

  const response = {}

  Math.ceil(Math.random() * 10) % 2 === 0 ? Object.assign(response, failed) : Object.assign(response, success)

  return dispatch => {
    let sleep = new Promise(resolve => setTimeout(resolve, 500))
    sleep.then(() => dispatch(response))
  }
}
