import { CHANGE_RADIUS, CHANGE_POSITIONS, CHANGE_NEW_SEARCH, CHANGE_DATE_RANGE, CHANGE_POPULAR, CHANGE_LANGUAGE, CHANGE_CENTER} from "../Actions/Types";

const initalState = {
    theme: "light",
};

export default function userReducer(state = initalState, action) {
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



// const [radius, setRadius] = useState(null);
// const [position, setPosition] = useState(null);
// const [newSearch, setNewSearch] = useState(false);
// const [selectionRange, setSelectionRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
//     endDate: new Date(),
// });
// const [popular, setPopular] = useState(false);
// const [onlyItalian, setOnlyItalian] = useState(false);
// const [center, setCenter] = useState([41.9109, 12.4818]);