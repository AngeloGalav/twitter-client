import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { DatePicker } from "@material-ui/pickers";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const { createSliderWithTooltip } = Slider;
const { Handle } = Slider;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <SliderTooltip
            prefixCls="rc-slider-tooltip"
            overlay={value > 0 ? `${value}Km` : "∞"}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </SliderTooltip>
    );
};

const FilterTab = (props) => {
    //redux stuff
    const user = useSelector((state) => state.userReducer); //in questo modo stiamo prendendo le informazioni nello stato relative all'user
    const dispatch = useDispatch(); //il dispatch ci permette di inviare un'azione al reducer

    const {
        radius,
        position,
        //newSearch,
        selectionRange,
        popular,
        onlyItalian,
        streaming,
    } = useSelector((state) => state.filterReducer);

    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //trasforma [lat, lng] in un indirizzo leggibile
    useEffect(() => {
        const getAddress = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`
                );
                setAddress({
                    city: data.address.city || data.address.village,
                    road: data.address?.road || data.name,
                    state: data.address.country,
                    postcode: data.address.postcode,
                });
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error.response);
            }
        };
        getAddress();
    }, [position]);

    const sliderChange = (value) => {
        if (value > 0) {
            //props.setRadius(value * 1000);
            dispatch({
                type: "CHANGE_RADIUS",
                payload: {
                    radius: value * 1000,
                },
            });
        } else {
            //props.setRadius(null);
            dispatch({
                type: "CHANGE_RADIUS",
                payload: {
                    radius: null,
                },
            });
        }
    };

    const handleDateSelect = (ranges) => {
        const newDate = {
            startDate: new Date(ranges.startDate),
            endDate: new Date(ranges.endDate),
        };
        //props.setSelectionRange(newDate);

        dispatch({
            type: "CHANGE_SELECTION_RANGE",
            payload: {
                selectionRange: newDate,
            },
        });
    };

    return (
        <div className="h-full noScrollBar laptop:overflow-y-auto">
            <div className="mt-8">
                <div>
                    <h1 className="text-center text-2xl font-semibold">
                        Filtri
                    </h1>
                    <div className="w-full h-px bg-base-content bg-opacity-50 mt-2" />
                </div>

                <div className="mt-8">
                    <div className="px-4">
                        <h2 className="text-3xl font-bold">Posizione</h2>
                        {position && (
                            <div>
                                <p className="text-sm mt-2">
                                    Cambia la posizione posizionando l'omino
                                    sulla mappa dove preferisci
                                </p>
                                <div className="flex mt-2 justify-between items-center border rounded-md px-4 py-2 relative">
                                    {!isLoading ? (
                                        <div className="w-full">
                                            {address?.road && (
                                                <h3 className="font-semibold">
                                                    {address?.road}
                                                </h3>
                                            )}
                                            <p className="text-sm my-2">
                                                {address?.postcode
                                                    ? address?.postcode + ", "
                                                    : ""}
                                                {address?.city
                                                    ? address?.city + ", "
                                                    : ""}{" "}
                                                {address?.state}
                                            </p>
                                            <p className="text-sm opacity-75 font-light my-2 truncate">
                                                {position?.lat}, {position?.lng}
                                            </p>
                                        </div>
                                    ) : (
                                        <div
                                            style={{ minHeight: "5rem" }}
                                            className="flex justify-center items-center"
                                        >
                                            <svg
                                                fill="none"
                                                class="w-6 h-6 animate-spin"
                                                viewBox="0 0 32 32"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    clip-rule="evenodd"
                                                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                                                    fill="currentColor"
                                                    fill-rule="evenodd"
                                                />
                                            </svg>
                                            <p className="text-sm">
                                                Caricamento posizione ...
                                            </p>
                                        </div>
                                    )}
                                    <div className="absolute right-0 top-0 mr-2 mt-2">
                                        <button
                                            className="btn btn-error btn-circle btn-sm"
                                            type="button"
                                            onClick={
                                                () => {
                                                    dispatch({
                                                        type: "CHANGE_RADIUS",
                                                        payload: {
                                                            radius: null,
                                                        },
                                                    })
                                                    dispatch({
                                                        type: "CHANGE_POSITION",
                                                        payload: {
                                                            position: null,
                                                        },
                                                    })
                                                }
                                                //props.setPosition(null)
                                            }
                                        >
                                            <i className="bi bi-x-lg text-white"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!position && (
                            <div className="mt-2">
                                <div>
                                    <span>
                                        Prova a cliccare su un punto sulla mappa
                                        per selezionare una posizione.
                                    </span>
                                </div>
                            </div>
                        )}
                        {position && (
                            <div className="mt-2">
                                <h3 className="font-medium">Raggio</h3>
                                <p className="text-sm">
                                    Seleziona un raggio attorno alla tua
                                    posizione entro cui cercare i Tweet
                                </p>
                                <div className="mt-2">
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={0.1}
                                        onChange={sliderChange}
                                        defaultValue={radius / 1000 || 0}
                                        handle={handle}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full h-px bg-base-content bg-opacity-50 mt-8" />

                    <div className="mt-8 px-4">
                        <h2 className="text-3xl font-bold">Data</h2>
                        <p className="text-sm mt-2">
                            Scegli che fetta dell'ultima settimana ti interessa
                        </p>
                        <div className="mt-4 relative flex gap-4">
                            <DatePicker
                                className={`${
                                    user.theme === "dark"
                                        ? "filter invert"
                                        : "filter invert-0"
                                }`}
                                label="Da"
                                value={selectionRange.startDate}
                                onChange={
                                    (value) =>
                                        dispatch({
                                            type: "CHANGE_DATE",
                                            payload: {
                                                selectionRange: {
                                                    startDate: new Date(
                                                        new Date(
                                                            value
                                                        ).setHours(0, 0, 0)
                                                    ),
                                                    endDate:
                                                        selectionRange.endDate,
                                                },
                                            },
                                        })
                                    /*
                                    props.setSelectionRange({
                                        startDate: new Date(
                                            new Date(value).setHours(0, 0, 0)
                                        ),
                                        endDate: props.selectionRange.endDate,
                                    })*/
                                }
                                minDate={
                                    new Date(
                                        new Date().setDate(
                                            new Date().getDate() - 7
                                        )
                                    )
                                }
                                maxDate={selectionRange.endDate}
                                animateYearScrolling
                            />

                            <DatePicker
                                className={`${
                                    user.theme === "dark"
                                        ? "filter invert"
                                        : "filter invert-0"
                                }`}
                                label="A"
                                value={selectionRange.endDate}
                                onChange={
                                    (value) =>
                                        dispatch({
                                            type: "CHANGE_DATE",
                                            payload: {
                                                selectionRange: {
                                                    startDate:
                                                        selectionRange.startDate,
                                                    endDate: new Date(
                                                        new Date(
                                                            value
                                                        ).setHours(23, 59, 59)
                                                    ),
                                                },
                                            },
                                        })
                                    // props.setSelectionRange({
                                    //     startDate:
                                    //         props.selectionRange.startDate,
                                    //     endDate: new Date(
                                    //         new Date(value).setHours(23, 59, 59)
                                    //     ),
                                    // })

                                    //                                             type: "CHANGE_DATE",
                                    //         payload: {selectionRange: {startDate: new Date(
                                    //             new Date(value).setHours(0, 0, 0)
                                    //         ),
                                    //         endDate: selectionRange.endDate,}}
                                    //     })
                                }
                                minDate={selectionRange.startDate}
                                maxDate={new Date()}
                                animateYearScrolling
                            />
                        </div>
                    </div>

                    <div className="w-full h-px bg-base-content bg-opacity-50 mt-8" />

                    <div className="mt-8 px-4 flex justify-between items-center gap-10">
                        <div>
                            <h3 className="text-xl font-bold">Solo popolari</h3>
                            <p className="text-sm mt-2">
                                Scegli se visualizzare solo tweets popolari
                            </p>
                        </div>
                        <div>
                            <Switch
                                onChange={() =>
                                    dispatch({
                                        type: "CHANGE_POPULAR",
                                        payload: { popular: !popular },
                                    })
                                }
                                checked={popular}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor="#1DA1F2"
                            />
                        </div>
                    </div>

                    <div className="mt-8 px-4 flex justify-between items-center gap-10">
                        <div>
                            <h3 className="text-xl font-bold">
                                Lingua italiana
                            </h3>
                            <p className="text-sm mt-2">
                                Scegli se visualizzare solo tweets in lingua
                                italiana
                            </p>
                        </div>
                        <div>
                            <Switch
                                onChange={() =>
                                    dispatch({
                                        type: "CHANGE_ONLY_ITALIAN",
                                        payload: { onlyItalian: !onlyItalian },
                                    })
                                }
                                checked={onlyItalian}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor="#1DA1F2"
                            />
                        </div>
                    </div>

                    <div className="mt-8 px-4 flex justify-between items-center gap-10">
                        <div>
                            <h3 className="text-xl font-bold">
                                Streaming
                            </h3>
                            <p className="text-sm mt-2">
                                Scegli se ricevere tweet in tempo reale inerenti alla tua ricerca
                            </p>
                        </div>
                        <div>
                            <Switch
                                onChange={() =>
                                    dispatch({
                                        type: "CHANGE_STREAMING",
                                        payload: { streaming: !streaming },
                                    })
                                }
                                checked={streaming}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor="#1DA1F2"
                            />
                        </div>
                    </div>

                    <div className="px-4 my-20">
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "CHANGE_NEW_SEARCH",
                                    payload: { newSearch: true },
                                })
                            }
                            className="btn btn-secondary btn-block"
                        >
                            Filtra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterTab;
