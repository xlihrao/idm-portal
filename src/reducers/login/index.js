import Immutable from 'immutable'

let initialState = Immutable.fromJS({
  hasLogin: false,
  response: null,
  errorMsg: '',
})

export default function loginReducer(state = initialState, action) {
  console.log('type:', action.type)
  let operation = {
    // LOGIN_REQUEST: () =>
    //   state.merge({
    //   }),
    LOGIN_SUCCESS: () =>
      state.merge({
        hasLogin: true,
      }),
    LOGIN_FAILED: () =>
      state.merge({
        hasLogin: false,
        errorMsg: action.errorMsg,
      }),
  }

  if (operation[action.type]) {
    return operation[action.type]()
  }

  return state
}
