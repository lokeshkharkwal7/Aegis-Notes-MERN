import React from "react";

function Alert({ message }) {
  return (
    <div>
      <div className="alert alert-success text-center" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Alert;
