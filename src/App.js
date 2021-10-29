import TweetList from "./Components/TweetList";
import SwitchTheme from "./Components/SwitchTheme";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import SearchBar from "./Components/SearchBar";
import Tweet from "./Components/Tweet";
import { useState, useEffect } from 'react' // useEffect esegue all'avvio una funzione
import axios from 'axios';

var primaRisposta = "ee";

function getData () {
  axios.get("/api")
  .then((response) => {
    primaRisposta = response.data[0].trends[0].name;
    console.log(primaRisposta);
  })
  .catch(error => console.log(error.message))
}


function App() {

  useEffect(() => getData())

  return (
    <div className="h-full">
      <div className="flex h-full gap-3 flex-col justify-center items-center">
      <h1 className="text-2xl">Hello Twitter!</h1>
      <TweetList />
      <SearchBar />
      <Tweet content={primaRisposta} />
      <SwitchTheme />
      
      <MapContainer
      className="w-1/2 h-1/2"
      center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
        
        <div className="w-72">
        <img className="w-full h-full" src="https://i.ytimg.com/vi/Pg1ogBDAMuo/maxresdefault.jpg" />
          </div>
        
        
        </Popup>
      </Marker>

      <Marker position={[51.535, -0.0902]}>
        <Popup>
        
        <div className="w-72">
        <img className="w-full h-full" src="https://external-preview.redd.it/_-sfH6MwYEX1W8k_8wPS51_HihPvi88C6Pmjo8z3O1w.png?width=640&crop=smart&format=pjpg&auto=webp&s=16bf1e3851f69e19b963bf05add03ef32c6c3de5" />
          </div>
        
        
        </Popup>
      </Marker>

      <Marker position={[51.55, -0.0908]}>
        <Popup>
        
        <div className="w-72">
        <img className="w-full h-full" src="https://pbs.twimg.com/media/ElL0plwXUAMezy-.jpg" />
          </div>
        
        
        </Popup>
      </Marker>
    </MapContainer>

      </div>

    </div>
  );
}

export default App;
