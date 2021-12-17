//components
import RankingColumn from "../RankingColumn";
import Loading from "../Loading";
import useWindowSize from "../../Utils/windowSize";

import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Fade } from "react-reveal";
import SwitchTheme from "../SwitchTheme";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import notFound from "../../Media/undraw_walk_dreaming_u-58-a.svg"



const ContestScreen = () => {

    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [ranking, setRanking] = useState([])
    const [total, setTotal] = useState(0);
    const [fav100, setFav100] = useState(0);
    const [fav1000, setFav1000] = useState(0);
     // eslint-disable-next-line
     const [width, height] = useWindowSize();

    useEffect(() => {
        const fetchRanking = async () => {

            const { search } = window.location;
            const q = search.toString();
            setIsLoading(true)
            try {
                const {data} = await axios.get("/api/contest" + q);
                //if(!data) throw "Errore"
                console.log(data)
                setRanking(data.ranking)
                setTotal(data.total);
                setFav100(data.fav100);
                setFav1000(data.fav1000);
                setIsLoading(false)
            } catch (error) {
                setRanking([])
                setFav100(0)
                setTotal(0)
                setFav1000(0)
                setIsLoading(false)
                console.log("Errore")
            }
        }

        fetchRanking();
    }, [])
    return (
        <div
            id="contest-screen-container"
            className=" bg-primary-focus bg-opacity-50 pb-20"
        >
            <div className=" hidden w-0 h-0 overflow-hidden
            ">
            <SwitchTheme />
            </div>
            
            <div className="py-4 bg-primary text-primary-content">
            <h1 className="text-center text-5xl font-bold z-10 relative">Risultati</h1>
            </div>
            
            {isLoading ? (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
            
            ) : (<>

            {ranking.length > 0 ? (
                <>
                 <div
                style={{ minHeight: "800px" }}
                className="container h-screen mx-auto flex flex-col items-center justify-center text-primary-content"
            >
                <Fade>
                
                <div className="flex items-end w-full justify-center">
                    <RankingColumn
                        height="30vh"
                        minHeight="15rem"
                        iconMedal="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-medal-awards-justicon-flat-justicon-2.png"
                        votes={ranking[0][1]}
                        position={3}
                        partecipant={ranking[0][0].split(" ").slice(0, 2).join(" ")}
                    />

                    <RankingColumn
                        height="50vh"
                        minHeight="25rem"
                        iconMedal="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-medal-awards-justicon-flat-justicon.png"
                        votes={ranking[1] ? ranking[1][1] : ""}
                        position={1}
                        partecipant={ranking[1] ? ranking[1][0].split(" ").slice(0, 2).join(" ") : ""}
                    />

                    <RankingColumn
                        height="40vh"
                        minHeight="20rem"
                        iconMedal="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-medal-awards-justicon-flat-justicon-1.png"
                        votes={ranking[2] ? ranking[2][1] : ""}
                        position={2}
                        partecipant={ranking[2] ? ranking[2][0].split(" ").slice(0, 2).join(" ") : ""}
                    />
                </div>

                </Fade>
                
                <div className="flex justify-center items-center mt-10 gap-4">
                <ScrollLink
                    activeClass="active"
                    to="top-10-table"
                    spy={true}
                    smooth={true}
                    offset={-140}
                    duration={800}
                >
                    <button className="btn btn-secondary">
                        Vai a Top 10
                    </button>
                </ScrollLink>


                <Link className="btn btn-neutral text-neutral-content" to="/"> <i className="bi bi-house-fill text-2xl"></i></Link>
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
                                <th>Partecipante</th>
                                <th>Voti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((ranking, i) => {
                               if(i < 10) {
                                return (
                                    <tr>
                                    <td></td>
                                    <td>{i + 1}</td>
                                    <td>{ranking[0]}</td>
                                    <td>{ranking[1]}</td>
                                </tr>
                                )
                            } 
                            })}
                        </tbody>
                    </table>
                </div>
            </Fade>
            </div>
            

            
                <div class=" flex flex-col ipad:flex-row justify-center items-center mt-12 gap-4 max-w-4xl mx-auto container px-4">
                    <div className="flex-1 rounded-md overflow-hidden shadow-xl w-72">
                    <Fade>
                    <div class="shadow stats">
                        <div class="stat">
                            <div class="stat-title">Partecipanti totali</div>
                            <div class="stat-value">{total === 100 ? "100+" : total}</div>
                        </div>
                    </div>
                    </Fade>
                    </div>
              

                    <div className="flex-1 rounded-md overflow-hidden shadow-xl w-72">
                    <Fade>
                    <div class="shadow stats">
                        <div class="stat">
                            <div class="stat-title">Partecipanti con più di 100 voti</div>
                            <div class="stat-value">{fav100}</div>
                        </div>
                    </div>
                    </Fade>
                    </div>

                    <div className="flex-1 rounded-md overflow-hidden shadow-xl w-72">
                    <Fade>
                    <div class="shadow stats">
                        <div class="stat">
                            <div class="stat-title">Partecipanti con più di 1000 voti</div>
                            <div class="stat-value">{fav1000}</div>
                        </div>
                    </div>
                    </Fade>
                    </div>
                </div>
                </>
            ) : ( <>
            
            <div className=" min-h-screen flex flex-col justify-center items-center container mx-auto">
                <img className="w-full max-w-md" src={notFound} alt="" />
                <p style={{fontSize: `${width < 768 ? "8vw" : "4vw"}`}} className=" -m-10 text-primary-content w-full text-center font-bold">Sembra che non ci sia nessun contest attivo per #{window.location.search.toString().substring(3)} :(</p>
                    <Link className="btn btn-neutral text-neutral-content mt-16" to="/"> <i className="bi bi-house-fill text-2xl"></i></Link>
            </div>

            
            </>)}
               
            </>)}
            
                
            
        </div>
    );
};

export default ContestScreen;
