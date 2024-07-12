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
		return { data, currentLocation };
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return { error: error.message };
	}
};
