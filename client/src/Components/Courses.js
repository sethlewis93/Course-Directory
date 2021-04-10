import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { apiBaseUrl } from "../config";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(courses);

  const courseGrid = courses.map((c, index) => (
    <NavLink
      to={`courses/${c.id}`}
      key={index}
      className="course--module course--link"
    >
      <h2 className="course--label">Course</h2>
      <h3 className="course--title">{c.title}</h3>
    </NavLink>
  ));

  return (
    <main>
      <div className="wrap main--grid">
        {courseGrid}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
}
