import React, { useCallback, useContext, useEffect, useState } from 'react';
import fetchCurrentLocation from '@/utils/GetLoc';
import { WeatherDataContext } from '@/utils/WeatherDataReducer';

const CurrentLocation = () => {
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	const [weatherData, setWeatherData] = useState(null);
	const { state, dispatch } = useContext(WeatherDataContext);
	const [currentLocation, setCurrentLocaton] = useState(state.currentLocation);
	const [mount, setMount] = useState(false);
	const [error, setError] = useState(null);
	// console.log(state);

	const handleLocationFetched = loc => {
		setLocation(loc);
	};
	const fetchWeatherData = useCallback(async (lat, long) => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=38563a45e910840c283837a6959d2880`
			);
			if (!response.ok) {
				throw new Error('Weather data not available');
			}
			const data = await response.json();
			setWeatherData(data);
			setCurrentLocaton(data.name);
			dispatch({ type: 'ADD_CURRENT_LOCATION', currentLoc: data.name });
			dispatch({ type: 'WEATHER_DATA', weatherData: data });
			localStorage.setItem('current-location', data.name);
			localStorage.setItem('weather-data', JSON.stringify(data));
		} catch (error) {
			// console.error('Error fetching weather data:', error);
			setError(error.message);
			dispatch({ type: 'SET_ERROR', error: error.message });
		}
	}, []);
	const handleClick = async () => {
		try {
			const location = await fetchCurrentLocation(handleLocationFetched);
			setLocation(location);
		} catch (error) {
			// console.error('Error fetching location:', error.message);
			setError(error.message);
			dispatch({ type: 'SET_ERROR', error: error.message });
		}
	};
	useEffect(() => {
		if (location.latitude && location.longitude) {
			fetchWeatherData(location.latitude, location.longitude);
		}
	}, [location, fetchWeatherData, dispatch]);

	// console.log(weatherData);

	useEffect(() => {
		setMount(true);
	});

	if (!mount) return null;
	return (
		<div className="CurrentLocation">
			<label
				className="mx-auto max-sm:mt-0 max-sm:w-full relative max-sm:flex max-sm:justify-betwee max-sm:whitespace-nowrap max-sm:flex-row bg-green-100 dark:bg-d-col min-w-xl max-w-2xl max-sm:max-w-sm flex flex-col md:flex-row items-center justify-center border-[.8px] border-zinc-400 py-1 px-1 rounded-full gap-2 shadow-2xl  focus-within:border-gray-300 drop-shadow-lg dark:drop-shadow-3xl"
				htmlFor="search"
			>
				<button
					onClick={handleClick}
					className="w-full md:w-auto px-3 max-sm:p-1 py-2 max-sm:w-full dark:bg-green-700 text-black dark:text-gray-100 dark:hover:bg-green-600 bg-green-400 hover:bg-green-500 border-black fill-white active:scale-95 duration-100 border-[.5px] will-change-transform overflow-hidden relative rounded-full transition-all"
				>
					<div className="flex items-center transition-all opacity-1 gap-1">
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
				{/* {location && (
					<div>
						<p>Latitude: {location.latitude}</p>
						<p>Longitude: {location.longitude}</p>
					</div>
				)} */}
			</label>
		</div>
	);
};

export default CurrentLocation;
