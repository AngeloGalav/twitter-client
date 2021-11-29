//Components
import useWindowSize from "../../Utils/windowSize";
import Navbar from "../Navbar";

import React from "react";


const AboutScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    return (
        <div id="about-screen-container">
            {/* Navbar */}
            <Navbar width={width} />

        </div>
    );
};

export default AboutScreen;
