//Components
import useWindowSize from "../../Utils/windowSize";
import Navbar from "../Navbar";

import React from "react";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import axios from "axios";

const AboutScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [errorMail, setErrorMail] = useState(false)
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const sendMail = async data => {
        const name = data.name;
        const email = data.email;
        const message = data.message
        try {
        await axios.post("/api/contacts", { name, email, message }, {});
        reset();
        setErrorMail(false)
        } catch (error) {
            console.log(error)
            setErrorMail(true)
        }
    }

    return (
        <div id="about-screen-container">
            {/* Navbar */}
            <Navbar width={width} />
            <div className="mt-16">
                <div
                    style={{
                        height: "calc(100vh - 30)",
                        minHeight: "45rem",
                        backgroundImage:
                            "url(https://www.repstatic.it/content/localirep/img/rep-bologna/2021/07/28/124613929-8f112e8d-b0a5-49a8-ba6a-ead8b3774292.jpg)",
                    }}
                    className="w-full bg-center bg-cover bg-no-repeat filter brightness-75"
                ></div>
                <div className="flex justify-center my-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <h1 className="text-3xl font-bold text-left mb-4">
                            Chi siamo
                        </h1>
                        <p>
                            <span className="font-bold">HI</span>TWEET è un progetto universitario nato per il corso di Ingegneria del Software della laurea in Informatica nell'univiersità di Bologna. Consiste in un client Twitter che permette di cercare tweet da twitter, visualizzarli su mappa, ricavarne statistiche interessanti come analisi dei sentimenti, word cloud ecc. O ancora, permette di visualizzare i tweet che vengono inviati in tempo reale con l'opzione streaming e per finire creare contest o trivia tramite Twitter e vederne i risultati e le classifiche dei vincitori. Lo scopo principale del progetto tuttavia, non era realizzare questo lavoro ma imparare il processo di sviluppo agile e lavorare in gruppo.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center py-16 bg-base-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-3xl font-bold text-center mb-16">
                            Team
                        </h1>
                        <div className="flex justify-center flex-col items-stretch laptop:flex-row gap-8">
                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className=" object-cover w-full h-full"
                                        src="https://media.istockphoto.com/vectors/programming-design-concept-vector-id947663966?k=20&m=947663966&s=612x612&w=0&h=JUMJJkuDL6c9vReaJVL3Y4pDvJtqMzSVVYiJ6CSE-8A="
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Angelo Galavotti{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Product owner
                                    </span>
                                </h2>
                                <p className="text-lg font-normal mt-2">
                                    Responsabile della gestione dei servizi messi a disposizione dall'istituto.
                                </p>
                            </div>

                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className=" object-cover w-full h-full"
                                        src="https://i.pinimg.com/originals/e9/76/32/e97632ec437ea45fcde27d1f85b32fbc.png"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Matteo Baldazzi{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Scrum master
                                    </span>
                                </h2>
                                <p className="text-lg font-normal mt-2">
                                    Responsabile del processo di sviluppo agile e supervisore del metodo scrum.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center flex-col items-stretch laptop:flex-row gap-8 laptop:mt-16 mt-8">
                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className=" object-cover w-full h-full"
                                        src="https://media.istockphoto.com/vectors/work-problem-vector-illustration-cartoon-busy-people-working-hard-in-vector-id1221802324?k=20&m=1221802324&s=612x612&w=0&h=xZfSieEDAqLzOkoVu96ooBgHBVXxZBTxLqyBY7-0YDo="
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Giacomo Ciccone{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Developer
                                    </span>
                                </h2>
                                <p className="text-lg font-normal mt-2">
                                    Tech-lead e responsabile dello sviluppo dell'app React.
                                </p>
                            </div>

                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className=" object-cover w-full h-full"
                                        src="https://thumbs.dreamstime.com/b/man-developer-coding-chatting-laptop-vector-illustration-guy-freelancer-program-code-flat-style-programming-website-concept-216533215.jpg"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Marco Amerotti{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Developer
                                    </span>
                                </h2>
                                <p className="text-lg font-normal mt-2">
                                Sviluppatore di funzionalità riguardanti ricerca e statistiche.
                                </p>
                            </div>

                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className="object-cover w-full h-full"
                                        src="https://assets.materialup.com/uploads/3c4c9c12-9ff6-4fd4-8b8b-a9f93c5effe4/preview.jpg"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Letizia Gorini{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Developer
                                    </span>
                                </h2>
                                <p className="text-lg font-normal mt-2">
                                Sviluppatore di funzionalità riguardanti wordCloud e Tester.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section id={"contacts"} className="flex justify-center py-16">
                    <div class="max-w-4xl w-full mx-auto px-6 sm:px-6 laptop:px-8 mb-12">
                        <div class=" w-full bg-base-200 shadow-xl rounded-md p-8 py-10 sm:p-12">
                            <p class="text-3xl font-bold leading-7 text-center ">
                                Contattaci
                            </p>
                            <form onSubmit={handleSubmit(sendMail)}>
                                <div class="flex flex-col laptop:flex-row items-center mt-12 gap-4">
                                    <div class="w-full laptop:w-1/2 flex flex-col">
                                        <label class="label">
                                        <span class="label-text font-medium">Nome</span>
                                        </label>
                                        <input  class={`input ${errors.name ? "input-error" : "input-primary"} input-bordered`}
                                            placeholder="Mario Rossi" type="text"  {...register("name", {required: "Nome richiesto"})} />
                                    </div>
                                    <div class="w-full laptop:w-1/2 flex flex-col">
                                    <label class="label">
                                        <span class="label-text font-medium">E-mail</span>
                                        </label>
                                        <input  class={`input ${errors.email ? "input-error" : "input-primary"} input-bordered`}
                                            placeholder="Mario.rossi@gmail.com" type="email" {...register("email", {required: "Email richiesta"})} />
                                    </div>
                                </div>
                                <div class="iflex items-center mt-8">
                                    <div class="w-full flex flex-col">
                                    <label class="label">
                                        <span class="label-text font-medium">Messaggio</span>
                                        </label>
                                        <textarea class={`textarea h-24 textarea-bordered ${errors.message ? "textarea-error" : "textarea-primary"}`}placeholder="Il tuo messaggio..." {...register("message", {required: "Messaggio richiesto"})} />
                                    </div>
                                </div>
                                <div class="flex items-center justify-center w-full">
                                    <input type="submit" class={`mt-16 font-semibold leading-none py-4 px-10 btn ${errors.message || errors.name || errors.email ? "btn-error text-white" : "btn-secondary"}`} value="Invia" />
                                </div>
                            </form>
                        </div>
                    </div>
                                    
                </section>
            </div>
        </div>
    );
};

export default AboutScreen;
