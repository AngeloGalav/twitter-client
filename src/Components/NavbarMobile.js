//components
import SwitchTheme from "./SwitchTheme";
import useWindowSize from "../Utils/windowSize";
import { filters } from "../Utils/Filters";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { Link as ScrollLink } from "react-scroll";

const NavbarMobile = () => {
    //stato
    const location = useLocation();
    const history = useHistory();
    const [colorChange, setColorchange] = useState(
        location.pathname !== "/" || y >= 80
    );
    const [menuOpen, setMenuOpen] = useState(false);
    const [y, setY] = useState(window.scrollY);
    const [tabFocus, setTabFocus] = useState(0);
    const [scrollingDirection, setScrollingDirection] = useState("down");
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

    //Gestisce il focus sulle tab
    const addTabFocusHandler = (event) =>
        setTabFocus(parseInt(event.target.id.slice(-1)));

    //vede se sta scrollando verso l'alto o il basso e cambia il colore
    const handleNavigationAndColorChange = useCallback(
        (e) => {
            const window = e.currentTarget;
            if (y > window.scrollY) {
                setScrollingDirection("up");
            } else if (y < window.scrollY) {
                setScrollingDirection("down");
            }
            setY(window.scrollY);

            if (y >= 80 || location.pathname !== "/") {
                //solo nella home è inizialmente trasparente
                setColorchange(true);
            } else {
                setColorchange(false);
            }
        },
        [y]
    );

    //Effetti
    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigationAndColorChange);

        //rimuove il callback da window quando si fa unmount del componente
        return () => {
            window.removeEventListener(
                "scroll",
                handleNavigationAndColorChange
            );
        };
    }, [handleNavigationAndColorChange]);

    //animazione a "catena", prima apre il menu e poi rende lo sfondo con effetto glass, quando si chiude fa il contrario (a pila)
    useEffect(() => {
        if (menuOpen) {
            setTimeout(() => {
                document
                    .getElementById("menu-navbar-mobile-container")
                    ?.classList.remove("top-screen");
                document
                    .getElementById("menu-navbar-mobile-container")
                    ?.classList.add("top-0");
            }, 0);
            setTimeout(() => {
                document
                    .getElementById("menu-navbar-mobile-container")
                    ?.classList.add(
                        "bg-neutral",
                        "bg-opacity-20",
                        "backdrop-filter",
                        "backdrop-blur"
                    );
            }, 300);
        } else {
            setTimeout(() => {
                document
                    .getElementById("menu-navbar-mobile-container")
                    ?.classList.remove(
                        "bg-neutral",
                        "bg-opacity-20",
                        "backdrop-filter",
                        "backdrop-blur"
                    );
            }, 0);
            setTimeout(() => {
                document
                    .getElementById("menu-navbar-mobile-container")
                    ?.classList.remove("top-0");
                document
                    .getElementById("menu-navbar-mobile-container")
                    ?.classList.add("top-screen");
            }, 300);
        }
    }, [menuOpen]);

    //vieta lo scrolling sotto la modale se è aperta
    useEffect(() => {
        let containerId;
        location.pathname === "/"
            ? (containerId = "home-screen-container")
            : location.pathname === "/about"
            ? (containerId = "about-screen-container")
            : location.pathname === "/contest" 
            ? (containerId = "contest-screen-container")
            : location.pathname === "/trivia" 
            ? (containerId = "trivia-screen-container")
            : (containerId = "tweets-screen-container");

        if (menuOpen) {
            disableBodyScroll(document.getElementById(containerId));
        } else {
            enableBodyScroll(document.getElementById(containerId));
        }

        return () => {
            //pulisce gli scrolling quando si fa unmount
            clearAllBodyScrollLocks();
        };
    }, [menuOpen]);

    return (
        <div className={`relative ${menuOpen ? "z-30" : "z-20"}`}>
            <div
                className={`fixed ${
                    colorChange && scrollingDirection === "down"
                        ? "bottom-5"
                        : "-bottom-20"
                } right-5 transition-all duration-200 ease-linear "`}
            >
                <ScrollLink
                    activeClass="active"
                    to={`${
                        location.pathname === "/"
                            ? "home-screen-container"
                            : location.pathname === "/about"
                            ? "about-screen-container"
                            : location.pathname === "/contest" 
                            ? "contest-screen-container"
                            : location.pathname === "/trivia" 
                            ? "trivia-screen-container"
                            : "tweets-screen-container"
                    }`}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                >
                    <button className="btn btn-neutral btn-circle shadow-md">
                        <i className="bi bi-chevron-up text-neutral-content" />
                    </button>
                </ScrollLink>
            </div>

            <div
                className={`p-4 ${
                    !colorChange ? "bg-transparent" : "bg-neutral shadow-md"
                } fixed top-0 w-full transition-all duration-200 ease-linear`}
            >
                <button
                    className={`btn btn-natural btn-block ${
                        colorChange ? "border-base-100" : ""
                    } shadow-md rounded-full normal-case font-medium h-14`}
                    onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
                >
                    <i className="bi bi-search text-primary text-xl" /> &nbsp;
                    Cosa vuoi cercare?
                </button>
            </div>

            <div
                className={`fixed w-full bg-neutral text-neutral-content h-20 ${
                    scrollingDirection === "up" &&
                    y > 80 
                        ? "bottom-0 border-t border-base-300"
                        : "-bottom-20"
                } transition-all duration-200 ease-linear`}
            >
                <div className="flex justify-center gap-12 smartphone:gap-20 items-center h-full">
                    <div className="flex flex-col justify-center items-center">
                        <button className="btn btn-link">
                            <Link to="/">
                                <i
                                    className={`bi bi-house-door-fill text-2xl ${
                                        location.pathname === "/"
                                            ? ""
                                            : "text-neutral-content"
                                    }`}
                                />
                            </Link>
                        </button>

                        <span className="text-xs">Home</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button className="btn btn-link">
                            <Link to="/about">
                                <i
                                    className={`bi bi-info-circle-fill text-2xl ${
                                        location.pathname === "/about"
                                            ? ""
                                            : "text-neutral-content"
                                    }`}
                                />
                            </Link>
                        </button>
                        <span className="text-xs">Info</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <SwitchTheme />
                        <span className="text-xs">Tema</span>
                    </div>
                </div>
            </div>

            <div
                id="menu-navbar-mobile-container"
                className={`fixed overflow-auto top-screen h-screen w-full ${menuOpen ? "z-50" : ""} transition-all duration-300 ease-out`}
            >
                <div
                    style={{ minHeight: "calc(100% - 5rem)" }}
                    className="px-4 smartphone:px-8 py-8 top-20 w-full absolute rounded-t-3xl bg-base-100 text-base-content"
                >
                    <button
                        onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
                    >
                        <i className="bi bi-chevron-left text-xl" />
                    </button>

                    {width > 420 ? (
                        <div className="flex-1 mt-5">
                            <div className="tabs flex justify-center ">
                                {filters.map((filter, i) => (
                                    <a
                                    style={{maxWidth: "10rem"}}
                                        tabIndex="0"
                                        id={`navbar-tab-${i}`}
                                        className={`tab tab-bordered flex-1 ${
                                            tabFocus === i ? "tab-active" : ""
                                        }`}
                                        onFocus={addTabFocusHandler}
                                    >
                                        {filter}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="carousel flex mt-5">
                            {filters.map((filter, i) => (
                                <div class="carousel-item flex-1">
                                    <a
                                        tabIndex="0"
                                        id={`navbar-tab-${i}`}
                                        className={`tab tab-bordered flex-1 ${
                                            tabFocus === i ? "tab-active" : ""
                                        }`}
                                        onFocus={addTabFocusHandler}
                                    >
                                        {filter}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}

                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control mt-8">
                            <div class="relative w-full">
                            <input
                                    type="text"
                                    placeholder={`${tabFocus === 0 ? "Inserisci ciò che preferisci" : tabFocus === 1 ? "Inserisci un username come @Twitter" : tabFocus === 2 ? "Inserisci un hashtag come #politica" : "Inserisci un hashtag che termina con contestswe11 o triviaswe11"}`}
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
                                    className={`w-full pr-16 mt-5 h-14 input ${
                                        errors.userInputContest
                                            ? "input-error"
                                            : "input-primary"
                                    } shadow-md input-bordered rounded-full`}
                                />}
                                <label
                                    htmlFor="submit-search-btn"
                                    className={`absolute top-1 h-12 w-12 right-1 btn ${
                                        errors.userInput
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

export default NavbarMobile;
