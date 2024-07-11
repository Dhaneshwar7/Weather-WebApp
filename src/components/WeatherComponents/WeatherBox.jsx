import React from 'react';

import { Mochiy_Pop_One } from 'next/font/google';
import Image from 'next/image';
import humiditySvg from '../../../public/Icons/humidity.svg';
import windspeedSvg from '../../../public/Icons/wind.svg';
import pressureSvg from '../../../public/Icons/pressure.svg';
import uvSvg from '../../../public/Icons/uv.svg';
import bigSunSvg from '../../../public/Icons/bigsun.svg'; 

const mpopi = Mochiy_Pop_One({
	weight: '400',
	display: 'swap',
	subsets: ['latin'],
});

const WeatherBox = () => {
	return (
		<>
			<div className="WeatherBox flex flex-row max-sm:flex-col items-center justify-between h-[40vh] bg-slate-500 py-3 px-2 gap-8">
				<div className="BasicInfo grow bg-d-col w-[37%] max-sm:w-full max-sm:py-4 h-full rounded-2xl flex flex-col items-center justify-center">
					<div className={`Location mb-10 max-sm:mb-4 ${mpopi.className}`}>
						<h2 className="text-4xl max-sm:text-2xl ">Bhopal</h2>
					</div>
					<div className="Time text-center">
						<h1 className="text-6xl max-sm:text-4xl">09:03</h1>
						<h3 className="text-xl max-sm:text-base">Thursday, 31 Aug</h3>
					</div>
				</div>
				<div className="WeatherInfo bg-d-col w-3/5 h-full rounded-2xl max-sm:w-full flex">
					<div className="h-full flex-col items-center container justify-center m-auto bg-blue-200">
						<div className="Temperature ">
							<h1 className="text-6xl max-sm:text-4xl">24 C </h1>
							<div className="FeelLike">
								<h3> Feels Like:22 C</h3>{' '}
							</div>
						</div>
						<div className="SunRiseSunSet">
							<div className="SunRise">
								<span></span>
								<div>
									<h3>Sunrise</h3>
									<p>06:37 AM</p>
								</div>
							</div>
							<div className="SunRise">
								<span></span>
								<div>
									<h3>Sunset</h3>
									<p>18:37 PM</p>
								</div>
							</div>
						</div>
					</div>
					<div className="m-auto container bg-red-300 h-full">
						<div className="SunImage">
							<div className="w-52 block h-52 m-auto">
								<Image src={bigSunSvg} />
							</div>
							<h3 className={`text-center text-3xl italic ${mpopi.className}`}>Sunny</h3>
						</div>
					</div>
					<div className="m-auto container bg-green-300 h-full grid grid-cols-2 gap-2">
						<div class="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image src={humiditySvg} width={40} height={40} />
							<h3>41%</h3>
							<p className="text-xs">Humidity</p>
						</div>
						<div class="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image src={windspeedSvg} width={40} height={40} />
							<h3>41%</h3>
							<p className="text-xs">Wind Speed</p>
						</div>
						<div class="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image src={pressureSvg} width={48} height={48} />
							<h3>41%</h3>
							<p className="text-xs">Pressure</p>
						</div>
						<div class="text-center m-auto flex flex-col w-full justify-evenly items-center gap-1">
							<Image src={uvSvg} width={40} height={40} />
							<h3>41%</h3>
							<p className="text-xs">UV</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WeatherBox;
