import React from "react";
import { TagCloud } from 'react-tagcloud';
import randomColor from 'randomcolor';
import { useState, useEffect } from "react";
import axios from "axios";


const Cloud = () => {

    const [response, setResponse] = useState(null);
    const [IsLoading, setIsLoading] = useState(true);
    //const data = [/*{ value: 'JavaScript', count: 38 }*/];
    
    useEffect(() => {
        
        async function getData() {
            setIsLoading(true);
            try {
                let risp = [[]];
                risp = await axios.get("/hastag?id=1");
            
                console.log(risp.data["0"]["trends"]);
                let temp_data = risp.data["0"]["trends"];
                let data = [];
                
                //per ora ne usiamo la metà, quindi 25, si può mettere quello che vogliamo
                for (let i=0; i<temp_data.length/2; i++){ data.push({value: temp_data[i].name, count: (temp_data.length-i) }); }

                setResponse(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                setResponse(null);
                setIsLoading(false);
            }
        }
        getData();

    }, []);

    return (
        <div sx= {{padding: '10%'}}>
        {  IsLoading ? <div>IsLoading...</div> :  <div>
                                                        <TagCloud
                                                            rotate={[0, -45, 90]}
                                                            padding={20}
                                                            minSize={12}
                                                            maxSize={35}
                                                            tags={response}
                                                            onClick={tag => alert(`'${tag.value}' was selected!`)}
                                                        />
                                                    </div>
        }
        </div>
        );
}

export default Cloud;