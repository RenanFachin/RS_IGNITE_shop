import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success() {

  return (
    <SuccessContainer>
      <h1>Compra efeturada!</h1>

      <ImageContainer>

      </ImageContainer>

      <p>
        Uhhuuu <strong>xxxxxxx</strong>, Sua camiseta <strong>xxxxxxx</strong> já está a caminhao da sua casa
      </p>


      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}