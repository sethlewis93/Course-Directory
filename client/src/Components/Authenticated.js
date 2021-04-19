import React from "react";

export default ({ context }) => {
  const authuser = context.authenticatedUser;
  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>{authuser.firstName} is authenticated!</h1>
        <p>Your username is {authuser.emailAddress}</p>
      </div>
    </div>
  );
};
