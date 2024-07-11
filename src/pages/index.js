import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Nav from '@/components/Nav/Nav';
import WeatherBox from '@/components/WeatherComponents/WeatherBox';

const popi = Poppins({ weight: '600', display: 'swap', subsets: ['latin'] });

export default function Home() {
	// 	let params = new URLSearchParams({
	// 		q: 'London',
	// 		limit: '2',
	// 		appid: 'fe7525cb58077d1151f33f61b2576dc5',
	// 	});

	// 	fetch(
	// 		`https://api.openweathermap.org/data/2.5/weather?lat=23.2584857&lon=77.401989&appid=38563a45e910840c283837a6959d2880
	// `
	// 	)
	// 		.then(res => res.json())
	// 		.then(console.log);
	return (
		<>
			<main className={`w-screen ${popi.className} min-h-screen py-8 px-10 max-sm:py-4 max-sm:px-3  bg-light-lg dark:bg-dark-lg transition-[background-image] duration-2000`}>
				<Nav />
				<WeatherBox />
			</main>
		</>
	);
}
