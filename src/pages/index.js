import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import Nav from '@/components/Nav/Nav';
import WeatherBox from '@/components/WeatherComponents/WeatherBox';

const popi = Poppins({ weight: '600', display: 'swap', subsets: ['latin'] });
export default function Home() {
	const [weatherData, setWeatherData] = useState(null);
	const [mounted, setMounted] = useState(false);

	// 	let params = new URLSearchParams({
	// 		q: 'London',
	// 		limit: '2',
	// 		appid: 'fe7525cb58077d1151f33f61b2576dc5',
	// 	});
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	const [error, setError] = useState(null);

	useEffect(() => {
		setMounted(true);
	}, []);
	useEffect(() => {
		setMounted(true);
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.latitude,
					});
					localStorage.setItem('lat', position.coords.latitude);
					localStorage.setItem('long', position.coords.latitude);
				},
				error => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							console.error('User denied the request for geolocation.');
							break;
						case error.POSITION_UNAVAILABLE:
							console.error('Location information is unavailable.');
							break;
						case error.TIMEOUT:
							console.error('The request to get user location timed out.');
							break;
						case error.UNKNOWN_ERROR:
							console.error('An unknown error occurred.');
							break;
					}
				}
			);
		} else {
			setError('Geolocation is not supported by this browser.');
		}

		return () => {
			setWeatherData(null); // Reset weather data on component unmount
		};
	}, []);
	// console.log(location);
	useEffect(() => {
		function fetchData() {
			try {
				fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=23.2584857&lon=77.401989&appid=38563a45e910840c283837a6959d2880`
				)
					.then(res => res.json())
					.then(data => setWeatherData(data))
					.catch(err => console.log(err));
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
		// console.log(weatherData);
	}, []);
	// console.log(weatherData);

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
