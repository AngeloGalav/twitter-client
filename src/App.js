//Components
import AboutScreen from "./Components/Screens/AboutScreen";
import TweetsScreen from "./Components/Screens/TweetsScreen";
import HomeScreen from "./Components/Screens/HomeScreen";
import ScrollToTop from './Utils/ScrollOnTop';

//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        //Il router di react permette di fare routing displayando i componenti in base all'url corrente
        <Router>
          {/* Riporta lo scroll sopra a tutto */}
            <ScrollToTop />

            {/* Lo switch restituisce il primo componente che fa match con l'url */}
            <Switch>
                
                {/* exact fa in modo che l'url sia esattamente quello specificato in path, altrimenti restituisce il primo path incluso nell'url */}
                <Route exact path="/" component={HomeScreen} />

                <Route exact path="/about" component={AboutScreen} />

                <Route exact path="/tweets" component={TweetsScreen} />

                {/*Esiste anche questa altra sintassi per mostrare piu' di un componente ma si perde la props history in questo modo
          <Route exact path="/product/:model">
            <Navbar static={true} />
            <ProductScreen />
          </Route>
        */}
            </Switch>
        </Router>
    );
}

export default App;
