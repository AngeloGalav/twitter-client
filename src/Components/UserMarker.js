import React, { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const UserMarker = (props) => {

    const map = useMapEvents({
        click(e) {
            props.setPosition(e.latlng);
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
            {props.position && (
                <Marker position={props.position} icon={icon}>
                    <Popup>
                        <div className="w-72">Questo sei tu</div>
                    </Popup>
                </Marker>
            )}
        </div>
    );
};

export default UserMarker;
