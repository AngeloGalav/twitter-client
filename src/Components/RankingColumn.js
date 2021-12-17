import React from "react";

const RankingColumn = (props) => {
    return (
        <div
            style={{ height: props.height, minHeight: props.minHeight, maxWidth: "18rem" }}
            className={`flex-1 bg-primary rounded-md flex justify-center items-center relative ${props.position === 1 && "z-10 transform scale-x-110"} p-4  shadow-xl`}
        >
            <img
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
                src={props.iconMedal}
            />
            <p className="hidden smartphone:block text-5xl break-all font-bold text-center">
                {props.votes ? props.votes : "N/A"}
            </p>
            <p className="smartphone:hidden text-5xl break-all font-bold text-center">
                #{props.position}
            </p>
            <p className="absolute -top-16 text-2xl smartphone:text-3xl font-bold text-center break-all">
                {props.partecipant ? props.partecipant : "N/A"}
            </p>
        </div>
    );
};

export default RankingColumn;
