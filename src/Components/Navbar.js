//components
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";

import React from "react";

//Navbar funge da factory e crea la navbar giusta in base alla width
const Navbar = ({ width }) => {
    return <>{width < 768 ? <NavbarMobile /> : <NavbarDesktop />}</>;
};

export default Navbar;
