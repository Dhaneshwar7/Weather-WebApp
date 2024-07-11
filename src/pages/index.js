import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Poppins } from 'next/font/google';
import Nav from '@/components/Nav/Nav';
import WeatherBox from '@/components/WeatherComponents/WeatherBox';
import { WeatherDataContext } from '@/utils/WeatherDataReducer';

const popi = Poppins({ weight: '600', display: 'swap', subsets: ['latin'] });
export default function Home() {
	const { state, dispatch } = useContext(WeatherDataContext);
	const [weatherData, setWeatherData] = useState(null);
	const [mounted, setMounted] = useState(false);
	const [currentLocation, setCurrentLocation] = useState('Current Location');
	const [location, setLocation] = useState({ lat: null, long: null });
	const geoLocationRef = useRef();
	const handleLocationFetched = location => {
		setLocation(location);
	};

	// 	let params = new URLSearchParams({
	// 		q: 'London',
	// 		limit: '2',
	// 		appid: 'fe7525cb58077d1151f33f61b2576dc5',
	// 	});

	// console.log(location);

	// Function to handle fetching weather data based on lat and long

	useEffect(() => {
		setMounted(true);
		dispatch({
			type: 'WEATHER_DATA',
			weatherData: JSON.parse(localStorage.getItem('weather-data')),
		});
		dispatch({
			type: 'ADD_CURRENT_LOCATION',
			currentLocation: localStorage.getItem('current-location'),
		});
	}, [dispatch]);
	if (!mounted) return null;
	return (
		<>
			<main
				className={`w-screen ${popi.className} min-h-screen max-h-fit py-8 px-10 max-sm:py-4 max-sm:px-3  bg-light-lg dark:bg-dark-lg transition-[background-image] duration-2000`}
			>
				<Nav />
				<WeatherBox />

				<p>
					Latitude: {location.latitude} <br />
					Longitude: {location.longitude}
				</p>
			</main>
		</>
	);
}
