import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className="form--centered">
        <h1>Sign In</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <React.Fragment>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={this.change}
                placeholder="User Name"
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
          Don't have a user account? <Link to="/signup">Click here</Link> to
          sign up!
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
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => ({ errors: ["Sign-in unseccessful"] }));
        } else {
          this.props.history.push("/authenticated");
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
