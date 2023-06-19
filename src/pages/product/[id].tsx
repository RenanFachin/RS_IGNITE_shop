import { stripe } from "@/lib/stripe"
import { ImageContainer, Loading, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { CircularProgress } from '@mui/material'

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string; // string pq estamos formatando
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
        <Loading>
          <CircularProgress color="success" size={50}/>
        </Loading>
    )
  }

  function handleBuyProduct(){
    console.log(product.defaultPriceId)
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>


        <button onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}


// Fazendo a geração das páginas estáticas durante a build do projeto
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // Tudo que estiver dentro de paths vai ser gerado durante o processo de build
    paths: [
      { params: { id: 'prod_O5YuClun0Kf64y' } }
    ],
    fallback: true
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
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}