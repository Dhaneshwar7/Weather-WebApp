import React, { useEffect, useState } from 'react';

import { Mochiy_Pop_One } from 'next/font/google';
import Image from 'next/image';
import humiditySvg from '../../../public/Icons/humidity.svg';
import windspeedSvg from '../../../public/Icons/wind.svg';
import pressureSvg from '../../../public/Icons/pressure.svg';
import uvSvg from '../../../public/Icons/uv.svg';
import bigSunSvg from '../../../public/Icons/BigSunPic.svg';
import sunRise from '../../../public/Icons/sunrise.svg';
import sunSet from '../../../public/Icons/sunset.svg';
import { useTheme } from 'next-themes';

const mpopi = Mochiy_Pop_One({
	weight: '400',
	display: 'swap',
	subsets: ['latin'],
});
const WeatherBox = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const iconBlack = {
		width: 'auto',
		height: 'auto',
		filter: 'invert(1) brightness(0)',
	};
	const iconWhite = {
		width: 'auto',
		height: 'auto',
		filter: 'invert(0) brightness(1)',
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	return (
		<>
			<div className="WeatherBox flex flex-row max-sm:flex-col items-center justify-between max-sm:h-auto h-[40vh] py-3 px-2 gap-8 max-sm:py-5 max-sm:gap-4">
				<div className="BasicInfo grow bg-l-col dark:bg-d-col w-[37%] max-sm:w-full max-sm:py-4 h-full rounded-2xl flex flex-col items-center drop-shadow-box justify-center">
					<div className={`Location mb-10 max-sm:mb-4 ${mpopi.className}`}>
						<h2 className="text-4xl max-sm:text-2xl ">Bhopal</h2>
					</div>
					<div className="Time text-center">
						<h1 className="text-6xl max-sm:text-4xl">09:03</h1>
						<h3 className="text-xl max-sm:text-base">Thursday, 31 Aug</h3>
					</div>
				</div>
				<div className="WeatherInfo drop-shadow-box bg-l-col dark:bg-d-col w-3/5 max-sm:min-h-[50vh] h-full p-3 rounded-2xl max-sm:w-full max-sm:gap-4 flex max-sm:flex-col">
					<div className="Left flex flex-col items-center container max-sm:flex-row justify-center m-auto ">
						<div className="Temperature container text-center m-auto  py-3 mb-3">
							<h1 className="text-6xl max-sm:text-6xl">24 C </h1>
							<div className="FeelLike">
								<h3> Feels Like:22 C</h3>{' '}
							</div>
						</div>
						<div className="SunRiseSunSet container flex items-center justify-center flex-col gap-2 m-auto">
							<div className="SunRise flex gap-2 items-center justify-center">
								<Image
									priority={true}
									alt="weather pics"
									src={sunRise}
									style={theme === 'light' ? iconBlack : iconWhite}
									width={48}
									height={48}
								/>
								<div className="text-sm">
									<h3>Sunrise</h3>
									<p>06:37 AM</p>
								</div>
							</div>
							<div className="SunRise flex gap-2 items-center justify-center">
								<Image
									priority={true}
									alt="weather pics"
									src={sunSet}
									style={theme === 'light' ? iconBlack : iconWhite}
									width={48}
									height={48}
								/>

								<div className="text-sm">
									<h3>Sunset</h3>
									<p>18:37 PM</p>
								</div>
							</div>
						</div>
					</div>
					<div className="Middle m-auto container h-full">
						<div className="SunImage">
							<div className="w-48 block h-48 max-sm:w-32 max-sm:h-32 m-auto">
								<Image
									priority={true}
									alt="weather pics"
									src={bigSunSvg}
									style={{ width: 'auto', heigh: 'auto' }}
								/>
							</div>
							<h3
								className={`text-center text-3xl max-sm:text-xl italic ${mpopi.className}`}
							>
								Sunny
							</h3>
						</div>
					</div>
					<div className="Right m-auto container  h-full grid grid-cols-2 gap-2">
						<div className="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image
								priority={true}
								alt="weather pics"
								src={humiditySvg}
								style={theme === 'light' ? iconBlack : iconWhite}
								width={40}
								height={40}
							/>
							<h3>41%</h3>
							<p className="text-xs">Humidity</p>
						</div>
						<div className="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image
								priority={true}
								alt="weather pics"
								src={windspeedSvg}
								style={theme === 'light' ? iconBlack : iconWhite}
								width={40}
								height={40}
							/>
							<h3>2Km/h</h3>
							<p className="text-xs">Wind Speed</p>
						</div>
						<div className="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image
								priority={true}
								alt="weather pics"
								src={pressureSvg}
								style={theme === 'light' ? iconBlack : iconWhite}
								width={40}
								height={40}
							/>
							<h3>997pha</h3>
							<p className="text-xs">Pressure</p>
						</div>
						<div className="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image
								priority={true}
								alt="weather pics"
								src={uvSvg}
								style={theme === 'light' ? iconBlack : iconWhite}
								width={40}
								height={40}
							/>
							<h3>8</h3>
							<p className="text-xs">UV</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WeatherBox;
