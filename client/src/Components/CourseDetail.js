import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiBaseUrl } from "../config";

export default function CourseDetail() {
  const [courseDetails, setCourseDetails] = useState("");
  const location = useLocation();
  const courseId = location.pathname;
  console.log(courseId);

  useEffect(() => {
    // Using ID 3 to test. Will add context later.
    fetch("localhost:5000/api/courses/1")
      .then((res) => res.json())
      .then((data) => setCourseDetails(data))
      .catch((err) => console.log(err));
  }, [courseId]);

  const {
    description,
    title,
    student: { firstName, lastName },
  } = courseDetails;

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href="update-course.html">
            Update Course
          </a>
          <a className="button" href="/">
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
              <p>14 hours</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <li>1/2 x 3/4 inch parting strip</li>
                <li>1 x 2 common pine</li>
                <li>1 x 4 common pine</li>
                <li>1 x 10 common pine</li>
                <li>1/4 inch thick lauan plywood</li>
                <li>Finishing Nails</li>
                <li>Sandpaper</li>
                <li>Wood Glue</li>
                <li>Wood Filler</li>
                <li>Minwax Oil Based Polyurethane</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
