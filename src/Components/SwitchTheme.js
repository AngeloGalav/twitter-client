import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SwitchTheme = () => {
    //redux stuff
    const user = useSelector((state) => state.userReducer); //in questo modo stiamo prendendo le informazioni nello stato relative all'user
    const dispatch = useDispatch(); //il dispatch ci permette di inviare un'azione al reducer

    //stato del tema attuale
    const [theme, setTheme] = useState(user.theme);

    //inverte il tema
    const changeTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            //dispatch prende un'azione, ovvero un oggetto con tipo (tipo di azione da disptchare) e il payload (informazioni su come modificare lo stato)
            dispatch({
                type: "CHANGE_THEME",
                payload: {
                    theme: "dark",
                },
            });
        } else {
            setTheme("light");
            dispatch({
                type: "CHANGE_THEME",
                payload: {
                    theme: "light",
                },
            });
        }
    };

    //funzione che viene eseguita ogni volta che viene cambiato il tema e aggiorna l'aspetto della pagina
    useEffect(() => {
        document.body.parentNode.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div>
            <button className="btn btn-ghost" onClick={changeTheme}>
                {theme === "light" ? (
                    <i className="bi bi-brightness-high-fill text-2xl"></i>
                ) : (
                    <i className="bi bi-moon-fill text-xl"></i>
                )}
            </button>
        </div>
    );
};

export default SwitchTheme;
