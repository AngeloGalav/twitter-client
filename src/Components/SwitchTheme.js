import React, { useEffect, useState } from 'react'

const SwitchTheme = () => {
    //TODO aggiungere stato per preservare il tema scelto dall'utente all'utima visita

    //stato del tema attuale
    const [theme, setTheme] = useState("light")

    //inverte il tema
    const changeTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    //funzione che viene eseguita ogni volta che viene cambiato il tema e aggiorna l'aspetto della pagina
    useEffect(() => {
        document.body.parentNode.setAttribute("data-theme", theme)
    }, [theme])


    return (
        <div>
            <button className="btn btn-ghost"
            onClick={changeTheme}
            >{theme === "light" ? <i className="bi bi-brightness-high-fill text-2xl"></i> : <i className="bi bi-moon-fill text-xl"></i>}
            </button>
        </div>
    )
}

export default SwitchTheme
