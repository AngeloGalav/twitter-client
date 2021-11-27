import React from "react";
import ReactWordcloud from "react-wordcloud";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Switch from "react-switch";

const options = {
    colors: ["#1DA1F2", "#0C82CB", "#096096", "#063E61", "#031C2C"],
    enableTooltip: true,
    deterministic: false,
    fontSizes: [5, 60],
    fontFamily: "Abril Fatface",
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 2,
    rotations: 0,
    rotationAngles: [0, 0],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
};

const Cloud = () => {
    const [response, setResponse] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [onlyItaly, setOnlyItaly] = useState(false);
    //const data = [/*{ value: 'JavaScript', count: 38 }*/];

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            try {
                let risp = [[]];
                risp = await axios.get(
                    `/api/trends?id=${onlyItaly ? "23424853" : "1"}`
                );

                console.log(risp.data["0"]["trends"]);
                let temp_data = risp.data["0"]["trends"];
                let data = [];

                //per ora ne usiamo la metà, quindi 25, si può mettere quello che vogliamo
                for (let i = 0; i < temp_data.length; i++) {
                    data.push({
                        text: temp_data[i].name,
                        value: temp_data.length - i,
                    });
                }

                setResponse(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                setResponse(null);
                setIsLoading(false);
            }
        }
        getData();
    }, [onlyItaly]);

    return (
        <div className="relative">
            <div className="absolute top-0 right-0 mt-4 mr-4">
                <Switch
                    onChange={() => setOnlyItaly((onlyItaly) => !onlyItaly)}
                    checked={onlyItaly}
                    offColor="#5cdad0"
                    onColor="#94ba75"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    className="shadow-md"
                    uncheckedHandleIcon={
                        <div className="flex justify-center p-px bg-white rounded-full items-center h-full">
                            <img
                                className="w-full h-full object-cover"
                                src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-earth-space-icongeek26-flat-icongeek26.png"
                            />
                        </div>
                    }
                    checkedHandleIcon={
                        <div className="flex justify-center items-center h-full">
                            <img
                            className="w-full h-full object-cover"
                            src="https://img.icons8.com/color/48/000000/italy-circular.png"/>
                        </div>
                    }
                />
            </div>
            {IsLoading ? (
                <Loading />
            ) : (
                <div
                    style={{ fontFamily: "Abril Fatface" }}
                    className="w-full h-full"
                >
                    <ReactWordcloud words={response} options={options} />
                </div>
            )}
        </div>
    );
};

export default Cloud;
