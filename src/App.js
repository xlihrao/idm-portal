import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import configureStore from './store'
import { URL } from './constants/urls'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import {
  Login,
  WelcomePage,
} from './pages'

const store = configureStore()

injectTapEventPlugin()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path={URL.LOGIN} component={Login} />
            <Route path={'/welcome'} component={WelcomePage} />
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
