import '@/styles/globals.css';
import { WeatherDataProvider } from '@/utils/WeatherDataReducer';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
	return (
			<ThemeProvider attribute="class">
				<WeatherDataProvider>
					<Component {...pageProps} />
				</WeatherDataProvider>
			</ThemeProvider>

	);
}
