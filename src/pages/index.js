import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Poppins } from 'next/font/google';
import Nav from '@/components/Nav/Nav';
import WeatherBox from '@/components/WeatherComponents/WeatherBox';
import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import {
	FiveDaysForecast,
	ForecastWrapper,
	HourlyForecast,
} from '@/components/ForecastComponents';

const popi = Poppins({
	weight: '600',
	display: 'swap',
	subsets: ['latin'],
	preload: true,
});
export default function Home({ data, forecastData }) {
	const { state, dispatch } = useContext(WeatherDataContext);
	const [mounted, setMounted] = useState(false);
	// console.log(state);

	useEffect(() => {
		if (!localStorage.getItem('lat')) {
			dispatch({
				type: 'WEATHER_DATA',
				weatherData: data,
			});
			dispatch({ type: 'FORECAST_DATA', forecastData });
			dispatch({ type: 'SET_TIMEZONE', timezone: data.timezone });
			localStorage.setItem('weather-data', JSON.stringify(data));
			localStorage.setItem('timezone', data.timezone);
			localStorage.setItem('forecast-data', JSON.stringify(forecastData));
		}
	}, [data, dispatch, forecastData]);

	useEffect(() => {
		setMounted(true);
		dispatch({
			type: 'WEATHER_DATA',
			weatherData: JSON.parse(localStorage.getItem('weather-data')),
		});
		dispatch({
			type: 'FORECAST_DATA',
			forecastData: JSON.parse(localStorage.getItem('forecast-data')),
		});
		dispatch({
			type: 'SET_TIMEZONE',
			timezone: JSON.parse(localStorage.getItem('timezone')),
		});
		dispatch({
			type: 'ADD_CURRENT_LOCATION',
			currentLocation: state.currentLocation,
		});
	}, [dispatch, data]);
	if (!mounted) return null;
	return (
		<>
			<main
				className={`w-screen ${popi.className} min-h-screen relative max-h-fit pt-8 pb-3 px-10 max-sm:py-4 max-sm:px-3  bg-light-lg dark:bg-dark-lg transition-[background-image] duration-2000`}
			>
				<div className="w-full pt-4 container rounded-xl h-[10vh] hidden max-sm:block bg-l-col dark:bg-d-col backdrop-blur-xl sticky z-50 m-auto top-0 left-0 right-0">
					<Nav />
				</div>

				<div className="block max-sm:hidden">
					<Nav />
				</div>
				<div className="pt-10  max-sm:py-3">
					<WeatherBox />
				</div>
				<div className="">
					<ForecastWrapper />
				</div>
			</main>
		</>
	);
}

export async function getStaticProps() {
	let cord = { lat: 22.72, long: 75.86 };
	let data;
	let forecastData;
	let timezone;
	let renderError;
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${cord.lat}&lon=${cord.long}&appid=38563a45e910840c283837a6959d2880`
		);
		if (!response.ok) {
			throw new Error('Weather data not available');
		}
		data = await response.json();

		const forecastResponse = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${cord.lat}&lon=${cord.long}&appid=38563a45e910840c283837a6959d2880`,
			{
				next: { revalidate: 10 },
			}
		);
		if (!forecastResponse.ok) {
			throw new Error('Forecast data not available');
		}
		forecastData = await forecastResponse.json();
	} catch (error) {
		console.log(error.message);
		renderError = error.message;
	}

	return {
		props: {
			data: data || null,
			forecastData: forecastData || null,
		},
		revalidate: 30,
	};
}
