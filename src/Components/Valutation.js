import React from "react";

const Valutation = ({ valutation }) => {
  return (
    <span className="text-yellow-500">
      {valutation >= 1 ? (
        <i className="bi bi-star-fill"></i>
      ) : (
        <i className="bi bi-star"></i>
      )}
      {valutation >= 2 ? (
        <i className="bi bi-star-fill"></i>
      ) : (
        <i className="bi bi-star"></i>
      )}
      {valutation >= 3 ? (
        <i className="bi bi-star-fill"></i>
      ) : (
        <i className="bi bi-star"></i>
      )}
      {valutation >= 4 ? (
        <i className="bi bi-star-fill"></i>
      ) : (
        <i className="bi bi-star"></i>
      )}
      {valutation >= 5 ? (
        <i className="bi bi-star-fill"></i>
      ) : (
        <i className="bi bi-star"></i>
      )}
    </span>
  );
};

export default Valutation;