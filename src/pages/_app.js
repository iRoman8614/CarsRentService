import { FilterProvider } from '@/FilterContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <FilterProvider>
        <Component {...pageProps} />
      </FilterProvider>
  );
}

export default MyApp;

