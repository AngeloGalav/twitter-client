import React from "react";

const FunctionalityCard = (props) => {
    return (
        <div
            style={{ minHeight: "27rem" }}
            className="relative flex-1 max-w-xs bg-base-200 p-8 rounded-xl text-center shadow-lg"
        >
            <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center items-center">
                <div className="w-20 h-20 bg-base-200 rounded-full flex justify-center items-center ring-2 ring-primary">
                    <i className={`bi ${props.icon} text-5xl`} />
                </div>
            </div>
            <div className="mt-8">
                <h2 className="font-bold text-lg text-primary">
                    {props.title}
                </h2>
                <p className="mt-4 text-base">{props.children}</p>
            </div>
        </div>
    );
};

export default FunctionalityCard;
