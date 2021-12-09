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
    fontSizes: [12, 100],
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
    // const [response, setResponse] = useState([]);
    // const [IsLoading, setIsLoading] = useState(true);
    // const [onlyItaly, setOnlyItaly] = useState(false);
    //const data = [/*{ value: 'JavaScript', count: 38 }*/];

    // useEffect(() => {
    //     async function getData() {
    //         setIsLoading(true);
    //         try {
    //             let risp = [[]];
    //             risp = await axios.get(
    //                 `/api/trends?id=${onlyItaly ? "23424853" : "1"}`
    //             );

    //             console.log(risp.data["0"]["trends"]);
    //             let temp_data = risp.data["0"]["trends"];
    //             let data = [];

    //             //per ora ne usiamo la metà, quindi 25, si può mettere quello che vogliamo
    //             for (let i = 0; i < temp_data.length; i++) {
    //                 data.push({
    //                     text: temp_data[i].name,
    //                     value: temp_data.length - i,
    //                 });
    //             }

    //             setResponse(data);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.log(error.message);
    //             setResponse(null);
    //             setIsLoading(false);
    //         }


    //     }
    //     getData();
    // }, [onlyItaly]);

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
