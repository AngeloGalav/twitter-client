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
                style={{backgroundImage: `url("https://picsum.photos/id/1005/1600/1400")`}}
            >
                <div class="hero-overlay bg-opacity-60"></div>
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

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
};

export default HomeScreen;
