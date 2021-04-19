import React from "react";

export default ({ context }) => {
  const authuser = context.authenticatedUser;
  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>{authuser.name} is authenticated!</h1>
        <p>Your username is {authuser.username}</p>
      </div>
    </div>
  );
};
