import React from "react";
import Form from "./Form";

export default class UpdateCourse extends React.Component {
  state = {
    id: "",
    title: "",
    student: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  componentDidMount() {
    const {
      title,
      description,
      student,
      estimatedTime,
      materialsNeeded,
    } = this.props.location.state;
    this.setState(() => ({
      title,
      description,
      student,
      estimatedTime,
      materialsNeeded,
    }));
  }
  render() {
    const {
      title,
      description,
      student,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;
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
                      id="student"
                      name="student"
                      type="text"
                      value={`${student.firstName} ${student.lastName}`}
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
    const {
      id,
      title,
      description,
      student,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    const course = {
      id,
      title,
      description,
      student,
      estimatedTime,
      materialsNeeded,
    };
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
