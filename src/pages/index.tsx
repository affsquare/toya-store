import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Home = () => {
  return (
    <>
      <Head
        title="Home"
        description="Toya is the #1 best natural care products in Egypt. Enjoy Toya offers and discounts with the coupon Toya 10. Toya, your way for natural care.
        "
      />
      {/* <Hero /> */}
      <FeaturedProducts />
    </>
  )
}

// Home.getLayout = (page: ReactElement) => {
//   return <Layout>{page}</Layout>
// }

export default Home
