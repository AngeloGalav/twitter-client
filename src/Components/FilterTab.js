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

    const [address, setAddress] = useState(null);

    //trasforma [lat, lng] in un indirizzo leggibile
    useEffect(() => {
        const getAddress = async () => {
            try {
                const { data } = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${props.position.lat}&lon=${props.position.lng}`
                );
                console.log(data);
                setAddress({
                    city: data.address.city || data.address.village,
                    road: data.address?.road || data.name,
                    state: data.address.country,
                    postcode: data.address.postcode,
                });
            } catch (error) {
                console.log(error.response);
            }
        };
        getAddress();
    }, [props.position]);

    const sliderChange = (value) => {
        if (value > 0) {
            props.setRadius(value * 1000);
        } else {
            props.setRadius(null);
        }
    };

    const handleDateSelect = (ranges) => {
        const newDate = {
            startDate: new Date(ranges.startDate),
            endDate: new Date(ranges.endDate),
        };
        props.setSelectionRange(newDate);
    };

    return (
        <div className="h-full noScrollBar laptop:overflow-y-auto">
            <div>
                <div>
                    <h1 className="text-center text-2xl font-semibold">
                        Filtri
                    </h1>
                    <div className="w-full h-px bg-base-content bg-opacity-50 mt-2" />
                </div>

                <div className="mt-8">
                    <div className="px-4">
                        <h2 className="text-3xl font-bold">Posizione</h2>
                        {props.position && (
                            <div>
                                <p className="text-sm mt-2">
                                    Cambia la posizione posizionando l'omino
                                    sulla mappa dove preferisci
                                </p>
                                <div className="flex mt-2 justify-between items-center border rounded-md px-4 py-2 relative">
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
                                            {props.position?.lat},{" "}
                                            {props.position?.lng}
                                        </p>
                                    </div>
                                    <div className="absolute right-0 top-0 mr-2 mt-2">
                                        <button
                                            className="btn btn-error btn-circle btn-sm"
                                            type="button"
                                            onClick={() =>
                                                props.setPosition(null)
                                            }
                                        >
                                            <i className="bi bi-x-lg text-white"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!props.position && (
                            <div className="mt-2">
                                <div>
                                    <span>
                                        Prova a cliccare su un punto sulla mappa per
                                        selezionare una posizione.
                                    </span>
                                </div>
                            </div>
                        )}
                        {props.position && (
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
                                        defaultValue={props.radius / 1000 || 0}
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
                                value={props.selectionRange.startDate}
                                onChange={(value) =>
                                    props.setSelectionRange({
                                        startDate: new Date(
                                            new Date(value).setHours(0, 0, 0)
                                        ),
                                        endDate: props.selectionRange.endDate,
                                    })
                                }
                                minDate={
                                    new Date(
                                        new Date().setDate(
                                            new Date().getDate() - 7
                                        )
                                    )
                                }
                                maxDate={props.selectionRange.endDate}
                                animateYearScrolling
                            />

                            <DatePicker
                                className={`${
                                    user.theme === "dark"
                                        ? "filter invert"
                                        : "filter invert-0"
                                }`}
                                label="A"
                                value={props.selectionRange.endDate}
                                onChange={(value) =>
                                    props.setSelectionRange({
                                        startDate:
                                            props.selectionRange.startDate,
                                        endDate: new Date(
                                            new Date(value).setHours(23, 59, 59)
                                        ),
                                    })
                                }
                                minDate={props.selectionRange.startDate}
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
                                onChange={() => props.setPopular()}
                                checked={props.popular}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor="#1DA1F2"
                            />
                        </div>
                    </div>

                    <div className="px-4 my-20">
                        <button
                            onClick={() => props.setNewSearch()}
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
