import {
  Roboto_Flex as Roboto,
} from 'next/font/google'

import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'


const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

// Importando as estilizações globais e fazendo a sua inicialização
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  )
}
