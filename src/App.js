//Components
import TweetList from "./Components/TweetList";
import SearchBar from "./Components/SearchBar";
import Tweet from "./Components/Tweet";

//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import SwitchTheme from "./Components/SwitchTheme";

function App() {
  const [primaRisposta, setRisposta] = useState(
    <i>in attesa di risposta dal server...</i>
  );

  function getData() {
    axios
      .get("/api")
      .then((response) => {
        setRisposta(response.data[0].trends[0].name);
        console.log(primaRisposta);
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => getData());

  return (
    //Il router di react permette di fare routing displayando i componenti in base all'url corrente
    <Router>

      {/* Lo switch restituisce il primo componente che fa match con l'url */}
      <Switch>

        {/* exact fa in modo che l'url sia esattamente quello specificato in path, altrimenti restituisce il primo path incluso nell'url */}
        <Route exact path="/" component={SwitchTheme} /> {/*Questa cosa andra' cambiata ovviamente, per il momento e' a scopo illustrativo, renderizza lo switch theme solo nella home (provate a mettere un url diverso)*/}

        {/*Esiste anche questa altra sintassi per mostrare piu' di un componente ma si perde la props history in questo modo
          <Route exact path="/product/:model">
            <Navbar static={true} />
            <ProductScreen />
          </Route>
        */}



        
      </Switch>

      <button class="btn">neutral</button> 
<button class="btn btn-primary">primary</button> 
<button class="btn btn-secondary">secondary</button> 
<button class="btn btn-accent">accent</button> 
<button class="btn btn-ghost">ghost</button> 
<button class="btn btn-link">link</button>
<button class="btn btn-info">info</button> 
<button class="btn btn-error">error</button> 
<button class="btn btn-warning">warning</button> 
<button class="btn btn-success">success</button> 
<button class="btn btn-outline">neutral</button> 
<button class="btn btn-outline btn-primary">primary</button> 
<button class="btn btn-outline btn-secondary">secondary</button> 
<button class="btn btn-outline btn-accent">accent</button>
<button class="btn btn-outline btn-info">info</button> 
<button class="btn btn-outline btn-error">error</button> 
<button class="btn btn-outline btn-warning">warning</button> 
<button class="btn btn-outline btn-success">success</button> 
      <div className="h-full">
          <div className="flex h-full gap-3 flex-col justify-center items-center">
            <h1 className="text-2xl">Hello Twitter!</h1>
            <TweetList />
            <SearchBar />
            <Tweet content={<b>{primaRisposta}</b>} />

            <MapContainer
              className="w-1/2 h-1/2"
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  <div className="w-72">
                    <img
                      className="w-full h-full"
                      alt="nice"
                      src="https://i.ytimg.com/vi/Pg1ogBDAMuo/maxresdefault.jpg"
                    />
                  </div>
                </Popup>
              </Marker>

              <Marker position={[51.535, -0.0902]}>
                <Popup>
                  <div className="w-72">
                    <img
                      className="w-full h-full"
                      alt="nice"
                      src="https://external-preview.redd.it/_-sfH6MwYEX1W8k_8wPS51_HihPvi88C6Pmjo8z3O1w.png?width=640&crop=smart&format=pjpg&auto=webp&s=16bf1e3851f69e19b963bf05add03ef32c6c3de5"
                    />
                  </div>
                </Popup>
              </Marker>

              <Marker position={[51.55, -0.0908]}>
                <Popup>
                  <div className="w-72">
                    <img
                      className="w-full h-full"
                      alt="nice"
                      src="https://pbs.twimg.com/media/ElL0plwXUAMezy-.jpg"
                    />
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
    </Router>


  );
}

export default App;
