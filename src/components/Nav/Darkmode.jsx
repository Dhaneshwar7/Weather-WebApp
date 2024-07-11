import React from 'react'

const Darkmode = ({setTheme,theme}) => {
  return (
		<div className="DarkModeButton relative">
			<button
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className="text-white bg-black rounded-full p-1  dark:text-black dark:bg-white flex items-center drop-shadow-lg	"
			>
				<label
					htmlFor="dark-toggle"
					className="flex items-center cursor-pointer"
				>
					<div className="relative">
						<div className="block border-[1px] dark:border-stone-200 border-gray-700 max-sm:h-5 max-sm:w-8 w-16 h-8 rounded-full">
							<div
								className={`dot absolute  max-sm:absolute max-sm:left-1/2 max-sm:top-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 trans top-1 ${
									theme === 'light'
										? 'left-2 max-sm:left-3'
										: 'left-1/2 max-sm:left-2/3'
								} transition-left-right duration-500 ease-in-out dark:bg-black bg-gray-100 max-sm:w-5 max-sm:h-5 w-6 h-6 rounded-full delay-300 flex items-center justify-center `}
							>
								{theme === 'light' ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-black"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 z-20 max-sm:w-4 max-sm:h-4 text-white"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
										/>
									</svg>
								)}
							</div>
						</div>
					</div>
				</label>
			</button>
			<div className="absolute flex-wrap whitespace-nowrap text-xs max-sm:text-[10px] mt-1">
				{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
			</div>
		</div>
	);
}

export default Darkmode