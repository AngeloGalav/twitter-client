//components
import SwitchTheme from "./SwitchTheme";


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
    const [scrollingDirection, setScrollingDirection] = useState("down");

    //hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    /*Cambia il colore della navbar */
    const changeNavbarColor = () => {
        if (y >= 80 || location.pathname !== "/") {
            //solo nella home è inizialmente trasparente
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };

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
        <div className="relative z-10">
            <div
                className={`p-4 ${
                    !colorChange ? "bg-transparent" : "bg-neutral shadow-md"
                } fixed top-0 w-full transition-all duration-200 ease-linear`}
            >
                <button
                    className={`btn btn-natural btn-block ${colorChange ? "border-base-100 shadow-md" : ""} rounded-full normal-case font-medium h-14`}
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
                className="fixed overflow-auto top-screen h-screen w-full z-20 transition-all duration-300 ease-out"
            >
                <div className=" px-4 smartphone:px-8 py-8 h-full relative top-20 rounded-t-3xl bg-base-100 text-base-content">
                    <button
                        onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
                    >
                        <i className="bi bi-chevron-left text-xl" />
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control mt-8">
                            <div class="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Lucca Comics 2021/2022"
                                    {...register("userInput", {
                                        required: true,
                                    })}
                                    className="w-full pr-16 h-14 input input-primary input-bordered rounded-full"
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

export default NavbarMobile;
