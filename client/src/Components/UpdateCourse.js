import React from "react";
import Form from "./Form";
import { apiBaseUrl } from "../config";

export default class UpdateCourse extends React.Component {
  state = {
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
      <Form
        cancel={this.cancel}
        errors={errors}
        submit={this.submit}
        submitButtonText="Update Course"
        elements={() => (
          <>
            <div className="main--flex">
              <div>
                <label htmlFor="title"> Course Title </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={this.change}
                />

                <label htmlFor="author">Course Author</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={author}
                  onChange={this.change}
                />

                <label htmlFor="description">Course Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={this.change}
                />
              </div>
              <div>
                <label htmlFor="time">Estimated Time</label>
                <input
                  id="time"
                  name="time"
                  type="text"
                  value={time}
                  onChange={this.change}
                />

                <label htmlFor="materials">Materials Needed</label>
                <textarea
                  id="materials"
                  name="materials"
                  value={materials}
                  onChange={this.change}
                />
              </div>
            </div>
          </>
        )}
      />
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
    const { title, author, description, time, materials } = this.state;
    const course = { title, author, description, time, materials };
    const id = this.props.location.pathname;

    context.data
      .updateCourse(course)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push(`${apiBaseUrl}/${id}`);
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
