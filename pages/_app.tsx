import { useRouter } from 'next/router'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const getLayout = (Component as any).getLayout || ((page: AppProps) => page)
  return getLayout(<Component {...pageProps} key={router.asPath} />) 
}
