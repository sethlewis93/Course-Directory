import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { apiBaseUrl } from "../config";

export default function CourseDetail(props) {
  const [courseDetails, setCourseDetails] = useState([]);
  const location = useLocation();
  const courseId = location.pathname;
  const { id } = useParams();

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
    student: { firstName, lastName, emailAddress, password } = {},
    estimatedTime,
    materialsNeeded,
  } = courseDetails;

  const username = emailAddress;

  const deleteCourse = () => {
    const { context } = props;
    context.data.deleteCourse(username, password, id);
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${id}/update`}>
            Update Course
          </Link>
          <Link className="button" onClick={deleteCourse} to="/">
            Delete Course
          </Link>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{title}</h4>
              <p>{`${firstName} ${lastName}`}</p>

              <p>{description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">{materialsNeeded}</ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
