//Components
import NavbarMobile from "../NavbarMobile";
import NavbarDesktop from "../NavbarDesktop";
import TweetCard from "../TweetCard";
import useWindowSize from "../../Utils/windowSize";
import FunctionalityCard from "../FunctionalityCard";

import triangleSvg from "../../Media/triangle.svg";
import twitterSvg from "../../Media/undraw_viral_tweet_gndb.svg";
import backgroundFigures from "../../Media/background_figures.svg";

import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

const HomeScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [y, setY] = useState(window.scrollY);
    const [tweet, setTweet] = useState({
        text: "Prova prova. Mi sentite?$Benvenuto, io sono un tweet.$",
        created_at: new Date(),
        retweet_count: 0,
        favorite_count: 0,
        comment_count: 0,
        image: twitterSvg,
        user: {
            profile_image_url:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Seal_of_the_University_of_Bologna.svg/1200px-Seal_of_the_University_of_Bologna.svg.png",
            name: "Demo name",
            screen_name: "Demo_name",
        },
    });

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
                class="hero h-screen bg-fixed relative bg-cover bg-center bg-gradient-to-t"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80")`,
                    minHeight: "45rem",
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary via-transparent to-transparent"></div>
                <div class="hero-overlay h-full w-full bg-opacity-10"></div>
                <div class="px-8 smartphone:px-12 text-neutral-content relative -top-20 text-center laptop:text-left ipad:absolute ipad:top-1/2 ipad:height-40 ipad:transform ipad:-translate-y-1/2 ipad:left-20">
                    <div>
                        <h1 class="mb-5 ipad:mb-8 text-5xl font-bold">
                            Titolo non troppo lungo
                        </h1>
                        <p class="mb-5 text-base">
                            <span className="font-bold">Twitter client</span> ti
                            Sottotitolo di massimo due righe
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
                        backgroundImage: `url(${backgroundFigures})`,
                        zIndex: "-1",
                    }}
                    className="w-full h-full absolute bg-cover bg-no-repeat bg-center top-0 left-0"
                >
                    {" "}
                </div>

                <section className="w-full min-h-screen flex flex-col relative justify-center items-center px-4 py-8 bg-primary overflow-hidden">
                    <div className="flex flex-col min-h-screen justify-center laptop:justify-start laptop:flex-row gap-10 laptop:gap-20 container">
                        <Fade right>
                            <div className="order-2 w-full max-w-md laptop:max-w-xl flex mx-auto items-center">
                                <TweetCard tweet={tweet} />
                            </div>
                        </Fade>

                        <div className="text-center w-full text-primary-content laptop:text-left justify-center laptop:flex laptop:flex-col laptop:min-h-screen order-1 relative">
                            <Fade left text cascade>
                                <h1 className="text-5xl font-bold mb-5">
                                    Titolo sezione
                                </h1>
                                <p className="text font-normal max-w-md mx-auto text-lg laptop:mx-0 text-justify">
                                    Breve descrizione
                                </p>
                            </Fade>
                        </div>
                    </div>
                </section>

                <section className="w-full relative min-h-screen">
                    <div>
                        <img className="" src={triangleSvg} alt="" />
                    </div>

                    <div className="container px-2 gap-16 smartphone:px-8 pt-20 pb-24 mx-auto laptop:px-4 flex flex-col desktop:flex-row desktop:gap-4 justify-center items-center">
                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <Zoom>
                                <FunctionalityCard
                                    title={"Funzionalità 1"}
                                    icon={"bi-geo-alt-fill"}
                                >
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitatcillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat
                                    non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum."
                                </FunctionalityCard>
                            </Zoom>

                            <Zoom>
                                <FunctionalityCard
                                    title={"Funzionalità 2"}
                                    icon={"bi-twitter"}
                                >
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitatcillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat
                                    non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum."
                                </FunctionalityCard>
                            </Zoom>
                        </div>

                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <Zoom>
                                <FunctionalityCard
                                    title={"Funzionalità 1"}
                                    icon={"bi-search"}
                                >
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitatcillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat
                                    non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum."
                                </FunctionalityCard>
                            </Zoom>

                            <Zoom>
                                <FunctionalityCard
                                    title={"Funzionalità 1"}
                                    icon={"bi-box"}
                                >
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitatcillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat
                                    non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum."
                                </FunctionalityCard>
                            </Zoom>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomeScreen;
