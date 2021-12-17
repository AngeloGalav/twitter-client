//Components
import AboutScreen from "./Components/Screens/AboutScreen";
import TweetsScreen from "./Components/Screens/TweetsScreen";
import HomeScreen from "./Components/Screens/HomeScreen";
import ScrollToTop from './Utils/ScrollToTop';
import Cloud from "./Components/Cloud";

//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import ContestScreen from "./Components/Screens/ContestScreen";

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

                <Route exact path="/tweets/:mainFilter" component={TweetsScreen} />

                <Route exact path="/contest" component={ContestScreen} />

                {/* <Route exact path="/cloud" component={Cloud} /> */}

                {/*Esiste anche questa altra sintassi per mostrare piu' di un componente ma si perde la props history in questo modo
          <Route exact path="/product/:model">
            <Navbar static={true} />
            <ProductScreen />
          </Route>
        */}
            </Switch>

            <Footer />
        </Router>
    );
}

export default App;
