import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import React, { useState, useEffect, useContext } from 'react';

// Function to format a timestamp with a specific timezone offset
const formatTimestamp = (ts, offsetSeconds) => {
	const lang = 'en-US'; // use the current language
	const timeZone = formatOffset(offsetSeconds)

    if (timeZone === 'Invalid') {
			return new Date(ts).toLocaleTimeString(lang, { hour12: true });
		}
	return new Date(ts).toLocaleTimeString(lang, { timeZone, hour12: true });
};

// Function to convert offset in seconds to string in ISO 8601 extended format.
// Example: 19800 => "+05:30"
const formatOffset = offsetSeconds => {
	 if (isNaN(offsetSeconds)) {
			return 'Invalid';
		}
	const sign = offsetSeconds < 0 ? '-' : '+';
	const seconds = Math.abs(offsetSeconds);
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	let val = `${sign}${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
	return `${sign}${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
};

const Clock = ({ timestamp, timezoneOffsetSeconds }) => {
	const { state } = useContext(WeatherDataContext);
	const [currentTime, setCurrentTime] = useState(
		formatTimestamp(Date.now(), state.timezone)
	);
	// console.log(currentTime);
	// console.log(timestamp);
	// console.log(timezoneOffsetSeconds);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(formatTimestamp(Date.now(), state.timezone));
		}, 1000);
		// console.log(`ooooo yee ${state.timezone}`);

		return () => clearInterval(interval);
	}, [state.timezone]);
	return (
		<div>
			<p>{currentTime}</p>
		</div>
	);
};

export default Clock;
