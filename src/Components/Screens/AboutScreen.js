//Components
import NavbarMobile from "../NavbarMobile";
import useWindowSize from "../../Utils/windowSize";

import React from "react";
import NavbarDesktop from "../NavbarDesktop";

const AboutScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    return (
        <div id="about-screen-container">
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
        </div>
    );
};

export default AboutScreen;
