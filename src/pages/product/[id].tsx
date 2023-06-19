import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero modi eligendi nemo, odit debitis error ad sit ipsa dignissimos commodi tempore nulla nobis consequatur vero cum aspernatur odio aliquid in?</p>


        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}