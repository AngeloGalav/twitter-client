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
    console.log(errors);

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
                            HITWEET è un progetto universitario nato per il corso di Ingegneria del Software del corso di laurea in Informatica nell'univiersità di Bologna. Consiste in un client Twitter che permette di cercare tweets da twitter, visualizzarli su mappa, ricavarne statistiche interessanti come analisi dei sentimenti o word cloud. O ancora, visualizzare i tweet che vengono inviati in tempo reale con l'opzione streaming e per finire creare contest o trivia tramite Twitter e vederne i risultati e le classifiche dei vincitori. Lo scopo principale del progetto tuttavia, non era realizzare questo lavoro ma imparare il processo di sviluppo agile e lavorare in gruppo.
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
                                        src="https://news.airbnb.com/wp-content/uploads/sites/4/2016/10/140602_AirBnb_Brian_3837_SquareCrop.jpg?fit=950%2C950"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Angelo Galavotti{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Product owner
                                    </span>
                                </h2>
                                {/* <p className="text-lg font-normal mt-2">
                                    Co-founder and Chief Executive Officer
                                </p> */}
                            </div>

                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className=" object-cover w-full h-full"
                                        src="https://picsum.photos/id/1005/400/250"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Matteo Baldazzi{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Scrum master
                                    </span>
                                </h2>
                                {/* <p className="text-lg font-normal mt-2">
                                    Co-Founder, Chief Strategy Officer, Chairman
                                    of Airbnb China
                                </p> */}
                            </div>
                        </div>

                        <div className="flex justify-center flex-col items-stretch laptop:flex-row gap-8 laptop:mt-16 mt-8">
                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className=" object-cover w-full h-full"
                                        src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Giacomo Ciccone{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Developer
                                    </span>
                                </h2>
                                {/* <p className="text-lg font-normal mt-2">
                                    Co-founder and Chief Executive Officer
                                </p> */}
                            </div>

                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className=" object-cover w-full h-full"
                                        src="https://cdn.pixabay.com/photo/2015/08/25/10/40/ben-knapen-906550_960_720.jpg"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Marco Amerotti{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Developer
                                    </span>
                                </h2>
                                {/* <p className="text-lg font-normal mt-2">
                                    Co-Founder, Chief Strategy Officer, Chairman
                                    of Airbnb China
                                </p> */}
                            </div>

                            <div class="max-w-md flex-1">
                                <figure className="rounded-md overflow-hidden h-96">
                                    <img
                                        className="object-cover w-full h-full"
                                        src="https://st3.depositphotos.com/1037987/15097/i/600/depositphotos_150975580-stock-photo-portrait-of-businesswoman-in-office.jpg"
                                        alt=""
                                    />
                                </figure>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Letizia Gorini{" "}
                                    <span className="badge badge-secondary text-xs">
                                        Developer
                                    </span>
                                </h2>
                                {/* <p className="text-lg font-normal mt-2">
                                    Co-Founder, Chief Strategy Officer, Chairman
                                    of Airbnb China
                                </p> */}
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
                                    <input type="submit" class={`mt-16 font-semibold leading-none py-4 px-10 btn ${errorMail ? "btn-error" : "btn-secondary"}`} value="Invia" />
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
