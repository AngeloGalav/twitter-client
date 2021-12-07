import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div>
            <button className="w-56 btn btn-link text-base-content hover:no-underline">
                <Link to="/">
                    <i className="bi bi-twitter text-4xl text-primary" />{" "}
                    <span style={{fontFamily: "Montserrat"}} className="text-3xl font-bold"> HI</span>
                    <span style={{fontFamily: "Montserrat"}} className="text-2xl font-normal">TWEET</span>
                </Link>
            </button>
        </div>
    );
};

export default Logo;
