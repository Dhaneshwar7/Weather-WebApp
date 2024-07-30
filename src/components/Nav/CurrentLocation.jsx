import React, { useCallback, useContext, useEffect, useState } from 'react';
import fetchCurrentLocation from '@/utils/GetLoc';
import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import { fetchWeatherData } from '@/utils/FetchWeatherData';

const CurrentLocation = () => {
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	const { state, dispatch } = useContext(WeatherDataContext);
	const [currentLocation, setCurrentLocaton] = useState('Current Location');
	const [mount, setMount] = useState(false);
	const [error, setError] = useState(null);

	const handleLocationFetched = loc => {
		setLocation(loc);
	};
	const handleClick = async () => {
		try {
			const location = await fetchCurrentLocation(handleLocationFetched);
			// console.log(location);
		} catch (error) {
			// console.error('Error fetching location:', error.message);
			setError(error.message);
			dispatch({ type: 'SET_ERROR', error: error.message });
		}
	};
	const currentLocData = async ({ latitude, longitude, debouncedSearch }) => {
		const { timezone, forecastData, data, errorMsg } = await fetchWeatherData({
			lat: latitude,
			long: longitude,
			debouncedSearch,
		});
		if (errorMsg) {
			setError(errorMsg);
			dispatch({ type: 'SET_ERROR', error: errorMsg });
			return;
		}
		dispatch({
			type: 'ADD_CURRENT_LOCATION',
			currentLocation: localStorage.getItem('current-location'),
		});

		dispatch({ type: 'WEATHER_DATA', weatherData: data });
		dispatch({ type: 'FORECAST_DATA', forecastData });
		dispatch({
			type: 'SET_TIMEZONE',
			timezone: JSON.parse(localStorage.getItem('timezone')),
		});
	};
	useEffect(() => {
		setCurrentLocaton(state.currentLocation);
	}, [state.currentLocation, setCurrentLocaton]);

	useEffect(() => {
		if ((location.latitude, location.longitude)) {
			currentLocData({
				latitude: location.latitude,
				longitude: location.longitude,
				debouncedSearch: '',
			}).catch(error => {
				console.error('Error in Current Location Jsx- useEffect:', error);
				dispatch({ type: 'SET_ERROR', error: error.message });
			});
		} else {
			dispatch({ type: 'SET_ERROR', error: '' });
		}
	}, [location, dispatch]);

	useEffect(() => {
		setMount(true);
		if (localStorage.getItem('current-location')) {
			setCurrentLocaton(localStorage.getItem('current-location'));
		}
	}, []);

	if (!mount) return null;
	return (
		<div className="CurrentLocation">
			<label
				className="mx-auto max-sm:mt-0 max-sm:w-full relative max-sm:flex max-sm:justify-betwee max-sm:whitespace-nowrap max-sm:flex-row bg-green-100 dark:bg-d-col min-w-xl max-w-2xl max-sm:max-w-sm flex flex-col md:flex-row items-center justify-center border-[.8px] border-zinc-400 py-1 px-1 rounded-full gap-2 shadow-2xl  focus-within:border-gray-300 drop-shadow-lg dark:drop-shadow-3xl"
				htmlFor="search"
			>
				<button
					onClick={handleClick}
					className="w-full md:w-auto px-3 max-sm:p-1 max-sm:px-0 py-2 max-sm:w-full dark:bg-green-700 text-black dark:text-gray-100 dark:hover:bg-green-600 bg-green-400 hover:bg-green-500 border-black fill-white active:scale-95 duration-100 border-[.5px] will-change-transform overflow-hidden relative rounded-full transition-all"
				>
					<div className="flex relative items-center transition-all opacity-1 gap-1">
						<span className="text-sm max-sm:text-xs font-semibold whitespace-nowrap truncate mx-auto">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5 max-sm:w-7 max-sm:h-5"
							>
								<path d="M11 17.9381C7.05369 17.446 4 14.0796 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 14.0796 16.9463 17.446 13 17.9381V20.0116C16.9463 20.1039 20 20.7351 20 21.5C20 22.3284 16.4183 23 12 23C7.58172 23 4 22.3284 4 21.5C4 20.7351 7.05369 20.1039 11 20.0116V17.9381ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"></path>
							</svg>
						</span>
						<span className="text-sm max-sm:text-[8px] max-sm:hidden font-semibold whitespace-nowrap truncate mx-auto">
							{currentLocation}
						</span>
					</div>
				</button>
				<div className="absolute hidden max-sm:block -bottom-1/2 max-sm:-left-10 text-center m-auto container flex-wrap whitespace-nowrap text-[10px] max-sm:text-[10px] mt-1  max-sm:-mt-">
					{currentLocation}
				</div>
			</label>
		</div>
	);
};

export default CurrentLocation;
