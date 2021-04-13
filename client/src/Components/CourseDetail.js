import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiBaseUrl } from "../config";

export default function CourseDetail(props) {
  const [courseDetails, setCourseDetails] = useState([]);
  const location = useLocation();
  const courseId = location.pathname;

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
    student: { firstName, lastName } = {},
    estimatedTime,
    materialsNeeded,
  } = courseDetails;

  // When called, should delete course at the current courseId
  const remove = () => {
    // returns: 'Uncaught TypeError: can't access property "actions", context is undefined'
    const { context } = props;
    context.actions.delete(courseId);
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href="update-course.html">
            Update Course
          </a>
          <a className="button" onClick={remove} href="/">
            Delete Course
          </a>
          <a className="button button-secondary" href="index.html">
            Return to List
          </a>
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
