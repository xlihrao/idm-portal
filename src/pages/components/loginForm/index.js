import React, { Component } from 'react'
import { reduxForm, propTypes as formPropsTypes, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class LoginForm extends Component {
  static propTypes = {
    ...formPropsTypes,
  }

  constructor(props) {
    super(props)
    this.renderTextField = this.renderTextField.bind(this)
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...others }) => (
    <TextField
      floatingLabelText={label}
      hintText={others.hint}
      errorText={touched && error}
      type={others.type}
      {...input}
    />
  )

  // renderTextField = ({ input, label, meta: { touched, error }, ...others }) => {
  //   console.log('input:', input)
  //   console.log('meta:', touched)
  //   console.log('label:', label)
  //   return (
  //     <TextField
  //       floatingLabelText={label}
  //       hintText={others.hint}
  //       errorText={touched && error}
  //       value=''
  //     />
  //   )
  // }

  render() {
    const { handleSubmit } = this.props
    return (
      <form>
        <div>
          <Field name='userName' component={this.renderTextField} label='username' type='text' hint='username:' />
        </div>
        <div>
          <Field name='password' component={this.renderTextField} label='password' type='password' hint='password:' />
        </div>
        <br />
        <div>
          {this.props.errorMsg}
        </div>
        <div>
          <RaisedButton label='LOGIN' primary={true} onTouchTap={handleSubmit(this.props.loginRequest)} />
        </div>
      </form>
    )
  }
}

function validate(values) {
  // console.log('values.userName', values.userName)
  // console.log('values.password', values.password)
  const errors = {}
  const requiredFields = ['userName', 'password']
  requiredFields.forEach(field => {
    if (!!!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate,
})(LoginForm)
