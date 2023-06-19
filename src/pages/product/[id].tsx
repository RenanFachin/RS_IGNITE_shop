import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string; // string pq estamos formatando
    description: string;
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>


        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}


// Fazendo a geração das páginas estáticas durante a build do projeto
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_O5YuClun0Kf64y' } }
    ],
    fallback: false
  }
}


export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  // Pegando o que está vindo como parâmetro
  const productId = params.id

  // Buscando do stripe o dado correspondente
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100), // O preço vem em centavos
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}