import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

// Currently the Form is rendered but the state does not change. Looking into why...
export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;

    return (
      <div className="form--centered">
        <h1>Sign Up</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.change}
                placeholder="First Name"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.change}
                placeholder="Last Name"
              />
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={this.change}
                placeholder="Email Address"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.change}
                placeholder="Password"
              />
            </React.Fragment>
          )}
        />
        <p>
          Already have a user account? <Link to="/signin">Click here</Link> to
          sign in!
        </p>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;

    const { firstName, lastName, emailAddress, password } = this.state;

    const user = { firstName, lastName, emailAddress, password };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          console.log(errors);
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/authenticated");
            console.log(
              `${emailAddress} is sucessfully signed up and authenticated`
            );
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
