import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import React, { useState, useEffect, useContext } from 'react';

// Function to format a timestamp with a specific timezone offset
const formatTimestamp = (ts, offsetSeconds) => {
	const lang = 'en-US'; // use the current language
	const timeZone = formatOffset(offsetSeconds)
	// console.log(ts);
	// console.log(new Date(ts));
	// console.log(timeZone);
	// console.log(
	// 	new Date(ts).toLocaleTimeString(lang, { timeZone, hour12: true })
	// );
	// console.log(
	// 	new Intl.DateTimeFormat('en', { timeZone: 'Asia/Calcutta' }).format(
	// 		new Date()
	// 	)
	// );
	return new Date(ts).toLocaleTimeString(lang, { timeZone, hour12: true });
};

// Function to convert offset in seconds to string in ISO 8601 extended format.
// Example: 19800 => "+05:30"
const formatOffset = offsetSeconds => {
	const sign = offsetSeconds < 0 ? '-' : '+';
	const seconds = Math.abs(offsetSeconds);
	// console.log(seconds);
	const hours = Math.floor(seconds / 3600);
	// console.log(hours);
	const minutes = Math.floor((seconds % 3600) / 60);
	// console.log(minutes);
	// console.log(
	// 	`${sign}${hours.toString().padStart(2, '0')}:${minutes
	// 		.toString()
	// 		.padStart(2, '0')}`
	// );
	let val = `${sign}${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
	// console.log(val);
	return `${sign}${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
};

const Clock = () => {
	const { state } = useContext(WeatherDataContext);
	// console.log('acha yaha ');
	// console.log(state);
	const [currentTime, setCurrentTime] = useState(
		formatTimestamp(Date.now(), state.timezone)
	);
	// console.log(currentTime);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(formatTimestamp(Date.now(), state.timezone));
		}, 1000);
		console.log(`ooooo yee ${state.timezone}`);
		// console.log(typeof state.timezone);

		return () => clearInterval(interval);
	}, [state.timezone]);

	return (
		<div>
			<p>{currentTime}</p>
		</div>
	);
};

export default Clock;
