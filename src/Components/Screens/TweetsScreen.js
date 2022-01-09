//components
import TweetList from "../TweetList";
import Navbar from "../Navbar";
import useWindowSize from "../../Utils/windowSize";
import Loading from "../Loading";
import NavigationTab from "../NavigationTab";
import StatisticTab from "../StatisticTab";
import UserMarker from "../UserMarker";
import FilterTab from "../FilterTab";

//actions
import { getTweetsAction } from "../../Actions/tweetActions";

//altro
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ChangeView from "../ChangeView";
import { useDispatch, useSelector } from "react-redux";
import MarkerClusterGroup from "react-leaflet-markercluster";
import socketIOClient from "socket.io-client";
import axios from "axios";
import StreamingTab from "../StreamingTab";

const TweetsScreen = () => {

    const location = useLocation();

    //redux stuff
    const { statuses, isLoading, wordCloud, sentimentAnalysis, coordinates } = useSelector((state) => state.tweetReducer);
    const {
        radius,
        position,
        newSearch,
        selectionRange,
        popular,
        onlyItalian,
        streaming,
        twitterMode,
        tweetCount,
    } = useSelector((state) => state.filterReducer);
    const dispatch = useDispatch();

    //stato
    // eslint-disable-next-line
    const [width, height] = useWindowSize();
    const [selectedTab, setSelectedTab] = useState("tweets");
    const [mapLarge, setMapLarge] = useState(true);
    const [center, setCenter] = useState([41.9109, 12.4818]);
    const [socketId, setSocketId] = useState(null);


    useEffect(() => {
        const socket = socketIOClient('/');
        socket.on('connect', () => {
            setSocketId(socket.id)
            socket.on("tweets", data => {
                 dispatch({type: "UPDATE_STREAM", payload: {tweet: data}})
            });
          });
          socket.on('disconnect', () => {
            socket.off("tweets")
            socket.removeAllListeners("tweets");
          });
        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        if (!socketId || isLoading) {
            return
        }
        const { search } = window.location;
        handleStreaming(search.split("=")[1])
    }, [socketId, isLoading])

    const handleStreaming = async keyword => {
        if (!streaming) {
            axios.post("/api/pause", {socketId});
        } else {
            let filter = {};
            dispatch({type: "EMPTY_STREAM"})
            const endPoint = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
            if (endPoint === "Keyword") {
                filter.track = keyword;
            } else if (endPoint === "Hashtag") {
                filter.track = "#" + keyword;
            } else {
                filter.follow = "@" + keyword;
            }

            if (onlyItalian) {
                filter.language = "it";
            }

            try {
                await axios.post("/api/setFilter", {filter, socketId});
                await axios.post("/api/resume", {socketId});
            } catch (error) {
                console.log(error.response.data.error)
            }
            
        }
    }

    useEffect(() => {
        const { search } = window.location;
        const params =
            new URLSearchParams(search).toString() +
            "&" +
            new URLSearchParams({
                radius: `${radius ? `${radius / 1000}` : null}`,
                position: `${position ? `${position.lat},${position.lng}` : null
                    }`,
                startDate: selectionRange.startDate.toISOString().split("T")[0],
                endDate: selectionRange.endDate.toISOString().split("T")[0],
                popular: popular,
                onlyItalian: onlyItalian,
                genStats: !twitterMode,
                tweetCount: tweetCount
            }).toString();

        dispatch(getTweetsAction(params, location))

    }, [newSearch]);

    useEffect(() => {
        statuses.forEach((tweet) => {
            if (tweet.place) {
                setCenter([
                    tweet.place?.bounding_box.coordinates[0][0][1],
                    tweet.place?.bounding_box.coordinates[0][0][0],
                ]);
            }
        });
    }, [statuses]);

    //trucchetto per far renderizzare tutta la mappa
    useEffect(() => setMapLarge(false), []);

    const handleChangeTab = (tab) => setSelectedTab(tab);
    const handleChangeCenter = (center) => setCenter(center);

    return (
        <div id="tweets-screen-container">
            {/* Navbar */}
            <Navbar width={width} />

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
                                    <div class="tabs h-14 rounded-none w-full flex flex-nowrap justify-center">
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

                                        <NavigationTab
                                            icon={"bi-broadcast"}
                                            selectedTab={selectedTab}
                                            setSelectedTab={handleChangeTab}
                                            tab="streaming"
                                        >
                                            {streaming && <span className="animate-ping absolute right-0 top-0 rounded-full w-1 h-1 bg-red-500"></span>}

                                            </NavigationTab>
                                        
                                    </div>
                                </div>
                            </div>
                        )}

                        <div
                            style={{
                                height: `${width > 1023
                                        ? "calc(100% - 3.5rem)" //uguale a 100% - altezza div precedente
                                        : "auto"
                                    }`,
                            }}
                            className="max-w-3xl mx-auto w-full"
                        >
                            {/* A lui vanno passati i tweet con qualcosa tipo tweets={fetchedData} */}
                            {isLoading ? (
                                <Loading />
                            ) : selectedTab === "tweets" ? (
                                <div className="h-full">
                                    <TweetList
                                        setCenter={handleChangeCenter}
                                    />
                                </div>
                            ) : selectedTab === "stats" ? (
                                <div className="h-full">
                                    <StatisticTab
                                        wordCloud={wordCloud}
                                        sentimentAnalysis={sentimentAnalysis}
                                        found={statuses.length > 0 && !twitterMode}
                                    />
                                </div>
                            ) : selectedTab === "filters" ? (
                                <div className="h-full">
                                    <FilterTab
                                    />
                                </div>
                            ) : (<div className="h-full">
                                    <StreamingTab
                                    />
                                </div>)}
                        </div>
                    </div>

                    <div
                        className={`${mapLarge && width < 1024 ? "h-screen-5rem" : "h-64"
                            } laptop:h-full w-full laptop:w-1/2 z-0 order-1 laptop:order-2 relative flex justify-center transition-all duration-200 ease-linear`}
                    >
                        <button
                            style={{ zIndex: "9999" }}
                            onClick={() => setMapLarge((mapLarge) => !mapLarge)}
                            className={`btn btn-secondary absolute laptop:hidden btn-xs ${mapLarge ? "bottom-16" : "bottom-4"} shadow-md`}
                        >
                            {mapLarge ? "Riduci" : "Espandi"} &nbsp;{" "}
                            <i class="bi bi-map"></i>
                        </button>
                        <MapContainer
                            className="w-full h-full"
                            center={center}
                            zoom={13}
                            scrollWheelZoom={true}
                        >
                            <ChangeView center={center} zoom={13} />
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <UserMarker
                            />

                            {radius && (
                                <Circle center={position} radius={radius} />
                            )}

                            {coordinates && (
                                <>
                                    {Object.keys(coordinates).map(
                                        (coordinate, i) => (
                                            <MarkerClusterGroup>
                                                {Array(
                                                    coordinates[
                                                        coordinate.split(",")
                                                    ].value
                                                )
                                                    .fill(0)
                                                    .map((_, i) => (
                                                        <Marker
                                                            position={coordinate.split(
                                                                ","
                                                            )}
                                                        >
                                                            <Popup>
                                                                <div>
                                                                    <div class="flex items-center">
                                                                        {/* Proile image */}
                                                                        <div className="h-14 w-14 rounded-full overflow-hidden">
                                                                            <img
                                                                                className="w-full h-full bg-cover bg-center"
                                                                                src={
                                                                                    statuses[
                                                                                        coordinates[
                                                                                            coordinate.split(
                                                                                                ","
                                                                                            )
                                                                                        ]
                                                                                            .index[
                                                                                        i
                                                                                        ]
                                                                                    ]
                                                                                        .user
                                                                                        .profile_image_url ||
                                                                                    "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                                                                                }
                                                                            />
                                                                        </div>

                                                                        {/* Profile name */}
                                                                        <div class="ml-1.5 text-sm leading-tight">
                                                                            <p
                                                                                style={{
                                                                                    margin: "0",
                                                                                    maxWidth: "10rem"
                                                                                }}
                                                                                class="font-bold block truncate"
                                                                            >
                                                                                {
                                                                                    statuses[
                                                                                        coordinates[
                                                                                            coordinate.split(
                                                                                                ","
                                                                                            )
                                                                                        ]
                                                                                            .index[
                                                                                        i
                                                                                        ]
                                                                                    ]
                                                                                        .user
                                                                                        .name
                                                                                }
                                                                            </p>
                                                                            <span class="text-opacity-50 font-normal text-sm block">
                                                                                @
                                                                                {
                                                                                    statuses[
                                                                                        coordinates[
                                                                                            coordinate.split(
                                                                                                ","
                                                                                            )
                                                                                        ]
                                                                                            .index[
                                                                                        i
                                                                                        ]
                                                                                    ]
                                                                                        .user
                                                                                        .screen_name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <p
                                                                        style={{
                                                                            marginTop: "1rem",
                                                                        }}
                                                                    >
                                                                        {
                                                                            statuses[
                                                                                coordinates[
                                                                                    coordinate.split(
                                                                                        ","
                                                                                    )
                                                                                ]
                                                                                    .index[
                                                                                i
                                                                                ]
                                                                            ]
                                                                                .full_text
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Popup>
                                                        </Marker>
                                                    ))}
                                            </MarkerClusterGroup>
                                        )
                                    )}
                                </>
                            )}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetsScreen;
