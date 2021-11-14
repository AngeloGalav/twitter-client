//Components
import NavbarMobile from "../NavbarMobile";
import NavbarDesktop from "../NavbarDesktop";
import TweetCard from "../TweetCard";
import useWindowSize from "../../Utils/windowSize";

import wavesSvg from "../../Media/wavesOpacity.svg";
import triangleSvg from "../../Media/triangle.svg";

import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import axios from "axios";

const HomeScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [y, setY] = useState(window.scrollY);
    const [tweet, setTweet] = useState([]);
    const [current, setCurrent] = useState(0);

    const updateOffset = () => setY(window.scrollY);

    //Effetti
    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", updateOffset);

        //rimuove il callback da window quando si fa unmount del componente
        return () => {
            window.removeEventListener("scroll", updateOffset);
        };
    }, []);

    useEffect(() => {
        axios
            .get("/api/sampleTweets")
            .then((response) => {
                setTweet(response.data.statuses);
            })
            .catch((error) => console.log(error.message));
    }, []);

    useEffect(() => {
        const changeTweet = setInterval(() => {
            if (tweet.length > 0) {
                setCurrent((current) => (current + 1) % tweet.length);
            }
        }, 10000);

        return () => clearInterval(changeTweet);
    });

    return (
        <div id="home-screen-container">
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
            <div
                class="hero h-screen bg-fixed relative bg-cover bg-center bg-gradient-to-t"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80")`,
                    minHeight: "45rem",
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary via-transparent to-transparent"></div>
                <div class="hero-overlay h-full w-full  bg-opacity-10"></div>
                <div class="px-8 smartphone:px-12 text-neutral-content relative -top-20 text-center laptop:text-left ipad:absolute ipad:top-1/2 ipad:height-40 ipad:transform ipad:-translate-y-1/2 ipad:left-20">
                    <div>
                        <h1 class="mb-5 ipad:mb-8 text-4xl smartphone:text-5xl font-bold">
                            Resta sempre aggiornato
                        </h1>
                        <p class="mb-5 text-sm">
                            <span className="font-bold">Twitter client</span> ti
                            permette di trovare ciò che ti interessa senza
                            indugi
                        </p>

                        <ScrollLink
                            activeClass="active"
                            to="home-main"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={800}
                        >
                            <button className="btn btn-secondary">
                                Scopri di più
                            </button>
                        </ScrollLink>
                    </div>
                </div>
            </div>
            <main className="w-full overflow-hidden relative" id="home-main">
                <div
                    style={{
                        transform: `translateY(${y * 0.5}px)`,
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1000' height='2000' preserveAspectRatio='none' viewBox='0 0 1000 2000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1360%26quot%3b)' fill='none'%3e%3cpath d='M61.76 145.92L106.23 145.92L106.23 173.41L61.76 173.41z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M752.36 1278.82L805.6 1278.82L805.6 1375.79L752.36 1375.79z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M729.53 1264.21a20.13 20.13 0 1 0 27.83-29.09z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M318.93 51.96L377.43 51.96L377.43 110.46L318.93 110.46z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M830.03 414.52 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M47.73 1043.37 a87.57 87.57 0 1 0 175.14 0 a87.57 87.57 0 1 0 -175.14 0z' fill='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M441.68 963.32 a60.87 60.87 0 1 0 121.74 0 a60.87 60.87 0 1 0 -121.74 0z' fill='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M700.78 1557.55L788.25 1557.55L788.25 1645.02L700.78 1645.02z' fill='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M139.23 1468.86 a16.72 16.72 0 1 0 33.44 0 a16.72 16.72 0 1 0 -33.44 0z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M311.66 104.58L354.31 104.58L354.31 129.12L311.66 129.12z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M551.49 101.77L597.86 101.77L597.86 148.14L551.49 148.14z' fill='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M211.44 1962.89a92.21 92.21 0 1 0-42.1-179.55z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M187.27 1401.52L276.64 1401.52L276.64 1475.71L187.27 1475.71z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M603.43 398.55 a64.89 64.89 0 1 0 129.78 0 a64.89 64.89 0 1 0 -129.78 0z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M41.86 1967.74L94.51 1967.74L94.51 2065.4L41.86 2065.4z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M437.27 1422.41L455.03 1422.41L455.03 1440.17L437.27 1440.17z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M509.43 1960.02L586.18 1960.02L586.18 2018.37L509.43 2018.37z' fill='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M207.18 1414.77L284.07 1414.77L284.07 1491.66L207.18 1491.66z' fill='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M-25.75 1509.14a41.49 41.49 0 1 0 82.98-0.88z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M658.79 1142.66L735.6 1142.66L735.6 1234.11L658.79 1234.11z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M1084.37 769.97a94.97 94.97 0 1 0-188.33 24.68z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M463 1604.63 a80.47 80.47 0 1 0 160.94 0 a80.47 80.47 0 1 0 -160.94 0z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M902.49 1358.77a5.37 5.37 0 1 0 8.71-6.28z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M608.79 543.58 a99.44 99.44 0 1 0 198.88 0 a99.44 99.44 0 1 0 -198.88 0z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3cpath d='M968.07 1893.6L1005.92 1893.6L1005.92 1893.8L968.07 1893.8z' stroke='rgba(29%2c 161%2c 242%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1360'%3e%3crect width='1000' height='2000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
                        zIndex: "-1",
                    }}
                    className="w-full h-full absolute bg-cover bg-no-repeat bg-center top-0 left-0"
                >
                    {" "}
                </div>

                <section className="w-full min-h-screen flex flex-col relative justify-center items-center px-4 py-8 bg-primary overflow-hidden">
                    <div className="flex flex-col min-h-screen laptop:flex-row gap-10 laptop:gap-20 container bg-left-bottom bg-no-repeat">
                        {tweet.length > 0 ? (
                            <div className="flex-1 flex items-start laptop:items-center order-2 max-w-md mx-auto z-10">
                                <TweetCard tweet={tweet[current]} />
                            </div>
                        ) : (
                            <TweetCard tweet={null} />
                        )}

                        <div className="laptop:flex-1 text-center laptop:text-left justify-center laptop:flex laptop:flex-col laptop:items-center laptop:min-h-screen order-1 relative">
                            <h1 className="text-5xl font-bold mb-5 z-10">
                                Titolo sezione
                            </h1>
                            <p className="text font-normal max-w-md mx-auto laptop:mx-0 text-justify z-10">
                                "Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est
                                laborum."
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full relative min-h-screen">
                    <div>
                        <img className="" src={triangleSvg} alt="" />
                    </div>

                    <div className="container px-2 gap-16 smartphone:px-8 pt-20 pb-24 mx-auto laptop:px-4 flex flex-col desktop:flex-row desktop:gap-4 justify-center items-center">
                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <div style={{minHeight: "27rem"}} className="relative flex-1 max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
                                <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center items-center">
                                    <div className="w-20 h-20 bg-base-200 rounded-full flex justify-center items-center ring-2 ring-primary">
                                        <i className="bi bi-geo-alt-fill text-5xl" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h2 className="font-bold text-lg text-primary">
                                        Funzionalità 1
                                    </h2>
                                    <p className="mt-4">
                                        {" "}
                                        "Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitatcillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum."
                                    </p>
                                </div>
                            </div>

                            <div style={{minHeight: "27rem"}} className="relative flex-1 max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
                                <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center items-center">
                                    <div className="w-20 h-20 bg-base-200 rounded-full flex justify-center items-center ring-2 ring-primary">
                                        <i className="bi bi-twitter text-5xl" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h2 className="font-bold text-lg text-primary">
                                        Funzionalità 2
                                    </h2>
                                    <p className="mt-4">
                                        {" "}
                                        "Lorem ipmmodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <div style={{minHeight: "27rem"}} className="relative flex-1 max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
                                <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center items-center">
                                    <div className="w-20 h-20 bg-base-200 rounded-full flex justify-center items-center ring-2 ring-primary">
                                        <i className="bi bi-search text-5xl" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h2 className="font-bold text-lg text-primary">
                                        Funzionalità 3
                                    </h2>
                                    <p className="mt-4">
                                        {" "}
                                        llamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum."
                                    </p>
                                </div>
                            </div>

                            <div style={{minHeight: "27rem"}} className=" relative flex-1 max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
                                <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center items-center">
                                    <div className="w-20 h-20 bg-base-200 rounded-full flex justify-center items-center ring-2 ring-primary">
                                        <i className="bi bi-box text-5xl" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h2 className="font-bold text-lg text-primary">
                                        Funzionalità 4
                                    </h2>
                                    <p className="mt-4">
                                        {" "}
                                        "Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labhenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-px w-full left-0">
                        <img
                            className="transform rotate-180 filter hue-rotate-60"
                            src={wavesSvg}
                            alt=""
                        />
                    </div>
                </section>

                <section className="w-full relative h-screen flex justify-center items-center">
                    <div
                        style={{ zIndex: "-1" }}
                        className="absolute top-0 left-0 w-full h-full bg-accent"
                    ></div>

                    <div class="container">
                        <div class="p-2 rounded">
                            <div class="flex flex-col laptop:flex-row">
                                <div class="laptop:min-h-screen mb-10 laptop:mb-0 laptop:w-1/3 flex justify-center items-center">
                                  <div className="laptop:mr-10">
                                  <h1 className="text-5xl font-bold mb-5 z-10">
                                Titolo sezione
                            </h1>
                            <p className="text font-normal max-w-md mx-auto laptop:mx-0 text-justify z-10">
                                "Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est
                                laborum."
                            </p>
                                </div>  
                                </div>
                                
                                <div class="laptop:w-2/3 laptop:min-h-screen flex justify-center items-center">
                                    <div class="flex flex-col gap-4">
                                        <div tabIndex="0" class="collapse w-full border bg-base-100 text-base-content rounded-box border-base-300 collapse-arrow">
                                            <div class="collapse-title text-xl font-medium">
                                                I open/close with click
                                            </div>
                                            <div class="collapse-content">
                                                <p>
                                                    Collapse content reveals
                                                    with focus. If you add a
                                                    checkbox, you can control it
                                                    using checkbox instead of
                                                    focus. Or you can
                                                    force-open/force-close using
                                                    <span class="badge badge-outline">
                                                        collapse-open
                                                    </span>{" "}
                                                    and
                                                    <span class="badge badge-outline">
                                                        collapse-close
                                                    </span>{" "}
                                                    classes.
                                                </p>
                                            </div>
                                        </div>
                                        <div tabIndex="0"  class="collapse w-full border bg-base-100 text-base-content rounded-box border-base-300 collapse-arrow">
                                            <div class="collapse-title text-xl font-medium">
                                                I open/close with click
                                            </div>
                                            <div class="collapse-content">
                                                <p>
                                                    Collapse content reveals
                                                    with focus. If you add a
                                                    checkbox, you can control it
                                                    using checkbox instead of
                                                    focus. Or you can
                                                    force-open/force-close using
                                                    <span class="badge badge-outline">
                                                        collapse-open
                                                    </span>{" "}
                                                    and
                                                    <span class="badge badge-outline">
                                                        collapse-close
                                                    </span>{" "}
                                                    classes.
                                                </p>
                                            </div>
                                        </div>
                                        <div tabIndex="0"  class="collapse w-full border bg-base-100 text-base-content rounded-box border-base-300 collapse-arrow">
                                            <div class="collapse-title text-xl font-medium">
                                                I open/close with click
                                            </div>
                                            <div class="collapse-content">
                                                <p>
                                                    Collapse content reveals
                                                    with focus. If you add a
                                                    checkbox, you can control it
                                                    using checkbox instead of
                                                    focus. Or you can
                                                    force-open/force-close using
                                                    <span class="badge badge-outline">
                                                        collapse-open
                                                    </span>{" "}
                                                    and
                                                    <span class="badge badge-outline">
                                                        collapse-close
                                                    </span>{" "}
                                                    classes.
                                                </p>
                                            </div>
                                        </div>

                                        <div tabIndex="0"  class="collapse w-full border bg-base-100 text-base-content rounded-box border-base-300 collapse-arrow">
                                            <div class="collapse-title text-xl font-medium">
                                                I open/close with click
                                            </div>
                                            <div class="collapse-content">
                                                <p>
                                                    Collapse content reveals
                                                    with focus. If you add a
                                                    checkbox, you can control it
                                                    using checkbox instead of
                                                    focus. Or you can
                                                    force-open/force-close using
                                                    <span class="badge badge-outline">
                                                        collapse-open
                                                    </span>{" "}
                                                    and
                                                    <span class="badge badge-outline">
                                                        collapse-close
                                                    </span>{" "}
                                                    classes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomeScreen;
