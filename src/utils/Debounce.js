import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
			setLoading(false);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay]);
	return { debouncedValue, loading };
};
