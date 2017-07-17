import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { loginAction } from '../actions/login'
import LoginForm from './components/loginForm'
import { Tabs, Tab } from 'material-ui/Tabs'

@connect(
  state => {
    const { loginReducer } = state
    const loginState = loginReducer.toJS()
    return ({
      hasLogin: loginState.hasLogin,
      errorMsg: loginState.errorMsg,
    })
  },
  dispatch => ({
    loginAction: bindActionCreators(loginAction, dispatch),
  })
)

class Login extends Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    loginAction: React.PropTypes.func.isRequired,
    hasLogin: React.PropTypes.bool,
    errorMsg: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.loginRequest = this.loginRequest.bind(this)

    this.state = {
      errorMsg: '',
    }
  }

  loginRequest(values) {
    const { userName, password } = values
    let user = {
      userId: userName,
      password,
    }
    this.props.loginAction('http://localhost:8888/idm/login', 'POST', user)
  }

  componentWillReceiveProps(nextProps) {
    let { hasLogin, errorMsg } = nextProps
    if (hasLogin) {
      console.log('Login status: Welcome!')
      this.props.router.push('/welcome')
    } else {
      this.setState({
        errorMsg,
      })
    }
  }

  render() {
    let loginMethods = {
      loginRequest: this.loginRequest,
    }
    return (
      <Tabs>
        <Tab label='LOGIN' >
          <LoginForm
            {...loginMethods}
            errorMsg={this.state.errorMsg}
          />
        </Tab>
      </Tabs>
    )
  }
}

export default withRouter(Login)
