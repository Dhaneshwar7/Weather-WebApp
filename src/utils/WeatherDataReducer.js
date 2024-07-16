import { createContext, useMemo, useReducer } from 'react';

const initialState = {
	data: [],
	forecastData: [],
	searchText: '',
	error: '',
	timezone: null,
	currentLocation: 'Current Location',
	date: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'WEATHER_DATA':
			return {
				...state,
				data: action.weatherData,
			};
		case 'FORECAST_DATA':
			return {
				...state,
				forecastData: action.forecastData,
			};
		case 'SET_TIMEZONE':
			// console.log(state.timezone);
			return {
				...state,
				timezone: action.timezone,
			};
		case 'ADD_CURRENT_LOCATION':
			return {
				...state,
				currentLocation: action.currentLocation,
			};

		case 'SET_ERROR':
			return {
				...state,
				error: action.error,
			};
		case 'SET_DATE':
			return {
				...state,
				date: action.edate,
			};
		case 'SET_SEARCH_TERM':
			return {
				...state,
				searchText: action.searchTxt,
			};

		default:
			return state;
	}
};

export const WeatherDataContext = createContext();

export const WeatherDataProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const productValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	return (
		<WeatherDataContext.Provider value={productValue}>
			{children}
		</WeatherDataContext.Provider>
	);
};
