import React, { useContext, useEffect, useState } from 'react';

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
import { WeatherDataContext } from '@/utils/WeatherDataReducer';
import timeConverter from '@/utils/GetTimeConversion';

const mpopi = Mochiy_Pop_One({
	weight: '400',
	display: 'swap',
	subsets: ['latin'],
});
const WeatherBox = () => {
	const { state, dispatch } = useContext(WeatherDataContext);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [wdata, setWData] = useState({
		feelsLike: '',
		humidity: '',
		pressure: '',
		windy: '',
		visibility: '',
		toDay: '',
		currenTime: '',
		date: null,
		currentLocation: 'Location',
		sunrise: '',
		sunset: '',
	});
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
		if (state.data) {
			const result = state.data.main;
			const alldata = state.data;
			// console.log(timeConverter(alldata.dt));
			let todayDateTime = timeConverter(alldata.dt);
			let sunriseTime = timeConverter(alldata.sys.sunrise);
			let sunsetTime = timeConverter(alldata.sys.sunset);
			dispatch({ type: 'SET_DATE', edate: todayDateTime });

			// console.log(todayDateTime);
			setWData({
				temperature: (result.temp - 273.15).toFixed(1),
				feelsLike: (result.feels_like - 273.15).toFixed(2),
				humidity: result.humidity,
				pressure: result.pressure,
				windy: parseFloat(alldata.wind.speed * 3.6).toFixed(2),
				visibility: alldata.visibility / 1000,
				date: todayDateTime,
				currentLocation: state.data.name,
				sunrise: sunriseTime.currenTime,
				sunset: sunsetTime.currenTime,
			});
		}
	}, [state.data, dispatch]);

	if (!mounted) return null;
	return (
		<>
			<div className="WeatherBox flex flex-row max-sm:flex-col items-center justify-between max-sm:h-auto h-[40vh] py-3 px-2 gap-8 max-sm:py-5 max-sm:gap-4">
				<div className="BasicInfo grow backdrop-blur-sm bg-l-col/30 dark:bg-d-col/50 w-[37%] max-sm:w-full max-sm:py-4 h-full rounded-2xl flex flex-col items-center drop-shadow-box justify-center">
					<div className={`Location mb-10 max-sm:mb-4 ${mpopi.className}`}>
						<h2 className="text-4xl max-sm:text-2xl ">
							{wdata.currentLocation}
						</h2>
					</div>
					<div className="Time text-center">
						<h1 className="text-6xl max-sm:text-4xl">
							{wdata?.date?.currenTime}
						</h1>
						<h3 className="text-xl max-sm:text-base">{wdata?.date?.toDay}</h3>
					</div>
				</div>
				<div className="WeatherInfo drop-shadow-box backdrop-blur-sm bg-l-col/30 dark:bg-d-col/50 w-3/5 max-sm:min-h-[50vh] h-full p-3 rounded-2xl max-sm:w-full max-sm:gap-4 max-sm:py-6 max-sm:px-5 flex max-sm:flex-col">
					<div className="Left flex flex-col items-center container max-sm:flex-row justify-center m-auto ">
						<div className="Temperature container text-center m-auto  py-3 mb-3 max-sm:mb-0">
							<h1 className="text-6xl max-sm:text-6xl">{wdata.temperature}C</h1>
							<div className="FeelLike max-sm:mt-2">
								<h3> Feels Like : {wdata.feelsLike}</h3>{' '}
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
									className="max-sm:w-36 max-sm:h-36 max-sm:scale-75"
								/>
								<div className="text-sm">
									<h3>Sunrise</h3>
									<p>{wdata.sunrise}</p>
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
									className="max-sm:w-36 max-sm:h-36 max-sm:scale-75"
								/>

								<div className="text-sm">
									<h3>Sunset</h3>
									<p>{wdata.sunset}</p>
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
								className="max-sm:scale-75"
							/>
							<h3 className="text-sm">{wdata.humidity}%</h3>
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
								className="-mt-1 max-sm:scale-75"
							/>
							<h3 className="text-sm">{wdata.windy}Km/h</h3>
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
								className="max-sm:scale-75"
							/>
							<h3 className="text-sm">{wdata.pressure}pha</h3>
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
								className="max-sm:scale-75"
							/>
							<h3 className="text-sm">{wdata.visibility} Km</h3>
							<p className="text-[10px]">Visibility</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WeatherBox;
