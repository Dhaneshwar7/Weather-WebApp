export const fetchWeatherData = async (lat, long) => {
	let currentLocation;
	let setError;
	// console.log(`${lat}`);
	// console.log(`${long}`);
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=38563a45e910840c283837a6959d2880`,
			{
				next: { revalidate: 10 },
			}
		);
		if (!response.ok) {
			throw new Error('Weather data not available');
		}
		const data = await response.json();
		// console.log(data);
		currentLocation = data.name;
		localStorage.setItem('current-location', data.name);
		localStorage.setItem('weather-data', JSON.stringify(data));

		const forecastResponse = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=38563a45e910840c283837a6959d2880`,
			{
				next: { revalidate: 10 },
			}
		);

		if (!forecastResponse.ok) {
			throw new Error('Forecast data not available');
		}

		const forecastData = await forecastResponse.json();
		localStorage.setItem('forecast-data', JSON.stringify(forecastData));

		// console.log(forecastData);

		return { data, currentLocation, forecastData };
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return { error: error.message };
	}
};
