import {
  Roboto_Flex as Roboto,
} from 'next/font/google'

import type { AppProps } from 'next/app'


const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  )
}
