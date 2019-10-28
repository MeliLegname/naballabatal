import React from "react";

export default ({ name, message }) => (
  <p className="chatMessage">
    <strong>{name}</strong> <em>{message}</em>
  </p>
);
