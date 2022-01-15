//componenti
import SwitchTheme from "./SwitchTheme";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useWindowSize from "../Utils/windowSize";
import {filters} from '../Utils/Filters'
import Logo from "./Logo";

const NavbarDesktop = () => {
    //stato
    const location = useLocation();
    const history = useHistory();
    const [y, setY] = useState(window.scrollY);
    const [colorChange, setColorchange] = useState(
        location.pathname !== "/" || y >= 80
    );
    const [tabFocus, setTabFocus] = useState(0);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    //hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        //questa funzione e' quella che viene chiamata quando l'utente preme su cerca, data contiene l'input in data.userInput
        //per cambiare pagina usate l'hook useHistory() per prendere la funzione di react router dom che gestisce la history e fare un history.push(`/tweets/mainFilter${tabFocus}?data.userInput`)
        if (filters[tabFocus] !== "Contest/Trivia") {
            history.push(`/tweets/${filters[tabFocus]}?q=${filters[tabFocus] !== "Keyword" ? data.userInput.substring(1) :  data.userInput}`);
        } else {
            if (!data.userInput.includes("trivia")) history.push(`/contest?q=${data.userInput.substring(1)} from:${data.userInputContest.substring(1)}`)
            else history.push(`/trivia?q=${data.userInput.substring(1)} from:${data.userInputContest.substring(1)}`)
        }
        history.go(0);
    };

    /*Cambia il colore della navbar */
    const changeNavbarColorDesktop = () => {
        setY(window.scrollY);
        if (y >= 80 || location.pathname !== "/") {
            //solo nella home è inizialmente trasparente
            setColorchange(true);
        } else {
            setColorchange(false);
            setSearchBarOpen(false);
        }
    };

    //Gestisce il focus sulle tab
    const addTabFocusHandler = (event) =>
        setTabFocus(parseInt(event.target.id.slice(-1)));

    //Effetti
    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", changeNavbarColorDesktop);

        //rimuove il callback da window quando si fa unmount del componente
        return () => {
            window.removeEventListener("scroll", changeNavbarColorDesktop);
        };
    }, [changeNavbarColorDesktop]);

    return (
        <div className={`relative ${searchBarOpen ? "z-50" : "z-20"}`}>
            <div
                className={`p-4 ${
                    !colorChange ? "bg-transparent" : "bg-neutral shadow-md"
                } fixed top-0 w-full transition-all duration-200 ease-linear`}
            >
                {/* Navbar */}
                <div className="flex justify-between items-center container mx-auto">

                    {/* Logo */}
                    <Logo />

                    {/* Tabs */}
                    {colorChange ? (
                        <div className="flex-1 flex justify-center">
                            <button
                                className={`btn btn-natural btn-block ${
                                    colorChange
                                        ? "border-base-100 shadow-md"
                                        : ""
                                } rounded-full w-3/4 normal-case font-medium h-14`}
                                onClick={() =>
                                    setSearchBarOpen(
                                        (searchBarOpen) => !searchBarOpen
                                    )
                                }
                            >
                                {!searchBarOpen ? (
                                    <span className="flex items-center">
                                        <i className="bi bi-search text-primary text-xl" />{" "}
                                        &nbsp; Cosa vuoi cercare?
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <i className="bi bi-x text-error text-xl" />{" "}
                                        &nbsp; Chiudi
                                    </span>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex-nowrap laptop:flex justify-center hidden">
                            <div className="tabs">
                            {filters.map((filter, i) => 
                        <a
                            tabIndex="0"
                            id={`navbar-tab-${i}`}
                            className={`tab tab-bordered w-36 ${
                                tabFocus === i ? "tab-active" : ""
                            }`}
                            onFocus={addTabFocusHandler}
                        >
                            {filter}
                        </a>
                    )}
                            </div>
                        </div>
                    )}


                    {/* Cambio tema */}
                    <div className="w-56 flex justify-center gap-4 items-center">
                        <div>
                            <SwitchTheme />
                        </div>
                        <div>
                            <button className="btn btn-secondary">
                                <Link to="/about">Chi siamo</Link>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Tab quando si deve aprire il menu */}
                <div
                    className={`flex-1 mt-5 justify-center ${
                        !colorChange && width < 1024
                            ? "flex"
                            : searchBarOpen
                            ? "flex"
                            : "hidden"
                    }`}
                >
                    <div className="tabs">
                    {filters.map((filter, i) => 
                        <a
                            tabIndex="0"
                            id={`navbar-tab-${i}`}
                            className={`tab tab-bordered w-36 ${
                                tabFocus === i ? "tab-active" : ""
                            }`}
                            onFocus={addTabFocusHandler}
                        >
                            {filter}
                        </a>
                    )}
                    
                    </div>
                </div>

                <div
                    className={`mx-auto max-w-2xl ${
                        !colorChange || searchBarOpen ? "container" : "hidden"
                    } justify-center`}
                >

                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control mt-8">
                            <div class="relative w-full">
                                <input
                                    type="text"
                                    placeholder={`${tabFocus === 0 ? "Inserisci ciò che preferisci" : tabFocus === 1 ? "Inserisci un username come @Twitter" : tabFocus === 2 ? "Inserisci un hashtag come #politica" : "Inerisci un hashtag che termina con contestswe11 o triviaswe11"}`}
                                    {...register("userInput", {
                                        required: true,
                                        pattern: {
                                            value: new RegExp(`${tabFocus === 0 ? ".*" : tabFocus === 1 ? "^@[a-zA-Z0-9_]{1,15}$" : tabFocus === 2 ? /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/.source : /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+contestswe11|#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+triviaswe11/.source}`),
                                            message: `${tabFocus === 0 ? "Inserisci qualcosa" : tabFocus === 1 ? "Inserisci un username come @Twitter" : tabFocus === 2 ? "Inserisci un hashtag come #politica" : "L'hastag deve terminare esattamente con contestswe11 o triviaswe11"}`
                                          }
                                    })}
                                    className={`w-full pr-16 h-14 input ${
                                        errors.userInput
                                            ? "input-error"
                                            : "input-primary"
                                    } shadow-md input-bordered rounded-full`}
                                />
                                {tabFocus == 3 && <input
                                    type="text"
                                    placeholder={`Inserisci l'Username dell'organizzatore`}
                                    {...register("userInputContest", {
                                        required: true,
                                        pattern: {
                                            value: new RegExp("^@[a-zA-Z0-9_]{1,15}$"),
                                            message: "Inserisci un username come @Twitter"
                                          }
                                    })}
                                    className={`w-full mt-5 pr-16 h-14 input ${
                                        errors.userInputContest
                                            ? "input-error"
                                            : "input-primary"
                                    } shadow-md input-bordered rounded-full`}
                                />}
                                <label
                                    htmlFor="submit-search-btn"
                                    className={`absolute top-1 h-12 w-12 right-1 btn ${
                                        errors.userInput || errors.userInputContest
                                            ? "btn-error"
                                            : "btn-primary"
                                    } rounded-full`}
                                >
                                    <i className="bi bi-search text-xl" />
                                </label>
                                <input
                                    className="w-0 h-0 overflow-hidden"
                                    type="submit"
                                    value="Cerca"
                                    id="submit-search-btn"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NavbarDesktop;
