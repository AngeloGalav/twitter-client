import React, { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

const UserMarker = (props) => {

    const {
        position,
    } = useSelector((state) => state.filterReducer);
    const dispatch = useDispatch();

    const map = useMapEvents({
        click(e) {
            dispatch({
                type: "CHANGE_POSITION",
                payload: {
                    position: e.latlng
                }
            })
            //props.setPosition(e.latlng);
        },
    });
    const icon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854859.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60],
    });

    return (
        <div>
            {position && (
                <Marker position={position} icon={icon}>
                    <Popup>
                        <div className="w-72">Questo sei tu</div>
                    </Popup>
                </Marker>
            )}
        </div>
    );
};

export default UserMarker;
