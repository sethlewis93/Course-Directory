import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { apiBaseUrl } from "../config";

export default function CourseDetail(props) {
  const [courseDetails, setCourseDetails] = useState([]);
  const location = useLocation();
  const courseId = location.pathname;
  const { context } = props;
  const authUser = context.authenticatedUser;

  useEffect(() => {
    fetch(`${apiBaseUrl}${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourseDetails(data))
      .catch((err) => console.log(err));
  }, [courseId]);

  // materialsNeeded not rendering separate list items b/c "const materials = courseDetails.map(detail => {<li>detail.materialsNeeded</li>}) is 'not a function' "
  const {
    description,
    title,
    student: { id, firstName, lastName, emailAddress, password } = {},
    estimatedTime,
    materialsNeeded,
  } = courseDetails;

  const deleteCourse = () => {
    const username = emailAddress;
    context.data.deleteCourse(username, password, courseId);
  };

  return (
    <main>
      <div className="actions--bar">
        {authUser && authUser.id === id ? (
          <div className="wrap">
            <Link className="button" to={`${courseId}/update`}>
              Update Course
            </Link>
            <Link className="button" onClick={deleteCourse} to="/">
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
