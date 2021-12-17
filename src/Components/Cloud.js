import React from "react";
import ReactWordcloud from "react-wordcloud";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
// import axios from "axios";
// import Loading from "./Loading";
// import "tippy.js/dist/tippy.css";
// import "tippy.js/animations/scale.css";
// import Switch from "react-switch";


//commento inutile
const options = {
    enableTooltip: true,
    deterministic: false,
    fontSizes: [20, 100],
    fontFamily: "Abril Fatface",
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 2,
    rotations: 0,
    rotationAngles: [0, 0],
    scale: "sqrt",
    spiral: "rectangular",
    transitionDuration: 1000,
};




const Cloud = ({ wordCloud }) => {

    const [words, setWords] = useState([]);
    const history = useHistory();
    let wordToSearch= null;

    function handleClick (data){
        if(!wordToSearch) {wordToSearch = data;}
        else {console.log("Error: gestione errata vecchia parola");}

        history.push(`/tweets/Keyword?q=${wordToSearch}`);
        wordToSearch = null;
        history.go(0);
    }

    const callbacks = {
        onWordClick: word => {  handleClick(word.text);  },
        getWordTooltip: word => `${word.text} (${word.value})`,
    }

    useEffect(() => {
        if (wordCloud) {
            let data = [];

            for (const key in wordCloud) {
                data.push({
                    text: `${key}`,
                    value: wordCloud[key],
                });
            }

            setWords(data);
        }
    }, []);

    return (
        <div>
            <div
                style={{ fontFamily: "Abril Fatface" }}
                className="w-full h-full"
            >
                <ReactWordcloud words={words} options={options} callbacks={callbacks}/>
            </div>
        </div>
    );
};

export default Cloud;
