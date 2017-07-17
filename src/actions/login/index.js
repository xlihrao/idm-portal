import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../../constants'

import * as Utils from '../../utils'

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

function loginSuccess() {
  return response => ({
    type: LOGIN_SUCCESS,
    response,
  })
}

function loginFailed(response) {
  return {
    type: LOGIN_FAILED,
    errorMsg: response.errorMsg,
  }
}

export function loginAction(url, requestMethod = 'POST', requestBody = null) {
  let config = {
    mode: 'cors',
    method: requestMethod,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if (!!requestBody) {
    config.body = JSON.stringify(requestBody)
  }

  return dispatch => {
    // dispatch(
    //   Utils.restCall(
    //     url,
    //     config,
    //     loginSuccess(),
    //     loginFailed
    //   )
    // )

    dispatch(
      Utils.mockRestCall(
          url,
          config,
          loginSuccess(),
          loginFailed
        )
  )
  }
}
