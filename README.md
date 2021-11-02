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
│   |   │   file112.txt
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
La cartella `Actions` contiene i file necessari per svolgere le azioni asincrone sullo store di redux. Infatti, per definizione, le **azioni** sono semplici oggetti JavaScript che hanno un campo di `type` [[2]](#2). Oltre a questo hanno anche un campo `payload` che contiene le informazioni su come aggiornare lo stato. Tuttavia spesso abbiamo bisogno di effettuare delle azioni con una logica asincrona (ad esempio fetiching dei dati dal server). Per questo bisogna estendere le funzionalita' di Redux con il middleware **Redux-Thunk** [[2]](#2) che permette di fare quanto descritto.

### Assets
La cartella `Assets` contiene tutti i file media come immagini, logo, video ecc.

### Components
Nella cartella `Components` andranno i componenti React. Distinguiamo due tipi di Componenti, ovvero quelli classici (come bottoni, navbar ecc) e i componenti `Screens` che sono essenzialmente le pagine della nostra applicazione (ad esempio Homepage, About page, Login page ecc).

### Reducers
I **Reducers** sono funzioni che trasformano lo stato corrente in un nuovo stato grazie all'informazione contenuta nell'azione che li viene passata come argomento [[2]](#2). Il file `index.js` in questa cartella contiene al suo interno un `combineReducers` che raggruppa al suo interno tutti i reducers dell'app (che possono essere diversi, dipende da come si gestisce lo store).

### Utils
Nella cartella `Utils` andranno le funzioni generali, utili per qualche ragione. Ad esempio `WindowsSize.js` e' un hook che permette di ottenere le dimensioni attuali della viewport, ed e' una funzione generale utile a tutti i componenti.


## References
<a id="1">[1]</a> 
https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
<br>
<a id="2">[2]</a> 
https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
<br>
<a id="3">[3]</a> 
https://github.com/reduxjs/redux-thunk