import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {

  return (
    <>
      <Head>
        <title>Compra efetuada| Ignite Shop</title>

        {/* "Pedindo" para a página não ser indexada pelas buscas*/}
        <meta name="robots" content="noindex" /> 
      </Head>

      <SuccessContainer>
        <h1>Compra efeturada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuuul <strong>{customerName}</strong>, Sua camiseta <strong>{product.name}</strong> já está a caminhao da sua casa
        </p>


        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {


  if (!query.session_id) {
    // Fazendo um redirect caso o usuário tente entrar um uma rota de sucesso com um query inválido
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  // session_id vem da rota
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  // console.log(session) -> Dentro do session tem informações de nome, email, total de compra, status de pagamento e etc. Porém, não vem os detalhes da compra, então teremos que expandir

  const customerName = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}