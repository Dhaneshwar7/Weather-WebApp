import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Darkmode from './Darkmode';
import SearchBar from './SearchBar';
import CurrentLocation from './CurrentLocation';

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
			<nav className="flex items-center justify-between w-full ">
				<Darkmode setTheme={setTheme} theme={theme} />
				<SearchBar setTheme={setTheme} theme={theme} />
				<CurrentLocation setTheme={setTheme} theme={theme} />
			</nav>
		</>
	);
};

export default Nav;
