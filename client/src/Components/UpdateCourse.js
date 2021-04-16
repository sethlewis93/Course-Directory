import React from "react";
import Form from "./Form";
import { apiBaseUrl } from "../config";

export default class UpdateCourse {
  state = {
    title: "",
    author: "",
    description: "",
    time: "",
    materials: "",
    errors: [],
  };
  render() {
    const { errors } = this.state;
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
                <label for="title"> Course Title </label>
                <input id="title" name="title" type="text" value="" />

                <label for="author">Course Author</label>
                <input id="author" name="author" type="text" value="" />

                <label for="description">Course Description</label>
                <textarea id="description" name="description" />
              </div>
              <div>
                <label for="time">Estimated Time</label>
                <input id="time" name="time" type="text" value="" />

                <label for="materials">Materials Needed</label>
                <textarea id="materials" name="materials"></textarea>
              </div>
            </div>
            <button class="button" type="submit">
              Update Course
            </button>
            <button
              class="button button-secondary"
              onclick="event.preventDefault(); location.href='index.html';"
            >
              Cancel
            </button>
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
