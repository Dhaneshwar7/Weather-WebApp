import React from 'react';

const FiveDaysForecast = () => {
	return (
		<div className="FiveDaysForecast  w-[33%] WeatherInfo drop-shadow-box dark:drop-shadow-dark  bg-l-col dark:bg-d-col/50  max-sm:min-h-[50vh] h-fit p-3 rounded-2xl max-sm:w-full max-sm:gap-2 max-sm:py-6 max-sm:px-5 flex-col max-sm:flex-col items-center justify-center">
			<heading className="text-center m-auto w-full">5 Days Forecast: working on this soon complete</heading>
			<div className="FiveDaysForecastList grid grid-cols-3 gap-4">
				{/* <div className="col-span-3 bg-green-400 flex items-center justify-between">
                    <div className="Clouds">cloud</div>
                    <div className="temp cl">22*c</div>
                    <div className="date">12/10/23</div>
                </div> */}
			</div>
		</div>
	);
};

export default FiveDaysForecast;
