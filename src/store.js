import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //middleware per estendere le funzionalita' del dispatch di redux
import rootReducer from "./Reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initialState = {};

//midleware che permette di creare actions che hanno accesso a dispatch e getState ed effettuare operazioni asincrone
//queste funzioni sono nella forma () => (dispatch, getState) => {fa qualcosa}
const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //permette di utilizzare l'estensione di redux per google chrome o firefox
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //adios redux
  )
);

export const persistor = persistStore(store);
// eslint-disable-next-line
export default { store, persistor };
