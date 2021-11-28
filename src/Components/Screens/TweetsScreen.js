//components
import TweetList from "../TweetList";
import NavbarMobile from "../NavbarMobile";
import NavbarDesktop from "../NavbarDesktop";
import useWindowSize from "../../Utils/windowSize";
import Loading from "../Loading";
import NavigationTab from "../NavigationTab";

//altro
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import UserMarker from "../UserMarker";
import FilterTab from "../FilterTab";
import { useLocation } from "react-router";

const TweetsScreen = () => {

    const location = useLocation();
    //stato
    const [risposta, setRisposta] = useState([]);
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("tweets");
    const [radius, setRadius] = useState(null);
    const [position, setPosition] = useState(null);
    const [newSearch, setNewSearch] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        endDate: new Date(),
    })
    const [popular, setPopular] = useState(false)

    useEffect(() => {
        // fuzione per reperire i dati dalla
        async function getData() {
            setNewSearch(false);
            setIsLoading(true);
            const { search } = window.location;
            console.log(search)
            const params =
                new URLSearchParams(search).toString() +
                "&" +
                new URLSearchParams({
                    radius: `${radius ? `${radius / 1000}` : null}`,
                    position: `${position ? `${position.lat},${position.lng}` : null}`,
                    startDate: selectionRange.startDate.toISOString().split("T")[0],
                    endDate: selectionRange.endDate.toISOString().split("T")[0],
                    popular: popular
                }).toString();
            if (!params) return;

            try {
                const { data } = await axios.get(`/api/${location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}?${params}`);
                console.log(data.statuses);
                setRisposta(data.statuses || []);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                setRisposta([]);
                setIsLoading(false);
            }
        }
        getData();
    }, [newSearch]);

    const handleChangeTab = (tab) => setSelectedTab(tab);

    // L'unico modo per prendere le coordiate lat long su click del mouse e' usando un componente figlio
    // Questa funzione gli viene passata per fargli aggiornare la posizione
    const handleChangePosition = (position) => setPosition(position);

    const handleChangeRadius = (radius) => setRadius(radius);

    const handleNewSearch = () => setNewSearch(true);
    
    const handleDateChange = (dateRange) => setSelectionRange(dateRange)

    const handlePopularChange= () => setPopular(popular => !popular);

    return (
        <div id="tweets-screen-container">
            {width < 768 ? <NavbarMobile /> : <NavbarDesktop />}
            <div className="pt-20 laptop:h-screen mx-auto">
                <div className="flex flex-col laptop:flex-row justify-center items-center h-full">
                    <div
                        style={{ minHeight: "30rem" }}
                        className="laptop:h-full w-full laptop:w-1/2 order-2 laptop:flex-row"
                    >
                        {!isLoading && (
                            <div
                                style={{ top: "5.5rem" }}
                                className="sticky left-0 w-full z-20 shadow-md"
                            >
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
                                <div className="pt-4 h-full">
                                        <FilterTab
                                            popular={popular}
                                            position={position}
                                            radius={radius}
                                            selectionRange={selectionRange}
                                            setPopular={handlePopularChange}
                                            setRadius={handleChangeRadius}
                                            setPosition={handleChangePosition}
                                            setNewSearch={handleNewSearch}
                                            setSelectionRange={handleDateChange}
                                        />
                                </div>
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

                            <UserMarker
                                position={position}
                                setPosition={handleChangePosition}
                            />

                            {radius && (
                                <Circle center={position} radius={radius} />
                            )}

                            <Marker position={[51.5, -0.09]}>
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
