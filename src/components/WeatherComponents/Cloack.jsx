import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import React, { useState, useEffect, useContext } from 'react';

// Function to format a timestamp with a specific timezone offset
const formatTimestamp = (ts, offsetSeconds) => {
	const lang = undefined; // use the current language
	const timeZone = formatOffset(offsetSeconds);
	return new Date(ts).toLocaleTimeString(lang, { timeZone, hour12: true });
};

// Function to convert offset in seconds to string in ISO 8601 extended format.
// Example: 19800 => "+05:30"
const formatOffset = offsetSeconds => {
	const sign = offsetSeconds < 0 ? '-' : '+';
	const seconds = Math.abs(offsetSeconds);
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return `${sign}${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`;
};

const Clock = () => {
	const { state } = useContext(WeatherDataContext);
	const [currentTime, setCurrentTime] = useState(
		formatTimestamp(Date.now(), state.timezone)
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(formatTimestamp(Date.now(), state.timezone));
		}, 1000);

		return () => clearInterval(interval);
	}, [state.timezone]);

	return (
		<div>
			<p>{currentTime}</p>
		</div>
	);
};

export default Clock;
