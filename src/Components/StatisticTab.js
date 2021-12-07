//componenti
import Cloud from "./Cloud";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ReactStoreIndicator from "react-score-indicator";
import notFoundTweets from "../Media/undraw_void_-3-ggu.svg";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticTab = (props) => {
    //redux stuff
    const { sentimentAnalysis, wordCloud } = useSelector(
        (state) => state.tweetReducer
    );

    const [sentimentData, setSentimentData] = useState(null);
    const [sentimentTab, setSentimentTab] = useState(false);

    useEffect(() => {
        if (sentimentAnalysis) {
            setSentimentData({
                labels: ["Positivi", "Negativi", "Neutrali"],
                datasets: [
                    {
                        data: [
                            sentimentAnalysis.positives,
                            sentimentAnalysis.negatives,
                            sentimentAnalysis.neutrals,
                        ],
                        backgroundColor: [
                            "rgba(60, 179, 113, 0.2)",
                            "rgba(255, 0, 0, 0.2)",
                            "rgba(255, 165, 0, 0.2)",
                        ],
                        borderColor: [
                            "rgba(60, 179, 113, 1)",
                            "rgba(255, 0, 0, 1)",
                            "rgba(255, 165, 0, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }

        console.log(sentimentAnalysis);
    }, []);

    return (
        <div className="h-full noScrollBar laptop:overflow-y-auto">
            {props.found ? (
                <>
                    <div className="mt-8">
                        <h1 className="text-center text-2xl font-semibold">
                            Statistiche
                        </h1>
                        <div className="w-full h-px bg-base-content bg-opacity-50 mt-2" />
                    </div>
                    <div className="mt-8 px-4">
                        {sentimentData && (
                            <div>
                                
                                <div class="card text-center bg-neutral shadow-xl mt-2 p-4">

                                <h2 className="text-3xl font-bold text-left mb-4">
                                    Analisi dei sentimenti
                                </h2>
                                    <div class="px-10 pt-10">
                                        {!sentimentTab ? (
                                            <ReactStoreIndicator
                                                value={
                                                    Math.round(
                                                        sentimentAnalysis.comparative *
                                                            2
                                                    ) / 2
                                                }
                                                maxValue={10}
                                                fadedOpacity={20}
                                            />
                                        ) : (
                                            <div className=" w-48 smartphone:w-64 mx-auto">
                                                <Doughnut
                                                    data={sentimentData}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div class="card-body">
                                        <h2 class="card-title">Punteggio</h2>
                                        <p>
                                            {" "}
                                            Il punteggio è calcolato analizzando
                                            ogni tweet trovato ed effettuando
                                            una media sul numero di tweets. La
                                            tendenza per questa ricerca è{" "}
                                            <span
                                                className={`${
                                                    sentimentAnalysis.score < 0
                                                        ? "text-error"
                                                        : sentimentAnalysis.score ===
                                                          0
                                                        ? "text-warning"
                                                        : "text-success"
                                                } font-bold`}
                                            >{`${
                                                sentimentAnalysis.score < 0
                                                    ? "Negativa"
                                                    : sentimentAnalysis.score ===
                                                      0
                                                    ? "Neutrale"
                                                    : "Positiva"
                                            }`}</span>
                                        </p>
                                        <div class="justify-center card-actions">
                                            <button
                                                onClick={() =>
                                                    setSentimentTab(
                                                        (sentimentTab) =>
                                                            !sentimentTab
                                                    )
                                                }
                                                class="btn btn-outline btn-secondary"
                                            >
                                                Altro
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-8 px-4">
                        <div class="card text-center bg-neutral shadow-xl mt-2 p-4">
                        <h2 className="text-3xl font-bold text-left mb-4">
                            Wordcloud
                        </h2>
                            <Cloud wordCloud={wordCloud} />
                        </div>
                    </div>{" "}
                </>
            ) : (
                <div
                    style={{ height: "calc(100% - 2rem)" }}
                    className="flex flex-col mt-8 px-4 gap-20 laptop:gap-0 items-center"
                >
                    <p className="w-full text-left text-base">
                        Niente da vedere quì ...{" "}
                        <i class="bi bi-emoji-frown"></i>
                    </p>
                    <div className="w-full h-full flex justify-center items-center">
                        <img
                            className="max-w-md mx-auto w-full"
                            src={notFoundTweets}
                            alt=""
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatisticTab;
