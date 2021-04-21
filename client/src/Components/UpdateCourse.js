import React from "react";
import Form from "./Form";

export default class UpdateCourse extends React.Component {
  state = {
    id: "",
    title: "",
    author: "",
    description: "",
    time: "",
    materials: "",
    errors: [],
  };

  render() {
    const { title, author, description, time, materials, errors } = this.state;
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="main--flex">
                  <div>
                    <label> Course Title </label>
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
                      value={author}
                      onChange={this.change}
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
                      id="time"
                      name="time"
                      type="text"
                      value={time}
                      onChange={this.change}
                    />

                    <label>Materials Needed</label>
                    <textarea
                      id="materials"
                      name="materials"
                      value={materials}
                      onChange={this.change}
                    />
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </main>
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
    const { emailAddress, password } = context.authenticatedUser;
    const { id, title, author, description, time, materials } = this.state;
    const course = { id, title, author, description, time, materials };
    const { match } = this.props;
    const matchParamsId = match.params.id;
    const courseParam = `/courses/${matchParamsId}`;

    context.data
      .updateCourse(emailAddress, password, course, courseParam)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push(`${courseParam}`);
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
