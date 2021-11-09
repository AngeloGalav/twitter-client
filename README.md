# Getting started

## Come avviare l'app React
In questa dir fare

`npm install && npm start`

L'app verra' aperta sulla porta 3000 dell'host locale.
> ⚠️ **Per utilizzare l'app bisogna installare [questa estensione](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon) altrimenti vi viene segnalato un errore. Esiste una versione analoga anche per Firefox**.

## Come avviare l'app Node
Per avviare il server (che verrà aperto nella porta 3001 dell'host), che purtoppo è necessario per reperire le informazioni da twitter (grazie twitter per le tue API del 2006),
è necessario aprire una nuova istanza della console, entrare nella cartella 'backend' con il comando `cd backend` e avviare il server tramite

`npm install && npm run dev`

## Struttura del progetto
Il progetto e' strutturato come consigliato dalla maggior parte degli sviluppatori React-Redux [[1]](#1), eccezion fatta per il server. Infatti generalmente si separano backend e frontend in due directory distinte, tuttavia in questo caso, visto che il backend ha un ruolo solo marginale (anzi e' semplicemente un vincolo imposto dalle API di twitter), abbiamo deciso di tenere la cartella backend in quella del client. Se in futuro avremo bisogno faremo come spiegato sopra. Per quanto riguarda il client abbiamo la seguente gerarchia:
```
/
│   craco.config.js
│   package.json
|   package-lock.json
|   tailwind.config.js
|   README.md
|   .gitignore
│
└───src
│   │   App.js
│   │   index.css
|   |   index.js
|   |   store.js
│   │
│   └───Actions
│   |   │   types.js
│   |   │   ...
|   |   |
│   └───Assets
|   │   |   logo.svg
│   |   │   ...
|   |   |
│   └───Components
|   │   |   button.js
│   |   │   SwitchTheme.js
│   |   │
|   |   └───Screens
|   |   |   |   HomeScreen.js
|   |   |   |   ...
|   |   |   |
│   └───Reducers
|   │   |   index.js
│   |   │   ...
|   |   |
│   └───utils
|   |   |   WindowsSize.js
|   |   |   ...
|   |   |
└───public
|   │   index.html
|   │   ...
```
### Actions
La cartella `Actions` contiene i file necessari per svolgere le azioni asincrone sullo store di redux. Infatti, per definizione, le **azioni** sono semplici oggetti JavaScript che hanno un campo di `type` [[2]](#2). Oltre a questo hanno anche un campo `payload` che contiene le informazioni su come aggiornare lo stato. Tuttavia spesso abbiamo bisogno di effettuare delle azioni con una logica asincrona (ad esempio fetiching dei dati dal server). Per questo bisogna estendere le funzionalita' di Redux con il middleware **Redux-Thunk** [[3]](#3) che permette di fare quanto descritto.

### Assets
La cartella `Assets` contiene tutti i file media come immagini, logo, video ecc.

### Components
Nella cartella `Components` andranno i componenti React. Distinguiamo due tipi di Componenti, ovvero quelli classici (come bottoni, navbar ecc) e i componenti `Screens` che sono essenzialmente le pagine della nostra applicazione (ad esempio Homepage, About page, Login page ecc). Per convenzione questi file iniziano con la lettera maiuscola. E' possibile anche utilizzare l'estensione `jsx` (Javascript esteso con html di React).

### Reducers
I **Reducers** sono funzioni che trasformano lo stato corrente in un nuovo stato grazie all'informazione contenuta nell'azione che li viene passata come argomento [[2]](#2). Il file `index.js` in questa cartella contiene al suo interno un `combineReducers` che raggruppa al suo interno tutti i reducers dell'app (che possono essere diversi, dipende da come si gestisce lo store).

### Utils
Nella cartella `Utils` andranno le funzioni generali, utili per qualche ragione. Ad esempio `WindowsSize.js` e' un hook che permette di ottenere le dimensioni attuali della viewport, ed e' una funzione generale utile a tutti i componenti.


## Pillole di React
React e' un framework component based. Questo significa che si creano delle **Componenti**, che potete immaginare come delle classi. Queste componenti altro non sono che porzioni di html/css che possono essere riutilizzate varie volte nel codice. In teoria si dovrebbero immaginare i componenti con un approccio bottom-up, ovvero prima i componenti piu' semplici e che si ripetono piu' spesso (ad esempio i bottoni, link, input forms ecc), e man mano costruire componenti sempre piu' complesse (ad esempio una home page). Ad ogni componente possono essere passate delle **props**, ovvero delle proprieta' che il componente padre puo' trasferire al componente figlio. Ad esempio
```jsx
function Ciao(props) {
    return <h1>Ciao, {props.nome}</h1>;
}
```
Qui abbiamo la componente `Ciao`, con una argomento `props`, che al suo interno contiene le props che gli passiamo. Adesso possiamo decidere di utilizzare la componente `Ciao` passandogli una props in questo modo
```jsx
<Ciao nome="Angela" />
```
Cosi' facendo quell'istanza di `Ciao` (possono esserci piu' `Ciao` diversi nel codice, cosi' come istanze diverse di una classe) avra' una props `nome` che puo'essere acceduta come abbiamo visto precedentemente. Il risultato sara' un header che contiene `Ciao, Angela`. Ovviamente si possono passare tante props, e le potete immaginare come degli attributi di una classe. Ogni componente ha un props di default che e' `children` che contiene gli elementi tra il tag di apertura e il tag di chiusura di un componente
```jsx
<Componente>
<!--Tutto cio' che e' qui e' props.children-->
<Componente />
```
A volte il fatto che le props possano essere passate solo "verso il basso" (ovvero da padre verso il figlio e cosi' via), puo' essere un problema. Per questo si utilizza Redux, che permette di avere una gestione "centralizzata" per tutte quelle informazioni che devono essere accedibili ovunque da piu' componenti (ad esempio una componente figlio potrebbe cambiare lo stato e questo sarebbe comunque accedibile alla componente padre, superando il limite delle props che vanno solo verso il basso).
### Stato
Ogni componente ha associato uno **stato**. E' possibile utilizzare l'hook `useState` per definire una nuova variabile di stato
```jsx
function Ciao() {
    [count, setCount] = useState(0);
    return <button onClick={() => setCount(count => count + 1)}>{count}</button>;
}
```
In questo modo il nostro componente `Ciao` avra' una variabile di stato `count` inizializzata a `0`. Inoltre ci sara' un bottone che ogni volta che viene cliccato incrementera' il valore di `count` di 1. In generale la variabile di stato puo' contenere qualsiasi cosa, come un array o anche oggetti. Osserviamo che per fare interpolazione di variabile in react, ed in generale per inserire del codice javascript in react, bisogna introdurre `{}`. Ricordate che ogni parentesi potra' contenere un solo elemento padre, quindi dovrete mettere tutto il contenuto in un unico `<div>`

```jsx
{condizione && <div> Contenuto </div>}
```
Ad esempio inserendo con questo pezzo di codice in un componente react, renderizzeremo quel `div` solo se `condizione` e' verificata. Si potrebbe utilizzare anche un operatore ternario per simulare un `if-then-else`
```jsx
{condizione ? <div> Contenuto 1 <div/> : <div> Contenuto 2 <div/>}
```

### Effetti
Spesso abbiamo bisogno di realizzare un effetto collaterale quando si verifica un evento. Per questo esiste l'hook `useEffect`
```jsx
useEffect(() => {}, [dipendenze])
```
In input prende la funzione che si deve eseguire quando una dipendenza passata come secondo argomento cambia valore. Possiamo immaginarlo come un effetto collaterla del mutamento di valore di una variabile di stato o proprieta' del componente. Ad esempio riprendendo il componente di prima
```jsx
function Ciao() {
    [count, setCount] = useState(0);
    useEffect(() => {
        window.alert(count);
    }, [count])
    return <button onClick={() => setCount(count => count + 1)}>Clicca qui</button>;
}
```
La funzione passata in input a `useEffect` fara' un alert che mostra il contenuto di `count` ogni volta che `count` cambia di valore, oppure nel primo render della pagina. A questo proposito:
- Se a `useEffect` non vengono passate dipendenze, viene eseguito ad ogni render.
- Se a `useEffect` e' passato un array vuoto viene eseguito solo al primo render.
- Se a `useEffect` vengono passate delle dipendenze, viene eseguito solo ai render relativi all'aggiornamento delle sue dipendenze.

In generale le dipendenze di `useEffect` dovrebbero essere tutte le variabili di stato che compaiono nel suo corpo. Tuttavia nel corpo della funzione non dovrebbe essere modificata una dipendenza altrimenti si entrerebbe in un loop infinito (per variabili che non causino re-render quando cambiano di valore vedere l'hook `useRef`).

### Redux in poche parole

Come gia' detto, Redux e' una libreria che permette di dare alle app React uno stato centralizzato. Informazioni rilevanti al funzionamento dell'app, e condivise da vari componenti, dovrebbero essere gestite tramite Redux. Inoltre grazie a Redux Persistor queste informazioni possono essere mantenute nel Local Storage del browser per sopravviere persino alla chiusura del browser stesso, e ripristinate all'accesso successivo. Come esempio introduttivo vediamo come rendere persistente la scelta del tema da parte dell'utente. Innanzitutto creiamo un file `Types.js` in `src/Actions`. Questo modulo esportera' tutte le azioni, intese come "identificativo" (un nome), utile a Redux per sapere quale azione si sta richiedendo.

```js
export const CHANGE_THEME = "CHANGE_THEME"
```

In questo modo stiamo esportando l'azione relativa al cambio di tema che e' chiamata appunto `CHANGE_THEME`. Creiamo ora il reducer `UserReducer.js` in `src/Reducers`, ovvero quella componente di Redux che si occupa della modifica dello stato relativo alle informazioni dell'utente

```jsx
//importiamo l'azione creata precedentemente
import { CHANGE_THEME } from "../Actions/Types"; 

//creiamo uno stato iniziale
const initalState = {
    theme: "light",
};

//creiamo il reducer passandogli lo stato iniziale
export default function userReducer(state = initalState, action) {
    
	//vediamo l'azione che e' stata richiesta e modifichiamo lo stato con le informazioni 	  	contenute nel suo payload
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.payload.theme,
            };
        default:
            return state;
    }
}
```

Ricordatevi che bisogna sempre inizializzare lo stato dell'app [[4]](#4). In questo caso, quando avviene la richiesta di cambiare il tema tramite il dispatch dell'azione `CHANGE_THEME`, il reducer restituisce il nuovo stato, che avra' il tema dato dall'informazione contenuta nel payload dell'azione. Ora non ci resta che fare il dispatching dell'azione quando si preme il bottone per cambiare tema nella nostra app

```jsx
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SwitchTheme = () => {
    //importiamo lo stato relativo al reducer che abbiamo creato nel componente in modo che 	  possa usufruirne
    const user = useSelector((state) => state.userReducer);
    //il dispatch ci permette di inviare un'azione al reducer
    const dispatch = useDispatch();
...
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
...
return (
        <div>
            <button onClick={changeTheme}>
                Cambia tema!
            </button>
        </div>
    );
};
```

In alcuni casi potremmo avere bisogno di effettuare delle oprazioni asincrone, avendo quindi azioni piu' complesse. In casi come questi e' possibile passare al dispatch delle funzioni asincrone che svolgono questo lavoro (ad esempio per fare fetiching e gestire il successo o il fallimento dell'operazione).

## References
<a id="1">[1]</a> 
https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase

<a id="2">[2]</a> 
https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

<a id="3">[3]</a> 
https://github.com/reduxjs/redux-thunk

<a id="4">[4]</a> 
https://redux.js.org/usage/structuring-reducers/initializing-state

