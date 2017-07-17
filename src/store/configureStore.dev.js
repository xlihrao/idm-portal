import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createaLogger from 'redux-logger'
import reducer from '../reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk, createaLogger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f // used for Chrome dev extension tools
)(createStore)

export default function configureStore(initialStore) {
  const store = finalCreateStore(reducer, initialStore)

  // module.hot.accept - can hot upgrade.
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
