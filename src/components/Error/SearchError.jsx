import React from 'react';

const SearchError = ({ errorMsg }) => {
	return (
		<>
			<div
				class="flex items-center py-2 px-9  max-sm:p-[inherit] text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 "
				role="alert"
			>
				<svg
					class="flex-shrink-0 inline w-4 h-4 me-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
				</svg>
				<span class="sr-only">Info</span>
				<div>
					<span class="font-medium max-sm:text-xs max-sm:font-thin">
						{errorMsg === 'Failed to fetch'
							? 'Network Probleam'
							: errorMsg === 'Weather data not available'?'City Name not found':''}
						{/* {errorMsg} */}
					</span>
				</div>
			</div>
		</>
	);
};

export default SearchError;
