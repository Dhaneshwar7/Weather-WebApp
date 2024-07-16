export const fetchWeatherData = async ({
	lat = null,
	long = null,
	debouncedSearch: searchQuery,
}) => {
	let currentLocation;
	let latitude = lat;
	let longitude = long;
	let searchLat;
	let searchLong;
	let timezone;
	let data;
	let forecastData;
	let errorMsg;
	// console.log(`${lat}`);
	// console.log(`${long}`);
	// console.log(`${searchQuery}`);
	try {
		if (searchQuery && searchQuery !== '') {
			const searchResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=38563a45e910840c283837a6959d2880`
			);
			if (!searchResponse.ok) {
				throw new Error('Weather data not available');
			}
			const searchData = await searchResponse.json();
			data = await searchData;
			timezone = data.timezone;
			searchLat = data.coord.lat;
			searchLong = data.coord.lon;

			const forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${searchLat}&lon=${searchLong}&appid=38563a45e910840c283837a6959d2880`,
				{
					next: { revalidate: 10 },
				}
			);
			if (!forecastResponse.ok) {
				throw new Error('Forecast data not available');
			}
			forecastData = await forecastResponse.json();
			// console.log(forecastData);
		}
	} catch (error) {
		// console.log(`Search Query fetch probleam${error.message}`);
		errorMsg = error.message;
		localStorage.setItem('error', errorMsg)
		return { errorMsg };
	}

	try {
		if (latitude && longitude) {
			// // This Fetch api for when Locate from current Location  , lat & long
			// console.log(latitude);
			// console.log(longitude);
			const weatherResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=38563a45e910840c283837a6959d2880`,
				{
					next: { revalidate: 10 },
				}
			);
			if (!weatherResponse.ok) {
				throw new Error('Weather data not available');
			}
			data = await weatherResponse.json();
			timezone = data.timezone;
			currentLocation = data.name;
			localStorage.setItem('current-location', currentLocation);
			const forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=38563a45e910840c283837a6959d2880`,
				{
					next: { revalidate: 10 },
				}
			);

			if (!forecastResponse.ok) {
				throw new Error('Forecast data not available');
			}

			forecastData = await forecastResponse.json();
			// console.log(forecastData);
		}

		localStorage.setItem('weather-data', JSON.stringify(data));
		localStorage.setItem('forecast-data', JSON.stringify(forecastData));
		localStorage.setItem('timezone', timezone);
		// console.log(data);
		// console.log(forecastData);
		// console.log(currentLocation);
		// console.log(timezone);
		return { timezone, forecastData, data };
	} catch (error) {
		// console.log(`Latitude longitude fetch query probleam  ${error.message}`);
		errorMsg = error.message;
		localStorage.setItem('error', errorMsg);

		return { errorMsg };
	}
};
