//components
import SwitchTheme from "./SwitchTheme";
import useWindowSize from "../Utils/windowSize";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const NavbarMobile = (props) => {
    //stato
    const location = useLocation();
    const [colorChange, setColorchange] = useState(location.pathname !== "/");
    const [menuOpen, setMenuOpen] = useState(false);
    const [y, setY] = useState(window.scrollY);
    const [tabFocus, setTabFocus] = useState(1);
    const [scrollingDirection, setScrollingDirection] = useState("down");
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    //hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {  //questa funzione e' quella che viene chiamata quando l'utente preme su cerca, data contiene l'input in data.userInput
      console.log(data);
      //per cambiare pagina usate l'hook useHistory() per prendere la funzione di react router dom che gestisce la history e fare un history.push(`/tweets/mainFilter${tabFocus}?data.userInput`)
    }

    /*Cambia il colore della navbar */
    const changeNavbarColor = () => {
        if (y >= 80 || location.pathname !== "/") {
            //solo nella home è inizialmente trasparente
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };

    //Gestisce il focus sulle tab
    const addTabFocusHandler = (event) =>
        setTabFocus(parseInt(event.target.id.slice(-1)));

    //vede se sta scrollando verso l'alto o il basso
    const handleNavigation = useCallback(
      e => {
        const window = e.currentTarget;
        if (y > window.scrollY) {
          setScrollingDirection("up")
        } else if (y < window.scrollY) {
          setScrollingDirection("down")
        }
        setY(window.scrollY);
      }, [y]
    );

    //Effetti
    useEffect(() => {
      setY(window.scrollY);
      window.addEventListener("scroll", handleNavigation);
      window.addEventListener("scroll", changeNavbarColor);

      //rimuove il callback da window quando si fa unmount del componente
      return () => {
        window.removeEventListener("scroll", handleNavigation);
        window.removeEventListener("scroll", changeNavbarColor);
      };
    }, [handleNavigation, changeNavbarColor]);

    //animazione a "catena", prima apre il menu e poi rende lo sfondo con effetto glass, quando si chiude fa il contrario (a pila)
    useEffect(() => {
        if (menuOpen) {
            setTimeout(() => {
                document.getElementById("menu-navbar-mobile-container")?.classList.remove("top-screen");
                document.getElementById("menu-navbar-mobile-container")?.classList.add("top-0");
            }, 0);
            setTimeout(() =>{
                document.getElementById("menu-navbar-mobile-container")?.classList.add("bg-neutral", "bg-opacity-20", "backdrop-filter", "backdrop-blur");
            }, 300);
        } else {
            setTimeout(() =>{
                document.getElementById("menu-navbar-mobile-container")?.classList.remove("bg-neutral", "bg-opacity-20", "backdrop-filter", "backdrop-blur");
            }, 0);
            setTimeout(() => {
                document.getElementById("menu-navbar-mobile-container")?.classList.remove("top-0");
                document.getElementById("menu-navbar-mobile-container")?.classList.add("top-screen");
            }, 300);
        }
    }, [menuOpen]);

    //vieta lo scrolling sotto la modale se è aperta
    useEffect(() => {
        let containerId;
        location.pathname === "/" ? containerId = "home-screen-container" : location.pathname === "/about" ? containerId = "about-screen-container" : containerId = "tweets-screen-container";

        if (menuOpen) {
            disableBodyScroll(document.getElementById(containerId));
        } else {
            enableBodyScroll(document.getElementById(containerId));
        }

        return () => {
            //pulisce gli scrolling quando si fa unmount
            clearAllBodyScrollLocks();
        }

    }, [menuOpen]);

    return (
        <div className="relative z-20">
            <div
                className={`p-4 ${
                    !colorChange ? "bg-transparent" : "bg-neutral shadow-md"
                } fixed top-0 w-full transition-all duration-200 ease-linear`}
            >
                <button
                    className={`btn btn-natural btn-block ${colorChange ? "border-base-100" : ""} shadow-md rounded-full normal-case font-medium h-14`}
                    onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
                >
                    <i className="bi bi-search text-primary text-xl" /> &nbsp;
                    Cosa vuoi cercare?
                </button>
            </div>

            <div className={`fixed w-full bg-neutral text-neutral-content h-20 ${scrollingDirection === "up" && (y > 80 || location.pathname !== "/") ? "bottom-0 border-t border-base-300" : '-bottom-20'} transition-all duration-200 ease-linear`}>
                <div className="flex justify-center gap-12 smartphone:gap-20 items-center h-full">
                  <div className="flex flex-col justify-center items-center">
                  <button className="btn btn-link">
                  <Link to="/"><i className={`bi bi-house-door-fill text-2xl ${location.pathname === "/" ? "" : "text-neutral-content"}`} /></Link>
                  </button>

                    <span className="text-xs">Home</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                  <button className="btn btn-link">
                    <Link to="/about"><i className={`bi bi-info-circle-fill text-2xl ${location.pathname === "/about" ? "" : "text-neutral-content"}`} /></Link>

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
                className="fixed overflow-auto top-screen h-screen w-full z-30 transition-all duration-300 ease-out"
            >
                <div style={{minHeight: "calc(100% - 5rem)"}} className=" px-4 smartphone:px-8 py-8 top-20 w-full absolute rounded-t-3xl bg-base-100 text-base-content">
                    <button
                        onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
                    >
                        <i className="bi bi-chevron-left text-xl" />
                    </button>

                    { width > 400 ? (<div className="flex-1 flex justify-center mt-5">
                        <div className="tabs">
                            <a
                                tabIndex="0"
                                id="navbar-tab-1"
                                className={`tab tab-bordered ${
                                    tabFocus === 1 ? "tab-active" : ""
                                }`}
                                onFocus={addTabFocusHandler}
                            >
                                Main filter 1
                            </a>
                            <a
                                tabIndex="0"
                                id="navbar-tab-2"
                                className={`tab tab-bordered ${
                                    tabFocus === 2 ? "tab-active" : ""
                                }`}
                                onFocus={addTabFocusHandler}
                            >
                                Main filter 2
                            </a>
                            <a
                                tabIndex="0"
                                id="navbar-tab-3"
                                className={`tab tab-bordered ${
                                    tabFocus === 3 ? "tab-active" : ""
                                }`}
                                onFocus={addTabFocusHandler}
                            >
                                Main filter 3
                            </a>
                        </div>
                    </div>) : (<div class="carousel rounded-box">
                    <div class="carousel-item">
                      <a
                          tabIndex="0"
                          id="navbar-tab-1"
                          className={`tab tab-bordered ${
                              tabFocus === 1 ? "tab-active" : ""
                          }`}
                          onFocus={addTabFocusHandler}
                      >
                          Main filter 1
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a
                          tabIndex="0"
                          id="navbar-tab-2"
                          className={`tab tab-bordered ${
                              tabFocus === 2 ? "tab-active" : ""
                          }`}
                          onFocus={addTabFocusHandler}
                      >
                          Main filter 2
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a
                          tabIndex="0"
                          id="navbar-tab-3"
                          className={`tab tab-bordered ${
                              tabFocus === 3 ? "tab-active" : ""
                          }`}
                          onFocus={addTabFocusHandler}
                      >
                          Main filter 3
                      </a>
                    </div>
                  </div>)}



                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control mt-8">
                            <div class="relative w-full">
                                <input
                                    type="text"
                                    placeholder={`Qualcosa inerente al filtro ${"Main filter " + tabFocus} ...`}
                                    {...register("userInput", {
                                        required: true,
                                    })}
                                    className={`w-full pr-16 text h-14 input ${errors.userInput ? "input-error" : "input-primary"} shadow-md input-bordered rounded-full`}
                                />
                                <label htmlFor="submit-search-btn"
                                className={`absolute top-1 h-12 w-12 right-1 btn ${errors.userInput ? "btn-error" : "btn-primary"} rounded-full`}
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
