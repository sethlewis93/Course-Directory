import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { apiBaseUrl } from "../config";

export default function CourseDetail(props) {
  const [courseDetails, setCourseDetails] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const courseId = location.pathname;
  const { context } = props;
  const authUser = context.authenticatedUser;

  useEffect(() => {
    fetch(`${apiBaseUrl}${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourseDetails(data))
      .catch((err) => console.log(err));
  }, [courseId]);

  const {
    description,
    title,
    student: { id, firstName, lastName, emailAddress } = {},
    estimatedTime,
    materialsNeeded,
  } = courseDetails;

  const handleDelete = (e) => {
    if (authUser) {
      e.preventDefault();
      const plainTextPassword = authUser.password;
      context.data
        .deleteCourse(emailAddress, plainTextPassword, courseId)
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          history.push("/error");
        });
    }
  };

  return (
    <main>
      <div className="actions--bar">
        {authUser && authUser.id === id ? (
          <div className="wrap">
            <Link
              className="button"
              to={{
                pathname: `${courseId}/update`,
                state: {
                  title,
                  description,
                  student: { firstName, lastName },
                  estimatedTime,
                  materialsNeeded,
                },
              }}
            >
              Update Course
            </Link>
            <Link className="button" onClick={handleDelete} to="/">
              Delete Course
            </Link>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        ) : (
          <div className="wrap">
            {" "}
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        )}
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{title}</h4>
              <p>{`${firstName} ${lastName}`}</p>
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown className="course--detail--list">
                {materialsNeeded}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
