import React, { useState } from "react";

// Currently attempting to set state when changes occur inside form elements
export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setTime] = useState("");
  const [materialsNeeded, setMaterials] = useState("");
  const [author, setAuthor] = useState("");

  const submit = () => {
    const { context } = this.props;

    const course = { title, description, estimatedTime, materialsNeeded };

    context.data
      .createCourse(course)
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

  const change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

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
              <label for="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={change}
              />

              <label for="courseAuthor">Course Author</label>
              <input
                id="courseAuthor"
                name="courseAuthor"
                type="text"
                value={author}
                onChange={change}
              />

              <label for="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={change}
              ></textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={change}
              />

              <label for="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded">
                onChange={change}
              </textarea>
            </div>
          </div>
          <button className="button" type="submit" onSubmit={submit}>
            Create Course
          </button>
          <button
            className="button button-secondary"
            onclick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}
