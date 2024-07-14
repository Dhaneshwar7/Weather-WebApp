import { useDebounce } from '@/utils/Debounce';
import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import SearchError from '../Error/SearchError';

const SearchBar = () => {
	const { state, dispatch } = useContext(WeatherDataContext);

	const [search, setSearch] = useState('');
	const { debouncedValue: debouncedSearch, loading } = useDebounce(search, 900);

	const handleSearchChange = e => {
		setSearch(e.target.value);
		if (search !== '') {
			dispatch({ type: 'SET_ERROR', error: '' });
		}
	};

	useEffect(() => {
		try {
			const fetchWeatherData = async searchQuery => {
				try {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=38563a45e910840c283837a6959d2880`
					);
					if (!response.ok) {
						throw new Error('Weather data not available');
					}
					const data = await response.json();
					// console.log(data);
					let cord = data.coord;
					// console.log(cord);
					const forecastResponse = await fetch(
						`https://api.openweathermap.org/data/2.5/forecast?lat=${cord.lat}&lon=${cord.lon}&appid=38563a45e910840c283837a6959d2880`,
						{
							next: { revalidate: 10 },
						}
					);

					if (!forecastResponse.ok) {
						throw new Error('Forecast data not available');
					}
					const forecastData = await forecastResponse.json();
					let timezone = forecastData.city.timezone;
					localStorage.setItem('weather-data', JSON.stringify(data));
					localStorage.setItem('forecast-data', JSON.stringify(forecastData));
					dispatch({ type: 'WEATHER_DATA', weatherData: data });
					dispatch({ type: 'FORECAST_DATA', forecastData });
					dispatch({ type: 'SET_TIMEZONE', zone: timezone });
					dispatch({
						type: 'ADD_CURRENT_LOCATION',
						currentLocation: data.name,
					});
				} catch (error) {
					console.log(error.message);
					dispatch({ type: 'SET_ERROR', error: error.message });
					// dispatch({ type: 'SET_ERROR', error: 'CityName Not found' });
				}
			};

			if (debouncedSearch) {
				dispatch({ type: 'SET_SEARCH_TERM', searchTxt: debouncedSearch });
				fetchWeatherData(debouncedSearch);
			} else {
				dispatch({ type: 'SET_SEARCH_TERM', searchTxt: '' });
			}
		} catch (error) {
			console.error('Error in SearchBar Jsx- useEffect:', error);
		}
	}, [debouncedSearch, dispatch]);

	return (
		<div className="SearchBar">
			<div className="container mx-auto flex  max-sm:px-1 relative  p-1">
				<form
					onSubmit={e => e.preventDefault()}
					className="max-sm:w-full  max-sm:ml-0"
				>
					<label
						className="mx-auto max-sm:mt-0 relative max-sm:flex max-sm:justify-betwee max-sm:whitespace-nowrap max-sm:flex-row bg-l-col dark:bg-d-col min-w-xl max-w-2xl max-sm:max-w-sm flex flex-col md:flex-row items-center justify-center border-[.8px] border-zinc-400 py-1 px-2 rounded-full gap-2 shadow-2xl  focus-within:border-gray-300 drop-shadow-lg dark:drop-shadow-3xl"
						htmlFor="search"
					>
						<input
							id="search-bar"
							placeholder="Enter City Name.."
							name="search"
							required={true}
							onChange={handleSearchChange}
							className="px-10 ml-7 max-sm:ml-2 dark:text-white text-black tracking-wider font-semibold text-base py-1 max-sm:py-0 w-full max-sm:w-2/3 max-sm:px-2 rounded-md flex-1 outline-none bg-transparent dark:placeholder:text-gray-100 max-sm:placeholder:text-[11px] dark:placeholder:text-opacity-80 placeholder:text-gray-400 placeholder:w-[150%]"
						/>

						<button className="w-full md:w-auto ml-12 max-sm:ml-0 px-6 max-sm:p-1 py-2 max-sm:w-1/4 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-full transition-all">
							<div className="flex items-center transition-all opacity-1">
								{loading ? (
									<span className="text-sm max-w-16	 font-semibold whitespace-nowrap truncate mx-auto">
										<Image
											priority={true}
											src="/loading.gif"
											width={20}
											height={20}
											alt="Searching🔍"
										/>
									</span>
								) : (
									<span className="text-sm max-sm:text-[10px] max-w-16	 font-semibold whitespace-nowrap truncate mx-auto">
										Search
									</span>
								)}
							</div>
						</button>
					</label>
				</form>
				{state.error && (
					<div className="absolute top-full max-sm:px-3 max-sm:left-1/4 max-sm:py-1 left-1/4 mr-10 right-0 w-fit">
						<SearchError errorMsg={state.error}></SearchError>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
