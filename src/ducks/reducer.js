import axios from 'axios'

const initialState = {
    // users: {}
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    address: '',
    city: '',
    st: '',
    zip: '',
    profilePic: {},
    routeCreationStep: 1,
    places: [],
    user: {},
    directionRoutes: [],
    venueCardFoundViaCategories: false,
    createdRoute: false
}

// action types
const LOGIN = 'LOGIN';
// const REGISTER = 'REGISTER';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_CITY = 'UPDATE_CITY';
const UPDATE_STATE = 'UPDATE_STATE';
const UPDATE_ZIP = 'UPDATE_ZIP';
const UPDATE_PROFILE_PIC = 'UPDATE_PROFILE_PIC';
const UPDATE_PLACES = 'UPDATE_PLACES';
const RESET_PLACES = 'RESET_PLACES';
const RESET_USER = 'RESET_USER';
const GET_USER = 'GET_USER'
const UPDATE_DIRECTION_ROUTES = 'UPDATE_DIRECTION_ROUTES';
const UPDATE_VENUE_CARD = 'UPDATE_VENUE_CARD';

// action creators
export function updateVenueCard(bool) {
    return {
        type: UPDATE_VENUE_CARD,
        payload: bool
    }
}

export function updateDirectionRoutes(info) {
    return {
        type: UPDATE_DIRECTION_ROUTES,
        payload: info
    }
}

export function getUser() {
    
    return {
        type: GET_USER,
        payload: axios.get('/api/session')
        // payload: 12
    }
}

export function resetUser() {
    return {
        type: RESET_USER
    }
}
export function resetPlaces() {
    return {
        type: RESET_PLACES
    }
}
export function addPlaceToRoute(place) {
    return {
        type: UPDATE_PLACES,
        payload: place
    }
}
export function updateFirstName(firstName){
    return {
        type: UPDATE_FIRST_NAME,
        payload: firstName
    }
}
export function updateLastName(lastName){
    return {
        type:  UPDATE_LAST_NAME,
        payload: lastName
    }
}
export function updateUsername(username){
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}
export function updatePassword(password){
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}
export function updateAddress(address){
    return {
        type: UPDATE_ADDRESS,
        payload: address
    }
}
export function updateCity(city){
    return {
        type: UPDATE_CITY,
        payload: city
    }
}
export function updateState(state){
    return {
        type: UPDATE_STATE,
        payload: state
    }
}
export function updateZip(zip){
    return {
        type: UPDATE_ZIP,
        payload: zip
    }
}
export function updateProfilePic(url){
    return {
        type: UPDATE_PROFILE_PIC,
        payload: url
    }
}
export function login(username,password) {
    return {
        type: LOGIN,
        payload: axios.post('/api/auth/login', {username,password})
    }
}


// reducer function
function reducer(state=initialState, action) {
    switch(action.type) {
        case UPDATE_VENUE_CARD:
            return {
                ...state,
                venueCardFoundViaCategories: action.payload
            }
        case RESET_PLACES: 
            return {
                ...state,
                places: [],
                createdRoute: true
                
            }
        case `${LOGIN}_FULFILLED`:
            return {
                ...state, 
                user: action.payload.data
            }
        // case `${REGISTER}_FULFILLED`:
        //     return {
        //         ...state, 
        //         user: action.payload.data
        //     }
        case UPDATE_FIRST_NAME:
            return {
                ...state,
                firstName: action.payload
            }
        case UPDATE_LAST_NAME:
            return {
                ...state,
                lastName: action.payload
            }
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case UPDATE_PASSWORD: 
            return {
                ...state,
                password: action.payload
            }
        case UPDATE_ADDRESS: 
            return {
                ...state,
                address: action.payload
            }
        case UPDATE_CITY: 
            return {
                ...state,
                city: action.payload
            }
        case UPDATE_STATE: 
            return {
                ...state,
                st: action.payload
            }
        case UPDATE_ZIP: 
            return {
                ...state,
                zip: action.payload
            }
        case UPDATE_PROFILE_PIC:
            return {
                ...state,
                profilePic: action.payload
            }
        case UPDATE_PLACES:
            return {
                ...state,
                places: [...state.places, action.payload]
            }
        case RESET_USER:
            return {
                ...state,
                user: {}
            }
        case `${GET_USER}_FULFILLED`:
            return {
                ...state,
                user: action.payload.data
            }
        case UPDATE_DIRECTION_ROUTES:
            return {
                ...state,
                directionRoutes: [
                    action.payload.address1,
                    action.payload.address2,
                    action.payload.address3,
                ]
            }
        default: return state;
    }
}

export default reducer;