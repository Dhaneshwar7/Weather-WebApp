export const fetchWeatherData = async ({
	lat = null,
	long = null,
	debouncedSearch: searchQuery,
}) => {
	let currentLocation;
	let latitude = lat;
	let longitude = long;
	let timezone;
	let data;
	let forecastData;
	console.log(`${lat}`);
	console.log(`${long}`);
	// let currentCord = { lat: lat, long: long };
	// console.log(currentCord);
	// console.log(`${debouncedSearch}`);
	console.log(`${searchQuery}`);
	try {
		if (searchQuery) {
			const searchResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=38563a45e910840c283837a6959d2880`
			);
			if (!searchResponse.ok) {
				throw new Error('Weather data not available');
			}
			let data = await searchResponse.json();
			console.log(data);
			let { lat, lon } = data.coord;
			currentLocation = data.name;
			latitude = lat;
			longitude= lon;
			timezone = data.timezone;
			console.log(timezone);
		}

		if (latitude && longitude) {
			// // This Fetch api for when Locate from current Location  , lat & long
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
			localStorage.setItem('current-location', data.name)

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
		}

		localStorage.setItem('weather-data', JSON.stringify(data));
		localStorage.setItem('forecast-data', JSON.stringify(forecastData));
		localStorage.setItem('timezone', timezone);

		console.log(forecastData);
		console.log(currentLocation);
		console.log(data);
		console.log(timezone);

		return { currentLocation, timezone, forecastData, data };
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return { error: error.message };
	}
};
