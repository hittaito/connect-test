import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component className="w-full h-full" {...pageProps} />
}

export default MyApp
