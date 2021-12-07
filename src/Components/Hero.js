import React from 'react'
import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
    return (
        <div
        class="hero h-screen bg-fixed relative bg-cover bg-center bg-gradient-to-t"
        style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80")`,
            minHeight: "45rem",
        }}
    >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary via-transparent to-transparent"></div>
        <div class="hero-overlay h-full w-full bg-opacity-10"></div>
        <div class="px-8 smartphone:px-12 text-neutral-content relative -top-20 text-center laptop:text-left ipad:absolute ipad:top-1/2 ipad:height-40 ipad:transform ipad:-translate-y-1/2 ipad:left-20">
            <div>
                <h1 class="mb-5 ipad:mb-8 smartphone:text-5xl text-4xl font-bold">
                    Trova le tue tendenze
                </h1>
                <p class="mb-5 text-base max-w-lg">
                    <span className="font-bold">HI<span className="font-normal text-sm">TWEET</span> </span>
                    è il tuo client twitter che facilita e velocizza la tua ricerca.
                </p>

                <ScrollLink
                    activeClass="active"
                    to="home-main"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                >
                    <button className="btn btn-secondary">
                        Scopri di più
                    </button>
                </ScrollLink>
            </div>
        </div>
    </div>
    )
}

export default Hero
