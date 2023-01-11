import { ProductProvider } from "@lib/context/product-context"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { fetchCollectionProducts } from "@pages/collections/[id]"
import axios, { Axios } from "axios"
import { useCart } from "medusa-react"
import React, { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "react-query"
import {MEDUSA_BACKEND_URL} from "../../../lib/config"

const httpClient = axios.create({
  baseURL: MEDUSA_BACKEND_URL
})


type CollectionTemplateProps = {
  collection: {
    id: string
    title: string
  }
}

interface IFilterSorter {
  search?: string;
  filter?: Record<string, string>;
  order?: Record<string, "ASC" | "DESC">
}

const CollectionTemplate: React.FC<CollectionTemplateProps> = ({
  collection,
}) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [`get_collection_products`, collection.id, cart?.id],
    ({ pageParam }) =>
      fetchCollectionProducts({
        pageParam,
        id: collection.id,
        cartId: cart?.id,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })



  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])



  /* ///////////////////////////////////////////////////////////////// */

  const [products, setProducts] = useState([]);
  function getCollections(colectionId:any) {

    httpClient.get(`/store/products?filter[collection]=${colectionId}`).then(({ data }) => {
      setProducts(data?.products)
      // console.log(data.products);
    
    })
  }

  useEffect(() => {
    getCollections(collection.id)
    
  })
  
  return (
    <div className="container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1>{collection.title}</h1>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
        {products?.map((p:any) => (
          <li key={p.id}>
            <ProductProvider product ={p}>
            <ProductPreview {...p} />
            </ProductProvider>
          </li>
        ))}
        {isLoading &&
          !products?.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(infiniteData?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  )
}

export default CollectionTemplate
