import '@/styles/globals.css';
import ErrorBoundary from '@/utils/ErrorBoundary';
import { WeatherDataProvider } from '@/utils/WeatherDataReducer';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
	return (
		<ErrorBoundary>
			<ThemeProvider attribute="class">
				<WeatherDataProvider>
					<Component {...pageProps} />
				</WeatherDataProvider>
			</ThemeProvider>
		</ErrorBoundary>
	);
}
