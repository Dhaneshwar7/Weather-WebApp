import { useState, forwardRef, useImperativeHandle } from 'react';

const GeoLocation = forwardRef((props, ref) => {
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	const [error, setError] = useState(null);

	useImperativeHandle(ref, () => ({
		fetchLocation() {
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(
					position => {
						const lat = position.coords.latitude.toFixed(2);
						const long = position.coords.longitude.toFixed(2);
						setLocation({ latitude: lat, longitude: long });
						localStorage.setItem('lat', lat);
						localStorage.setItem('long', long);
						props.onLocationFetched({ latitude: lat, longitude: long });
					},
					error => {
						switch (error.code) {
							case error.PERMISSION_DENIED:
								setError('User denied the request for geolocation.');
								break;
							case error.POSITION_UNAVAILABLE:
								setError('Location information is unavailable.');
								break;
							case error.TIMEOUT:
								setError('The request to get user location timed out.');
								break;
							case error.UNKNOWN_ERROR:
								setError('An unknown error occurred.');
								break;
						}
					}
				);
			} else {
				setError('Geolocation is not supported by this browser.');
			}
		},
	}));

	return (
        <></>
		// <div>
		// 	{error && <p>Error: {error}</p>}
		// 	{location.latitude && location.longitude && (
		// 		<p>
		// 			Latitudee: {location.latitude} <br />
		// 			Longitudee: {location.longitude}
		// 		</p>
		// 	)}
		// </div>
	);
});

export default GeoLocation;
