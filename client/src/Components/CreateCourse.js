import React from "react";
import Form from "./Form";

export default class CreateCourse extends React.Component {
  state = {
    title: "",
    author: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  render() {
    const { context } = this.props;
    const { firstName, lastName } = context.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <>
                <div className="main--flex">
                  <div>
                    <label>Course Title</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={this.change}
                    />

                    <label>Course Author</label>
                    <input
                      id="author"
                      name="author"
                      type="text"
                      value={`${firstName} ${lastName}`}
                      disabled
                    />

                    <label>Course Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={this.change}
                    />
                  </div>
                  <div>
                    <label>Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime}
                      onChange={this.change}
                    />
                    <label>Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={materialsNeeded}
                      onChange={this.change}
                    />
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </main>
    );
  }
  submit = () => {
    const { context } = this.props;
    const { id, emailAddress, password } = context.authenticatedUser;
    const {
      title,
      author,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const userId = id;

    const course = {
      title,
      author,
      userId,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data
      .createCourse(emailAddress, password, course)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          console.log(errors);
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
