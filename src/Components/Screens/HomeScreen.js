//Components
import TweetCard from "../TweetCard";
import useWindowSize from "../../Utils/windowSize";
import FunctionalityCard from "../FunctionalityCard";

import triangleSvg from "../../Media/triangle.svg";
import twitterSvg from "../../Media/undraw_viral_tweet_gndb.svg";
import backgroundFigures from "../../Media/background_figures.svg";

import React, { useEffect, useState } from "react";

import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Hero from "../Hero";
import Navbar from "../Navbar";

const HomeScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [y, setY] = useState(window.scrollY);
    const [tweet, setTweet] = useState({
        text: "Prova prova. Mi sentite?$Benvenuto, io sono un tweet.$", //ogni frase e' delimitata da $ e.g. frase1$frase2$...
        created_at: new Date(),
        retweet_count: 0,
        favorite_count: 0,
        comment_count: 0,
        image: twitterSvg,
        user: {
            profile_image_url:
                "https://pbs.twimg.com/media/Dw-EQ2PU0AA2OKP.jpg",
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

            {/* Navbar */}
            <Navbar width={width} />


            {/* Hero section */}
            <Hero />

            {/* Main */}
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

                {/* Sezione 1 */}
                <section className="w-full min-h-screen flex flex-col relative justify-center items-center px-4 py-8 bg-primary overflow-hidden">
                    <div className="flex flex-col min-h-screen justify-center laptop:justify-start laptop:flex-row gap-10 laptop:gap-20 container">
                        <Fade right>
                            <div className="order-2 w-full max-w-md laptop:max-w-xl flex mx-auto items-center">
                                <TweetCard tweet={tweet} />
                            </div>
                        </Fade>

                        <div className="text-center w-full text-primary-content laptop:text-left justify-center laptop:flex laptop:flex-col laptop:min-h-screen order-1 relative">
                            <Fade left text cascade>
                                <h1 className="smartphone:text-5xl text-4xl font-bold mb-5">
                                    Titolo sezione
                                </h1>
                                <p className="text-base font-normal max-w-md mx-auto laptop:mx-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                </p>
                            </Fade>
                        </div>
                    </div>
                </section>

                {/* Sezione 2 */}
                <section className="w-full relative min-h-screen">
                    <div>
                        <img className="" src={triangleSvg} alt="" />
                    </div>

                    <div className="container px-2 gap-16 smartphone:px-8 pt-20 pb-24 mx-auto laptop:px-4 flex flex-col desktop:flex-row desktop:gap-4 justify-center items-center">
                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <Zoom>
                                <FunctionalityCard
                                    title={"Searching"}
                                    icon={"bi-search"}
                                >
                                    Sfrutta la potente barra di ricerca per trovare quello che vuoi, specificando subito se si tratta di una keyword, uno '@'_username o un '#'_hashtag
                                                           
                                </FunctionalityCard>
                            </Zoom>

                            <Zoom>
                                <FunctionalityCard
                                    title={"Statistics"}
                                    icon={"bi-graph-up"}
                                >
                                    Costruiamo automaticamente statistiche analizzando le informazioni contenute nei vari tweet per capire cosa pensa la gente.
                                </FunctionalityCard>
                            </Zoom>
                        </div>

                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <Zoom>
                                <FunctionalityCard
                                    title={"Filtering"}
                                    icon={"bi-geo-alt-fill"}
                                >
                                    Non sprecare tempo, filtra in base ai tuoi interessi, effettua una ricerca mirata a soddisfare ogni tua necessità e mostrartela sulla mappa.
                                </FunctionalityCard>
                            </Zoom>

                            <Zoom>
                                <FunctionalityCard
                                    title={"NEW user stories"}
                                    icon={"bi-box"}
                                >
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua."
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
