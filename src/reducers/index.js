import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './login/index'

const bootReducer = combineReducers(Object.assign({}, {
  loginReducer,
  form: formReducer,
}))

export default bootReducer
