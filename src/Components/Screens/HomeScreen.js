//Components
import NavbarMobile from "../NavbarMobile";
import NavbarDesktop from "../NavbarDesktop";

import wavesSvg from "../../Media/wavesOpacity.svg";
import triangleSvg from "../../Media/triangle.svg";

import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import useWindowSize from "../../Utils/windowSize";

const HomeScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [y, setY] = useState(window.scrollY);

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

    return (
        <div id="home-screen-container">
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
            <div
                class="hero h-screen bg-fixed relative bg-cover bg-center"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80")`,
                    minHeight: "45rem",
                }}
            >
                <div class="hero-overlay h-full w-full bg-opacity-10"></div>
                <div class="px-8 smartphone:px-12 text-neutral-content relative -top-20 text-left smartphone:text-left ipad:absolute ipad:top-1/2 ipad:height-40 ipad:transform ipad:-translate-y-1/2 ipad:left-20">
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

                <section className="w-full min-h-screen flex flex-col relative justify-center items-center bg-primary">
                    <div className="flex flex-col laptop:flex-row gap-20 container">
                        <div class="bg-base-100 shadow-md p-4 rounded-xl max-w-xl order-2 mx-auto">
                            <div class="flex justify-between">
                                <div class="flex items-center">
                                    <img
                                        class="h-11 w-11 rounded-full"
                                        src="https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg"
                                    />
                                    <div class="ml-1.5 text-sm leading-tight">
                                        <span class="text-base-content font-bold block ">
                                            Visualize Value
                                        </span>
                                        <span class="text-gray-400 font-normal block">
                                            @visualizevalue
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    class="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <g>
                                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                                    </g>
                                </svg>
                            </div>
                            <p class=" text-base-content block text-xl leading-snug mt-3">
                                “No one ever made a decision because of a
                                number. They need a story.” — Daniel Kahneman
                            </p>
                            <img
                                class="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                                src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
                            />
                            <p class="text-gray-400 text-base py-1 my-0.5">
                                10:05 AM · Dec 19, 2020
                            </p>
                            <div class="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
                            <div class="text-gray-400 flex mt-3">
                                <div class="flex items-center mr-6">
                                    <svg
                                        class="fill-current h-5 w-auto"
                                        viewBox="0 0 24 24"
                                        class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                    >
                                        <g>
                                            <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                                        </g>
                                    </svg>
                                    <span class="ml-3">615</span>
                                </div>
                                <div class="flex items-center mr-6">
                                    <svg
                                        width="20px"
                                        class="fill-current h-5 w-auto"
                                        viewBox="0 0 24 24"
                                        class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                    >
                                        <g>
                                            <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                                        </g>
                                    </svg>
                                    <span class="ml-3">
                                        93 people are Tweeting about this
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 order-1">
                            <h1 className="text-5xl font-bold text-primary-content mb-5">
                                Titolo sezione
                            </h1>
                            <p className="text font-normal text-primary-content">
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

                    <div className="container px-2 gap-16 smartphone:px-8 pt-20 pb-24 mx-auto lg:px-4 flex flex-col desktop:flex-row desktop:gap-4 justify-center items-center">
                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <div className="relative max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
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
                                        nostrud exercitation ullamco laboris
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

                            <div className="relative max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
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
                                        "Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
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
                        </div>

                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <div className="relative max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
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
                                        "Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
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

                            <div className="relative max-w-sm bg-base-200 p-8 rounded-xl text-center shadow-lg transform hover:scale-110 transition-all duration-200 ease-linear">
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
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
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

                <section className="w-full relative h-screen">
                    <div className="absolute top-0 left-0 w-full h-full bg-primary filter hue-rotate-60">
                        <h1>Sezione faq</h1>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomeScreen;
