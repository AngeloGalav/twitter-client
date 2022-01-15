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
        text: "Prova prova. Mi sentite?$Benvenuto, io sono un tweet.$Sono un Tweet un po speciale, infatti come puoi vedere non mi fermo mai.$Come dici? Ti interessa sapere cosa si dice riguardo al Milan nella zona di Paperino in provincia di Prato?$ Beh che aspetti, scoprilo subito!", //ogni frase e' delimitata da $ e.g. frase1$frase2$...
        created_at: new Date(),
        retweet_count: 0,
        favorite_count: 0,
        comment_count: 0,
        image: twitterSvg,
        user: {
            profile_image_url:
                "https://pbs.twimg.com/media/Dw-EQ2PU0AA2OKP.jpg",
            name: "HITWEET",
            screen_name: "HI_TWEET",
        },
    });

    const [modalOpen, setModalOpen] = useState(false);

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
                                    Come a casa tua
                                </h1>
                                <p className="text-base font-normal max-w-md mx-auto laptop:mx-0">
                                    Con <span className="font-bold">HI</span>
                                    <span className="font-normal text-sm">
                                        TWEET
                                    </span>{" "}
                                    ti sentirai come su Twitter... ma con
                                    qualcosa in più!
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
                                    Sfrutta la potente barra di ricerca per
                                    trovare quello che vuoi, specificando subito
                                    se si tratta di una keyword, uno
                                    '@'_username o un '#'_hashtag
                                </FunctionalityCard>
                            </Zoom>

                            <Zoom>
                                <FunctionalityCard
                                    title={"Statistics"}
                                    icon={"bi-graph-up"}
                                >
                                    Costruiamo automaticamente statistiche
                                    analizzando le informazioni contenute nei
                                    vari tweet per capire cosa pensa la gente.
                                </FunctionalityCard>
                            </Zoom>
                        </div>

                        <div className="flex flex-col gap-16 laptop:flex-row laptop:gap-4 justify-center items-center">
                            <Zoom>
                                <FunctionalityCard
                                    title={"Filtering"}
                                    icon={"bi-geo-alt-fill"}
                                >
                                    Non sprecare tempo, filtra in base ai tuoi
                                    interessi, effettua una ricerca mirata a
                                    soddisfare ogni tua necessità e mostrartela
                                    sulla mappa.
                                </FunctionalityCard>
                            </Zoom>

                            <Zoom>
                                <FunctionalityCard
                                    title={"Contest/Trivia"}
                                    icon={"bi-trophy"}
                                >
                                    Crea un contest o poni una domanda ai tuoi
                                    followers, e scopri le loro preferenze
                                    direttamente quì!
                                    <br />
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="btn btn-secondary mt-5"
                                    >
                                        Info
                                    </button>
                                </FunctionalityCard>
                            </Zoom>
                        </div>
                    </div>
                </section>
            </main>
            {modalOpen && (
                <div className="fixed w-screen bg-black bg-opacity-25 h-screen top-0 left-0 z-50 flex justify-center items-center p-2">
                    <div style={{maxHeight: 'calc(100vh - 20%)', minHeight: "15rem"}} className=" max-w-xl flex-1 rounded-md shadow-xl bg-base-100 py-8 px-4 overflow-y-auto">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="text-base-content"
                        >
                            {" "}
                            <i class="bi bi-x-lg text-xl"></i>
                        </button>
                        <h1 className="text-2xl font-bold text-center">
                            Istruzioni per i contest o trivia
                        </h1>
                        <div className="mt-4">
                            <p>
                                La creazione di un contest o di un trivia
                                avviene tramite la scelta di un hashtag speciale
                                che termini con{" "}
                                <span className=" font-bold text-primary">
                                    contestswe11
                                </span> per i contest e con <span className=" font-bold text-primary">
                                    triviaswe11
                                </span> per i trivia
                                .
                            </p>
                            <p>
                                Per prima cosa creare un tweet in cui mettere{" "}
                                <span className="underline">
                                    tutti i link ai tweet partecipanti
                                </span>
                                , così che gli utenti possano raggiungerli facilmente. Ogni tweet partecipante deve avere l'hashtag
                                che si è scelto per il contest o il trivia.{" "}
                            </p>
                            <p>
                                Sotto potete vedere alcuni esempi di come devono
                                essere i tweet partecipanti al contest o trivia.
                            </p>
                            <div class="alert alert-warning mt-4">
                                <div class="flex-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        class="w-6 h-6 mx-2 stroke-current"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        ></path>
                                    </svg>
                                    <label>
                                        Attezione, si consiglia di utilizzare
                                        descrizioni brevi per i tweet
                                        partecipanti!
                                    </label>
                                </div>
                            </div>
                            <br />
                            <TweetCard 
                                tweet={{
                                    text: `Il signore degli anelli<br/>#testcontestswe11$Risposta trivia<br/>#testtriviaswe11`,
                                    created_at: new Date(),
                                    retweet_count: 50,
                                    favorite_count: 100,
                                    comment_count: 10,
                                    user: {
                                        profile_image_url:
                                            "https://pbs.twimg.com/media/Dw-EQ2PU0AA2OKP.jpg",
                                        name: "HITWEET",
                                        screen_name: "HI_TWEET",
                                    },
                                }}
                            />

                            <br />

                            <div class="alert alert-info mt-4">
                        <div class="flex-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="w-6 h-6 mx-2 stroke-current"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <label>
                                Per rivelare la risposta di un trivia bisogna creare un tweet esattamente come il seguente
                            </label>
                        </div>
                    </div>
                            
                            <br />

                            <TweetCard 
                                tweet={{
                                    text: `La risposta corretta era: Risposta<br/>#testtriviaswe11`,
                                    created_at: new Date(),
                                    retweet_count: 0,
                                    favorite_count: 0,
                                    comment_count: 0,
                                    user: {
                                        profile_image_url:
                                            "https://pbs.twimg.com/media/Dw-EQ2PU0AA2OKP.jpg",
                                        name: "HITWEET",
                                        screen_name: "HI_TWEET",
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
