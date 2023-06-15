import {
  Roboto_Flex as Roboto,
} from 'next/font/google'

import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'
import Image from 'next/image'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

// Importando as estilizações globais e fazendo a sua inicialização
globalStyles()

import logoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={roboto.className}>
      <Header>
        <Image src={logoImg} alt="" />
      </Header> 
      <Component {...pageProps} />
    </Container>
  )
}
