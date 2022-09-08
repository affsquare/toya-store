import ProductTemplate from '@modules/products/templates'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
})

function productsDetails({product}:any) {

  const router = useRouter()
  const productId = router.query.handle

  // async function fetchData (){
  //   const data:any = await axios.get(`http://ec2-3-9-43-164.eu-west-2.compute.amazonaws.com:9000/store/products/${productId}`)  
  //   console.log(data);
    
  // }

//   const [products, setProducts] = useState({})
    
//     const apiURL = `http://ec2-3-9-43-164.eu-west-2.compute.amazonaws.com:9000` // Api Url

//     //Sort Function
//     async function getProducts() {
//         let response = await fetch(`${apiURL}/store/products${productId}`);

//         if (response.status == 200) {
//             const {data} = await response.json();
//             setProducts(data)
//             console.log(products);
            
//         }
//     }
  
// useEffect(() => {
//   // fetchData()
//   getProducts()
// })
const productDetalis = product.product

  return (
    <>
      {/* <Head
          description={productDetalis.description}
          title={productDetalis.title}
          image={productDetalis.thumbnail}
      /> */}
      <div className="cotainer">
        {/* {
          console.log(productDetalis)
          
        } */}
        
          
        <ProductTemplate product={productDetalis} />

      </div>
    </>
  )
}

export default productsDetails

const baseURL= process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

export async function getServerSideProps(context:any) {
// const data:any = axios.get(`http://ec2-3-9-43-164.eu-west-2.compute.amazonaws.com:9000/store/products/${context.params.handle}`)  
  const res = await fetch(`${baseURL}/store/products/${context.params.handle}`)
  const data = await res.json();
  return{
    props:{
      product: data
    }
  }
  
}

// export async function getStaticPaths() {
//   const res = await fetch(`${baseURL}/store/products`)
//   const data = await res.json();

//   const paths = data.map((d:any) => {
//     return{
//       params:{
//         id: `${d.id}`
//       }
//     }
//   })
//   return{
//     paths: paths,
//     fallback: false
//   }
  
// }

// import { medusaClient } from "@lib/config"
// import { IS_BROWSER } from "@lib/constants"
// import { getProductHandles } from "@lib/util/get-product-handles"
// import Head from "@modules/common/components/head"
// import Layout from "@modules/layout/templates"
// import ProductTemplate from "@modules/products/templates"
// import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
// import { GetStaticPaths, GetStaticProps } from "next"
// import { useRouter } from "next/router"
// import { ParsedUrlQuery } from "querystring"
// import { ReactElement } from "react"
// import { dehydrate, QueryClient, useQuery } from "react-query"
// import { NextPageWithLayout, PrefetchedPageProps } from "types/global"

// interface Params extends ParsedUrlQuery {
//   handle: string
// }

// const fetchProduct = async (handle: string) => {
//   return await medusaClient.products
//     .list({ handle })
//     .then(({ products }) => products[0])

//   // let data: any = await medusaClient + "/products"
//   // return data
//   //   .list({ handle })
//   //   .then(({ products }: any) => products[0])
// }

// const ProductPage: NextPageWithLayout<PrefetchedPageProps> = ({ notFound }) => {
//   const { query, isFallback, replace } = useRouter()
//   const handle = typeof query.handle === "string" ? query.handle : ""

//   const { data, isError, isLoading, isSuccess } = useQuery(
//     [`get_product`, handle],
//     () => fetchProduct(handle),
//     {
//       enabled: handle.length > 0,
//       keepPreviousData: true,
//     }
//   )

//   if (notFound) {
//     if (IS_BROWSER) {
//       replace("/404")
//     }

//     return <SkeletonProductPage />
//   }

//   if (isFallback || isLoading || !data) {
//     return <SkeletonProductPage />
//   }

//   if (isError) {
//     replace("/404")
//   }

//   if (isSuccess) {
//     return (
//       <>
//         <Head
//           description={data.description}
//           title={data.title}
//           image={data.thumbnail}
//         />
//         <ProductTemplate product={data} />
//       </>
//     )
//   }

//   return <></>
// }

// ProductPage.getLayout = (page: ReactElement) => {
//   return <Layout>{page}</Layout>
// }

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const handles = await getProductHandles()
//   return {
//     paths: handles.map((handle) => ({ params: { handle } })),
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const handle = context.params?.handle as string

//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery([`get_product`, handle], () =>
//     fetchProduct(handle)
//   )

//   const queryData = await queryClient.getQueryData([`get_product`, handle])

//   if (!queryData) {
//     return {
//       props: {
//         notFound: true,
//       },
//     }
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       notFound: false,
//     },
//   }
// }

// export default ProductPage
