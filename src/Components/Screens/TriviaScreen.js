//components
import RankingColumn from "../RankingColumn";
import Loading from "../Loading";
import useWindowSize from "../../Utils/windowSize";

import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Fade } from "react-reveal";
import SwitchTheme from "../SwitchTheme";
import { Link } from "react-router-dom";
import axios from "axios";

import notFound from "../../Media/undraw_walk_dreaming_u-58-a.svg";

const TriviaScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ranking, setRanking] = useState([]);
    const [total, setTotal] = useState(0);
    const [solution, setSolution] = useState(null);
    const [favTotal, setFavTotal] = useState(0);
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    function truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    useEffect(() => {
        const fetchRanking = async () => {
            const { search } = window.location;
            const q = search.toString();
            setIsLoading(true);
            try {
                const { data } = await axios.get("/api/trivia" + q);
                //if(!data) throw "Errore"
                setRanking(data.ranking);
                setTotal(data.total);
                setSolution(data.solution);
                setFavTotal(data.favTotal);
                setIsLoading(false);
            } catch (error) {
                setRanking([]);
                setSolution(0);
                setTotal(0);
                setFavTotal(0);
                setIsLoading(false);
            }
        };

        fetchRanking();
    }, []);
    return (
        <div
            id="trivia-screen-container"
            className=" bg-primary bg-opacity-50 pb-20"
        >
            <div
                className=" hidden w-0 h-0 overflow-hidden
            "
            >
                <SwitchTheme />
            </div>

            <div className="py-2 bg-neutral shadow">
                <h1 className="text-center text-5xl font-bold z-10 relative text-transparent bg-clip-text bg-gradient-to-b from-primary to-accent">
                    Risultati
                </h1>
            </div>

            {isLoading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <>
                    {ranking.length > 0 ? (
                        <>
                            <div
                                style={{ minHeight: "800px" }}
                                className="container h-screen mx-auto flex flex-col items-center justify-center text-primary-content"
                            >
                                <Fade>
                                    <div className="flex items-end w-full justify-center gap-2">
                                        <RankingColumn
                                            height="30vh"
                                            minHeight="15rem"
                                            solution={solution===ranking[2][0]}
                                            votes={
                                                ranking[2] ? ranking[2][1] : ""
                                            }
                                            position={3}
                                            partecipant={
                                                ranking[2]
                                                    ? truncate(
                                                          ranking[2][0],
                                                          18
                                                      )
                                                    : ""
                                            }
                                        />

                                        <RankingColumn
                                            height="50vh"
                                            minHeight="25rem"
                                            solution={solution===ranking[0][0]}
                                            votes={ranking[0][1]}
                                            position={1}
                                            partecipant={truncate(
                                                ranking[0][0],
                                                18
                                            )}
                                        />

                                        <RankingColumn
                                            height="40vh"
                                            minHeight="20rem"
                                            solution={solution===ranking[1][0]}
                                            votes={
                                                ranking[1] ? ranking[1][1] : ""
                                            }
                                            position={2}
                                            partecipant={
                                                ranking[1]
                                                    ? truncate(
                                                          ranking[1][0],
                                                          18
                                                      )
                                                    : ""
                                            }
                                        />
                                    </div>
                                </Fade>

                                <div className="flex justify-center items-center mt-10 gap-4">
                                    <ScrollLink
                                        activeClass="active"
                                        to="top-10-table"
                                        className="relative"
                                        spy={true}
                                        smooth={true}
                                        offset={-140}
                                        duration={800}
                                    >
                                        <div className=" bg-gradient-to-r from-accent to-primary absolute -inset-1 rounded-lg filter blur"></div>
                                        <button className="btn btn-secondary z-10 relative">
                                            Vai a Top 10
                                        </button>
                                    </ScrollLink>

                                    <Link
                                        className="btn btn-neutral text-neutral-content"
                                        to="/"
                                    >
                                        {" "}
                                        <i className="bi bi-house-fill text-2xl"></i>
                                    </Link>
                                </div>
                            </div>

                            <div className="shadow-xl max-w-4xl mx-auto rounded-md overflow-hidden bg-base-100 container overflow-x-auto w-11/12">
                                <Fade>
                                    <div id="top-10-table">
                                        <table class="table w-full  ">
                                            <thead>
                                                <tr className="rounded-t-md p-8 overflow-hidden">
                                                    <th></th>
                                                    <th>Posizione</th>
                                                    <th>Risposta</th>
                                                    <th>Voti</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ranking.map((ranking, i) => {
                                                    if (i < 10) {
                                                        return (
                                                            <tr className={`${solution===ranking[0] ? "text-success" : "text-base-content"}`}>
                                                                <td></td>
                                                                <td>{i + 1}</td>
                                                                <td>
                                                                    {ranking[0]}
                                                                </td>
                                                                <td>
                                                                    {ranking[1]}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </Fade>
                            </div>

                            <div class=" flex flex-col ipad:flex-row justify-center items-center mt-12 gap-4 max-w-4xl mx-auto container px-4">
                                <div className="flex-1 rounded-md overflow-hidden shadow-xl w-full">
                                    <Fade>
                                        <div class="shadow stats">
                                            <div class="stat">
                                                <div class="stat-title">
                                                    Risposte totali
                                                </div>
                                                <div class="stat-value">
                                                    {total === 100
                                                        ? "100+"
                                                        : total}
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>

                                <div className="flex-1 rounded-md overflow-hidden shadow-xl w-full">
                                    <Fade>
                                        <div class="shadow stats">
                                            <div class="stat">
                                                <div class="stat-title">
                                                    Risposta corretta
                                                </div>
                                                <div class="stat-value">
                                                    {solution ? solution : "???"}
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>

                                <div className="flex-1 rounded-md overflow-hidden shadow-xl w-full">
                                    <Fade>
                                        <div class="shadow stats">
                                            <div class="stat">
                                                <div class="stat-title">
                                                    Voti totali
                                                </div>
                                                <div class="stat-value">
                                                    {favTotal}
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className=" min-h-screen flex flex-col justify-center items-center container mx-auto">
                                <img
                                    className="w-full max-w-md"
                                    src={notFound}
                                    alt=""
                                />
                                <p
                                    style={{
                                        fontSize: `${
                                            width < 768 ? "8vw" : "4vw"
                                        }`,
                                    }}
                                    className=" -m-10 text-primary-content w-full text-center font-bold"
                                >
                                    Sembra che non ci sia nessun trivia attivo
                                    per #
                                    {window.location.search
                                        .toString()
                                        .split("%")[0]
                                        .substring(3) +
                                        " creato da @" +
                                        window.location.search
                                            .toString()
                                            .split("%")[1]
                                            .substring(7)}{" "}
                                    :(
                                </p>
                                <Link
                                    className="btn btn-neutral text-neutral-content mt-16"
                                    to="/"
                                >
                                    {" "}
                                    <i className="bi bi-house-fill text-2xl"></i>
                                </Link>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default TriviaScreen;
