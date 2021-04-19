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
import Authenticated from "./Authenticated";
import UserSignOut from "./Components/UserSignOut";
import NotFound from "./Components/NotFound";

import withContext from "./Context";
// const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const AuthUserWithContext = withContext(Authenticated);
const CreateCoursesWithContext = withContext(CreateCourses);
const UpdateCoursesWithContext = withContext(UpdateCourses);

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/create" component={CreateCoursesWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route
            path="/courses/:id/update"
            component={UpdateCoursesWithContext}
          />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/authenticated" component={AuthUserWithContext} />
          <Route path="/signout" component={UserSignOut} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
