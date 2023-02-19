import '../styles/globals.css'
import { NextPageWithLayout } from 'types';
import type { AppProps } from 'next/app'

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <main className='h-full '>
      <div className='h-full '>
        { getLayout(<Component {...pageProps} />) }
     </div>
    </main>
  )
}