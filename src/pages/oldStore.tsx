import { StoreGetProductsParams } from "@medusajs/medusa"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useState } from "react"
import { NextPageWithLayout } from "types/global"

const Store: NextPageWithLayout = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  return (
    <>
      <Head title="Store" description="Explore all of our products." />
      <div className="container">

        <div className="flex ">
          <RefinementList refinementList={params} setRefinementList={setParams} />
          <InfiniteProducts params={params} />
        </div>
      </div>
    </>
  )
}

Store.getLayout = (page) => <Layout>{page}</Layout>

export default Store
