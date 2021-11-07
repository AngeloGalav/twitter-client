//componenti
import SwitchTheme from "./SwitchTheme";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useWindowSize from "../Utils/windowSize";

const NavbarDesktop = () => {
    //stato
    const location = useLocation();
    const [colorChange, setColorchange] = useState(location.pathname !== "/");
    const [menuOpen, setMenuOpen] = useState(false);
    const [y, setY] = useState(window.scrollY);
    const [scrollingDirection, setScrollingDirection] = useState("down");
    const [tabFocus, setTabFocus] = useState(1);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    //hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

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
        <div className="relative z-10">
            <div
                className={`p-4 ${
                    !colorChange ? "bg-transparent" : "bg-neutral shadow-md"
                } fixed top-0 w-full transition-all duration-200 ease-linear`}
            >
                <div className="flex justify-between items-center container mx-auto">
                    <div>
                        <button className="w-56 btn btn-link text-base-content hover:no-underline">
                            <Link to="/">
                                <i className="bi bi-twitter text-4xl text-primary" />{" "}
                                <span className="text-2xl font-medium">
                                    {" "}
                                    &nbsp; Logo
                                </span>
                                <span className="text-2xl">Bold </span>
                            </Link>
                        </button>
                    </div>

                    {/* Un utente potrebbe selezionare prima un filtro principale ed effettuare una ricerca su questo (poi nella pagina dei tweets può fare sottofiltraggi) */}
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
                        <div className="flex-1 laptop:flex justify-center hidden">
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
                        </div>
                    )}

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
                </div>

                <div
                    className={`mx-auto max-w-2xl ${
                        !colorChange || searchBarOpen ? "container" : "hidden"
                    } justify-center`}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control mt-8">
                            <div class="relative w-full">
                                <input
                                    type="text"
                                    placeholder={`Qualcosa inerente al filtro ${"Main filter " + tabFocus} ...`}
                                    {...register("userInput", {
                                        required: true,
                                    })}
                                    className="w-full pr-16 h-14 input input-primary shadow-md input-bordered rounded-full"
                                />
                                <input
                                    class="absolute top-0 h-14 right-0 rounded-l-none btn btn-primary rounded-full"
                                    type="submit"
                                    value="Cerca"
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
