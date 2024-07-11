import { createContext, useMemo, useReducer } from 'react';

const initialState = {
	data: [],
	searchText: '',
	error: '',
	currentLocation: 'Current Location',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADDPRODUCT':
			return {
				...state,
				products: [
					...state.products,
					{
						id: action.id,
						pname: action.pname,
						price: action.price,
					},
				],
			};
		case 'SET_SEARCH_TERM':
			return {
				...state,
				searchTerm: action.term,
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
