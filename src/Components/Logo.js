import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div>
            <button className="w-56 btn btn-link text-base-content hover:no-underline">
                <Link to="/">
                    <i className="bi bi-twitter text-4xl text-primary" />{" "}
                    <span className="text-2xl font-medium"> &nbsp; Logo</span>
                    <span className="text-2xl">Bold </span>
                </Link>
            </button>
        </div>
    );
};

export default Logo;
