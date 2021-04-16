import React from "react";

export default class CreateCourse extends React.Component {
  state = {
    username: "",
    password: "",
    title: "",
    author: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  render() {
    const {
      title,
      author,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    return (
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          {/* <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div> */}
          <form>
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
            <button className="button" type="submit" onSubmit={this.submit}>
              Create Course
            </button>
            <button className="button button-secondary" onClick={this.cancel}>
              Cancel
            </button>
          </form>
        </div>
      </main>
    );
  }
  submit = () => {
    const { context } = this.props;
    const { username, password } = this.state;
    const {
      title,
      author,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      title,
      author,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data
      .createCourse(username, password, course)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          console.log(errors);
        } else {
          console.log(`${course} has been sucessfully created`);
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
