import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider, { SliderTooltip } from 'rc-slider';
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
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
    const [address, setAddress] = useState("");

    useEffect(() => {
        const getAddress = async () => {
            try {
                const { data } = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${props.position.lat}&lon=${props.position.lng}`
                );
                console.log(data);
                setAddress(data.name || data.address?.road);
            } catch (error) {
                console.log(error.response);
            }
        };
        getAddress();
    }, [props.position]);

    const sliderChange = (value) => {
        if (value > 0) {
            props.setRadius(value * 1000)
        } else {
            props.setRadius(null)
        }
    };

    return (
        <div>
            <div>
                <h1>Posizione</h1>
                {props.position ? (
                    <p>
                        {address
                            ? address
                            : "Seleziona un indirizzo valido sulla mappa"}
                    </p>
                ) : (
                    <p>Seleziona un punto sulla mappa</p>
                )}
                <div className="h-96 smartphone:h-auto">
                    <Slider
                        min={0}
                        max={100}
                        onChange={sliderChange}
                        defaultValue={props.radius / 1000 || 0}
                        handle={handle}
                        disabled={!props.position}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterTab;
