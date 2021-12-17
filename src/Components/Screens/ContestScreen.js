//components
import useWindowSize from "../../Utils/windowSize";

import React from "react";
import { Link as ScrollLink } from "react-scroll";
import RankingColumn from "../RankingColumn";
import { Fade } from "react-reveal";
import SwitchTheme from "../SwitchTheme";
import { Link } from "react-router-dom";

const ContestScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    const mockup = [
        {
            value: "book1",
            votes: 40,
            ranking: 1,
        },
        {
            value: "book2",
            votes: 40,
            ranking: 2,
        },
        {
            value: "book3",
            votes: 400000,
            ranking: 3,
        },
        {
            value: "book4",
            votes: 40,
            ranking: 4,
        },
    ];
    return (
        <div
            id="contest-screen-container"
            className=" bg-primary-focus bg-opacity-50 pb-20"
        >
            <div className=" hidden w-0 h-0 overflow-hidden
            ">
            <SwitchTheme />
            </div>
            
            <div className="py-4 text-primary-content relative">
                <div className="absolute w-full h-full left-0 top-0 bg-primary filter brightness-50">
                    
                </div>
            <h1 className="text-center text-5xl font-bold z-10 relative">Risultati</h1>
            </div>
            
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
                        votes={mockup[2].votes}
                        position={3}
                        partecipant={mockup[2].value}
                    />

                    <RankingColumn
                        height="50vh"
                        minHeight="25rem"
                        iconMedal="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-medal-awards-justicon-flat-justicon.png"
                        votes={mockup[0].votes}
                        position={1}
                        partecipant={mockup[0].value}
                    />

                    <RankingColumn
                        height="40vh"
                        minHeight="20rem"
                        iconMedal="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-medal-awards-justicon-flat-justicon-1.png"
                        votes={mockup[1].votes}
                        position={2}
                        partecipant={mockup[1].value}
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
                                <th>Nome</th>
                                <th>Voti</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>1</td>
                                <td>Community Outreach Specialist</td>
                                <td>Indigo</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>2</td>
                                <td>Editor</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>3</td>
                                <td>Staff Accountant IV</td>
                                <td>Yellow</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>4</td>
                                <td>Accountant I</td>
                                <td>Crimson</td>
                            </tr>
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
                            <div class="stat-value">89,400</div>
                        </div>
                    </div>
                    </Fade>
                    </div>
              

                    <div className="flex-1 rounded-md overflow-hidden shadow-xl w-72">
                    <Fade>
                    <div class="shadow stats">
                        <div class="stat">
                            <div class="stat-title">Partecipanti con più di 100 voti</div>
                            <div class="stat-value">89,400</div>
                        </div>
                    </div>
                    </Fade>
                    </div>

                    <div className="flex-1 rounded-md overflow-hidden shadow-xl w-72">
                    <Fade>
                    <div class="shadow stats">
                        <div class="stat">
                            <div class="stat-title">Partecipanti con più di 1000 voti</div>
                            <div class="stat-value">89,400</div>
                        </div>
                    </div>
                    </Fade>
                    </div>
                </div>
                
            
        </div>
    );
};

export default ContestScreen;
