import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Darkmode from './Darkmode';
import SearchBar from './SearchBar';
import CurrentLocation from './CurrentLocation';

const Nav = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	return (
		<>
			<nav className="flex items-center justify-between w-full z-50 top-0 max-sm:px-4">
				<Darkmode setTheme={setTheme} theme={theme} />
				<SearchBar setTheme={setTheme} theme={theme} />
				<CurrentLocation setTheme={setTheme} theme={theme} />
			</nav>
		</>
	);
};

export default Nav;
