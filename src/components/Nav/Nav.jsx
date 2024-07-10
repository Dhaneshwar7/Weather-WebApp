import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const Nav = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	const handleSearchChange = () => {};

	if (!mounted) return null;
	return (
		<>
			<nav className="flex  items-center justify-between w-full ">
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
				<div className="SearchBar">
					<div className="container mx-auto flex max-sm:px-1  p-1">
						<form action="/search" className="max-sm:w-full ml-12 max-sm:ml-0">
							<label
								className="mx-auto max-sm:mt-0 relative max-sm:flex max-sm:justify-betwee max-sm:whitespace-nowrap max-sm:flex-row bg-gray-100 dark:bg-d-col min-w-xl max-w-2xl max-sm:max-w-sm flex flex-col md:flex-row items-center justify-center border-[.8px] border-zinc-400 py-1 px-2 rounded-full gap-2 shadow-2xl  focus-within:border-gray-300 drop-shadow-lg dark:drop-shadow-3xl"
								htmlFor="search"
							>
								<input
									id="search-bar"
									placeholder="Enter Your City Name"
									name="search"
									required={true}
									onChange={handleSearchChange}
									className="px-5 ml-7 max-sm:ml-2 dark:text-white text-black tracking-wider font-semibold text-base py-1 max-sm:py-0 w-full max-sm:w-2/3 max-sm:px-2 rounded-md flex-1 outline-none bg-transparent dark:placeholder:text-gray-400 max-sm:placeholder:text-xs dark:placeholder:text-opacity-80 placeholder:text-gray-400 "
								/>
								<button
									type="submit"
									className="w-full md:w-auto ml-12 max-sm:ml-0 px-6 max-sm:p-1 py-2 max-sm:w-1/4 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-full transition-all"
								>
									<div className="flex items-center transition-all opacity-1">
										{loading ? (
											<span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
												{/* <Image
													src="/loading.gif"
													width={20}
													height={20}
													alt="Searching🔍"
												/> */}
											</span>
										) : (
											<span className="text-sm max-sm:text-[10px] font-semibold whitespace-nowrap truncate mx-auto">
												Search
											</span>
										)}
									</div>
								</button>
							</label>
						</form>
					</div>
				</div>
				<div className="CurrentLocation">
					<label
						className="mx-auto max-sm:mt-0 max-sm:w-full relative max-sm:flex max-sm:justify-betwee max-sm:whitespace-nowrap max-sm:flex-row bg-green-100 dark:bg-d-col min-w-xl max-w-2xl max-sm:max-w-sm flex flex-col md:flex-row items-center justify-center border-[.8px] border-zinc-400 py-1 px-1 rounded-full gap-2 shadow-2xl  focus-within:border-gray-300 drop-shadow-lg dark:drop-shadow-3xl"
						htmlFor="search"
					>
						<button
							type="submit"
							className="w-full md:w-auto px-3 max-sm:p-1 py-2 max-sm:w-full dark:bg-green-700 text-black dark:text-gray-100 dark:hover:bg-green-600 bg-green-400 hover:bg-green-500 border-black fill-white active:scale-95 duration-100 border-[.5px] will-change-transform overflow-hidden relative rounded-full transition-all"
						>
							<div className="flex items-center transition-all opacity-1 gap-1">
								<span className="text-sm max-sm:text-xs font-semibold whitespace-nowrap truncate mx-auto">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5 max-sm:w-7 max-sm:h-5"
									>
										<path d="M11 17.9381C7.05369 17.446 4 14.0796 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 14.0796 16.9463 17.446 13 17.9381V20.0116C16.9463 20.1039 20 20.7351 20 21.5C20 22.3284 16.4183 23 12 23C7.58172 23 4 22.3284 4 21.5C4 20.7351 7.05369 20.1039 11 20.0116V17.9381ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"></path>
									</svg>
								</span>
								<span className="text-sm max-sm:text-[8px] max-sm:hidden font-semibold whitespace-nowrap truncate mx-auto">
									Current Location
								</span>
							</div>
						</button>
					</label>
				</div>
			</nav>
		</>
	);
};

export default Nav;
