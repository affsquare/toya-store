import { fetchProductsList } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import { StoreGetProductsParams } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useCart } from "medusa-react"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "react-query"
import VerticalPreview from './../vertical-preview/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type InfiniteProductsType = {
  params: StoreGetProductsParams
}

const InfiniteProducts = ({ params }: InfiniteProductsType) => {
  const { cart } = useCart()

  const { ref, inView } = useInView()

  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {}

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params])

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

  const previews = usePreviews({ pages: data?.pages, region: cart?.region })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  /* ////////////////////// */

  // const { addToCart } = useProductActions()
  const [views, setViews] = useState(true)
  return (
    <>
      <div className="flex-1 container">
        <div className="mb-3 flex justify-end items-center">
          <span className="text-gray-600 font-semibold">Views:</span>
          <span>
            <FontAwesomeIcon icon={["fas", "grip-vertical"]} onClick={() => setViews(true)} size={"lg"} className="mx-3 " />
            <FontAwesomeIcon icon={["fas", "list"]} onClick={() => setViews(false)} size={"lg"} />

          </span>
        </div>
        {views ?

          /*cols Products Preview */
          <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
            {previews.map((p) => (
              <>
                <li className="position-relative" key={p.id}  >
                
                  <ProductPreview {...p} />
                </li>
              </>
            ))}
            {isLoading &&
              !previews.length &&
              repeat(8).map((index) => (
                <li key={index}>
                  <SkeletonProductPreview />
                </li>
              ))}
            {isFetchingNextPage &&
              repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
                <li key={index}>
                  <SkeletonProductPreview />
                </li>
              ))}
          </ul>

          :

          /* Vertical Products Preview */
          <ul className="flex">
            <div className="col-md-12">

              {previews.map((p) => (
                <li className="position-relative mb-3" key={p.id}  >
                  <VerticalPreview {...p} />
                </li>
              ))}
              {isLoading &&
                !previews.length &&
                repeat(8).map((index) => (
                  <li key={index}>
                    <SkeletonProductPreview />
                  </li>
                ))}
              {isFetchingNextPage &&
                repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
                  <li key={index}>
                    <SkeletonProductPreview />
                  </li>
                ))}
            </div>
          </ul>}


        <div
          className="py-16 flex justify-center items-center text-small-regular text-gray-700"
          ref={ref}
        >
          <span ref={ref}></span>
        </div>
      </div>
    </>
  )
}

export default InfiniteProducts
