import React from 'react';
import { FiveDaysForecast, HourlyForecast } from '.';

const ForecastWrapper = () => {
	return (
		<div className="ForecastWrapper flex  dark:text-white text-neutral-800 flex-row max-sm:flex-col  justify-between max-sm:h-auto h-[40vh] py-3 px-2 gap-8 max-sm:py-5 max-sm:gap-4">
			<FiveDaysForecast />
			<HourlyForecast />
		</div>
	);
};

export default ForecastWrapper;
