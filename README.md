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
```javascript
function Ciao(props) {
    return <h1>Ciao, {props.nome}</h1>;
}
```
Qui abbiamo la componente `Ciao`, con una argomento `props`, che al suo interno contiene le props che gli passiamo. Adesso possiamo decidere di utilizzare la componente `Ciao` passandogli una props in questo modo
```html
<Ciao nome="Angela" />
```
Cosi' facendo quell'istanza di `Ciao` (possono esserci piu' `Ciao` diversi nel codice, cosi' come istanze diverse di una classe) avra' una props `nome` che puo'essere acceduta come abbiamo visto precedentemente. Il risultato sara' un header che contiene `Ciao, Angela`. Ovviamente si possono passare tante props, e le potete immaginare come degli attributi di una classe. Ogni componente ha un props di default che e' `children` che contiene gli elementi tra il tag di apertura e il tag di chiusura di un componente
```html
<Componente>
<!--Tutto cio' che e' qui e' props.children-->
<Componente />
```
A volte il fatto che le props possano essere passate solo "verso il basso" (ovvero da padre verso il figlio e cosi' via), puo' essere un problema. Per questo si utilizza Redux, che permette di avere una gestione "centralizzata" per tutte quelle informazioni che devono essere accedibili ovunque da piu' componenti (ad esempio una componente figlio potrebbe cambiare lo stato e questo sarebbe comunque accedibile alla componente padre, superando il limite delle props che vanno solo verso il basso).
### Stato
Ogni componente ha associato uno **stato**. E' possibile utilizzare l'hook `useState` per definire una nuova variabile di stato
```javascript
function Ciao() {
    [count, setCount] = useState(0);
    return <button onClick={() => setCount(count => count + 1)}>{count}</button>;
}
```
In questo modo il nostro componente `Ciao` avra' una variabile di stato `count` inizializzata a `0`. Inoltre ci sara' un bottone che ogni volta che viene cliccato incrementera' il valore di `count` di 1. In generale la variabile di stato puo' contenere qualsiasi cosa, come un array o anche oggetti. Osserviamo che per fare interpolazione di variabile in react, ed in generale per inserire del codice javascript in react, bisogna introdurre `{}`. Ricordate che ogni parentesi potra' contenere un solo elemento padre, quindi dovrete mettere tutto il contenuto in un unico `<div>`

```javascript
{condizione && <div> Contenuto </div>}
```
Ad esempio inserendo con questo pezzo di codice in un componente react, renderizzeremo quel `div` solo se `condizione` e' verificata. Si potrebbe utilizzare anche un operatore ternario per simulare un `if-then-else`
```javascript
{condizione ? <div> Contenuto 1 <div/> : <div> Contenuto 2 <div/>}
```

### Effetti
Spesso abbiamo bisogno di realizzare un effetto collaterale quando si verifica un evento. Per questo esiste l'hook `useEffect`
```javscript
useEffect(() => {}, [dipendenze])
```
In input prende la funzione che si deve eseguire quando una dipendenza passata come secondo argomento cambia valore. Possiamo immaginarlo come un effetto collaterla del mutamento di valore di una variabile di stato o proprieta' del componente. Ad esempio riprendendo il componente di prima
```javascript
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

In aggiornamento...

## References
<a id="1">[1]</a> 
https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
<br>
<a id="2">[2]</a> 
https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
<br>
<a id="3">[3]</a> 
https://github.com/reduxjs/redux-thunk
