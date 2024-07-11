export default function fetchCurrentLocation(onLocationFetched) {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const lat = position.coords.latitude.toFixed(2);
					const long = position.coords.longitude.toFixed(2);
					localStorage.setItem('lat', lat);
					localStorage.setItem('long', long);
					onLocationFetched({ latitude: lat, longitude: long });
					resolve({ latitude: lat, longitude: long });
				},
				error => {
					let errorMessage = '';
					switch (error.code) {
						case error.PERMISSION_DENIED:
							errorMessage = 'User denied the request for geolocation.';
							break;
						case error.POSITION_UNAVAILABLE:
							errorMessage = 'Location information is unavailable.';
							break;
						case error.TIMEOUT:
							errorMessage = 'The request to get user location timed out.';
							break;
						default:
							errorMessage = `Geolocation Error: ${error.message}`;
							break;
					}
					// console.error('Geolocation Error:', error);
					reject(new Error(errorMessage));
				}
			);
		} else {
			reject(new Error('Geolocation is not supported by this browser.'));
		}
	});
}
