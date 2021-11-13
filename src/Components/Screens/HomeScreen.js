//Components
import NavbarMobile from '../NavbarMobile'
import useWindowSize from "../../Utils/windowSize";

import React from "react";
import NavbarDesktop from '../NavbarDesktop';

const HomeScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    return (
        <div
        id="home-screen-container"
        >
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
            <div
                class="hero min-h-screen"
                style={{backgroundImage: `url("https://www.insursoft.it/wp-content/uploads/2021/06/futuristic-smart-city-with-5g-global-network-technology-scaled.jpg")`}}
            >
                <div style={{minHeight: "45rem"}} class="hero-overlay backdrop-filter backdrop-blur-sm bg-opacity-40"></div>
                <div class="text-center hero-content text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">Hello world</h1>
                        <p class="mb-5">
                            {width < 768 ? "Prova a scrollare verso il basso" : "Ridimensiona la finestra in modo che sia larga meno di 768px"}
                        </p>
                        <button class="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
