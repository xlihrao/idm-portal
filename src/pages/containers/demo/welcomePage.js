import React, { Component } from 'react'
import { withRouter } from 'react-router'

class WelcomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        WELCOME, I WANT TO PLAY A GAME!
      </div>
    )
  }
}

export default withRouter(WelcomePage)
