import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/global.css";

import Header from "./Components/Header";
import Courses from "./Components/Courses";
import CreateCourses from "./Components/CreateCourse";
import CourseDetail from "./Components/CourseDetail";
import UpdateCourses from "./Components/UpdateCourse";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import UserSignOut from "./Components/UserSignOut";
import NotFound from "./Components/NotFound";

import withContext from "./Context";
const CoursesWithContext = withContext(Courses);

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route path="/courses/create" component={CreateCourses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/:id/update" component={UpdateCourses} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
