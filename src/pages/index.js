import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Poppins } from 'next/font/google';
import Nav from '@/components/Nav/Nav';
import WeatherBox from '@/components/WeatherComponents/WeatherBox';
import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import fetchCurrentLocation from '@/utils/GetLoc';

const popi = Poppins({ weight: '600', display: 'swap', subsets: ['latin'] });
export default function Home({ data }) {
	const { state, dispatch } = useContext(WeatherDataContext);
	const [mounted, setMounted] = useState(false);
	// const [currentLocation, setCurrentLocation] = useState('Current Location');

	// console.log(data);
	console.log(state);
	console.log(data);
	// 	let params = new URLSearchParams({
	// 		q: 'London',
	// 		limit: '2',
	// 		appid: 'fe7525cb58077d1151f33f61b2576dc5',
	// 	});

	// console.log(location);

	// Function to handle fetching weather data based on lat and long

	useEffect(() => {
		if (data) {
			dispatch({
				type: 'WEATHER_DATA',
				weatherData: data,
			});
			localStorage.setItem('weather-data', JSON.stringify(data));
			console.log('Initial data set in context');
		}
	}, [data, dispatch]);

	useEffect(() => {
		setMounted(true);
		// console.log(data);
		dispatch({
			type: 'WEATHER_DATA',
			weatherData: JSON.parse(localStorage.getItem('weather-data')),
		});
		dispatch({
			type: 'ADD_CURRENT_LOCATION',
			currentLocation: localStorage.getItem('current-location'),
		});
	}, [dispatch, data]);
	if (!mounted) return null;
	return (
		<>
			<main
				className={`w-screen ${popi.className} min-h-screen max-h-fit py-8 px-10 max-sm:py-4 max-sm:px-3  bg-light-lg dark:bg-dark-lg transition-[background-image] duration-2000`}
			>
				<Nav />
				<WeatherBox />

				{/* <p>
					Latitude: {location.latitude} <br />
					Longitude: {location.longitude}
				</p> */}
			</main>
		</>
	);
}

export async function getStaticProps() {
	let cord = { lat: 22.72, long: 75.86 };
	let data;
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${cord.lat}&lon=${cord.long}&appid=38563a45e910840c283837a6959d2880`
		);
		if (!response.ok) {
			throw new Error('Weather data not available');
		}
		console.log(response);
		data = await response.json();

		// data = await JSON.parse(JSON.stringify(data)); // step required during deployment in staticProps
	} catch (error) {
		console.log(error.message);
	}

	return {
		props: {
			data: data || null,
		},
		revalidate: 10,
	};
}
