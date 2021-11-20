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
import NavigationTab from "../NavigationTab";

const TweetsScreen = () => {
    //stato
    const [risposta, setRisposta] = useState(null);
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("tweets");

    useEffect(() => {
        // fuzione per reperire i dati dalla
        async function getData() {
            setIsLoading(true);
            const { search } = window.location;
            const params = new URLSearchParams(search).toString();
            console.log("ecco: " + params);
            if (!params) return;

            try {
                const { data } = await axios.get("/api?" + params);
                console.log(data.statuses);
                setRisposta(data.statuses);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                setRisposta(null);
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    const handleChangeTab = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div id="tweets-screen-container">
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
            <div className="pt-20 laptop:h-screen mx-auto">
                <div className="flex flex-col laptop:flex-row justify-center items-center h-full">

                    <div style={{minHeight: "30rem"}} className="laptop:h-full w-full laptop:w-1/2 order-2 laptop:flex-row">
                        {!isLoading && (
                            <div style={{top: "5.5rem"}} className="sticky left-0 w-full z-20 shadow-md">
                                <div className="flex items-center justify-center w-full bg-neutral px-8">
                                    <div class="tabs h-14 rounded-none w-full flex justify-center">
                                        <NavigationTab
                                            icon={"bi-card-list"}
                                            selectedTab={selectedTab}
                                            setSelectedTab={handleChangeTab}
                                            tab="tweets"
                                        />

                                        <NavigationTab
                                            icon={"bi-graph-up"}
                                            selectedTab={selectedTab}
                                            setSelectedTab={handleChangeTab}
                                            tab="stats"
                                        />

                                        <NavigationTab
                                            icon={"bi-filter"}
                                            selectedTab={selectedTab}
                                            setSelectedTab={handleChangeTab}
                                            tab="filters"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div
                            style={{
                                height: `${
                                    width > 1023
                                        ? "calc(100% - 3.5rem)" //uguale a 100% - altezza div recedente
                                        : "auto"
                                }`,
                            }}
                            className="max-w-3xl mx-auto w-full"
                        >
                            {/* A lui vanno passati i tweet con qualcosa tipo tweets={fetchedData} */}
                            {isLoading ? (
                                <Loading />
                            ) : selectedTab === "tweets" ? (
                                <div className="pt-4 h-full">
                                <TweetList tweets={risposta} />
                                </div>
                                
                            ) : selectedTab === "stats" ? (
                                <div>Statistiche</div>
                            ) : (
                                <div>Filtri</div>
                            )}
                        </div>
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
