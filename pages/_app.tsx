import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <main className="font-inter">
      <Component {...pageProps} />
	  <Analytics />
    </main>
  );
}

export default App;
