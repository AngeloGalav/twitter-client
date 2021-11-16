//components
import TweetList from "../TweetList";
import NavbarMobile from "../NavbarMobile";
import NavbarDesktop from "../NavbarDesktop";
import useWindowSize from "../../Utils/windowSize";
import Loading from "../Loading";

//altro
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";


const TweetsScreen = () => {
    //stato
    const [primaRisposta, setRisposta] = useState(
        <i>Cerca qualcosa per iniziare!</i>
    );
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [isLoading, setIsLoading] = useState(true);

    function getData() {
        const { search } = window.location;
        const params = new URLSearchParams(search).toString();
        if (!params) return;
        axios
            .get("/api?" + params)
            .then((response) => {
                console.log(response);
                setRisposta(response.data);
            })
            .catch((error) => console.log(error.message));
    }

    useEffect(() => getData(), []);

    //simula un loading, va rimpiazzato con il vero await
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div id="tweets-screen-container">
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
            <div className="pt-20 laptop:h-screen mx-auto">
                <div className="flex flex-col laptop:flex-row justify-center items-center h-full">
                    <div className="laptop:h-full laptop:w-1/2 order-2 max-w-3xl mx-auto laptop:flex-row">
                        {/* A lui vanno passati i tweet con qualcosa tipo tweets={fetchedData} */}
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <TweetList />
                        )}
                    </div>

                    <div className="h-64 laptop:h-full w-full laptop:w-1/2 z-0 order-1 laptop:order-2">
                        <MapContainer
                            className="w-full h-full"
                            center={[51.505, -0.09]}
                            zoom={13}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                    <div className="w-72">Ciao</div>
                                </Popup>
                            </Marker>

                            <Marker position={[51.535, -0.0902]}>
                                <Popup>
                                    <div className="w-72">Ciao</div>
                                </Popup>
                            </Marker>

                            <Marker position={[51.55, -0.0908]}>
                                <Popup>
                                    <div className="w-72">Ciao</div>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetsScreen;
