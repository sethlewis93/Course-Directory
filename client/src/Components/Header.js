import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { context } = props;
  const authUser = context.authenticatedUser;
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authUser ? (
            <div>
              <span>Welcome, {authUser.firstName}! </span>
              <Link className="signout" to="/signout">
                Sign Out
              </Link>
            </div>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
