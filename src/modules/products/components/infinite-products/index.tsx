import { fetchProductsList } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import { Product, StoreGetProductsParams } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useCart } from "medusa-react"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "react-query"
import VerticalPreview from './../vertical-preview/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { ProductActionContext, useProductActions } from '@lib/context/product-context';
import Button from './../../../common/components/button/index';
import { ProductPreviewType } from 'types/global';


type InfiniteProductsType = {
    params: StoreGetProductsParams,

}

const InfiniteProducts = ({ params }: InfiniteProductsType) => {


    const productsStore = useSelector((st: any) => st?.products)

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
            ({ pageParam }) => fetchProductsList({ pageParam, queryParams: queryParams, order: productsStore?.order }),
            {
                getNextPageParam: (lastPage) => lastPage.nextPage,
            }
        )

    // const previews = usePreviews({ pages: data?.pages, region: cart?.region })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, hasNextPage])

    /* //////////////////////////////////////////////////////////////////////////// */

    const [products, setProducts] = useState([])
    
    const apiURL = `http://ec2-3-9-43-164.eu-west-2.compute.amazonaws.com:9000` // Api Url

    //Sort Function
    async function getProducts(fillter: any) {
        let response = await fetch(`${apiURL}/store/products${fillter}`);

        if (response.status == 200) {
            const productsContainer = await response.json();
            setProducts(productsContainer.products)
            // console.log(products, fillter);
        }
    }

    //Call Sort Function 
    useEffect(() => {
        getProducts("")
    }, [])

    const [views, setViews] = useState(true)
    const [fillters, setFillters] = useState(false)

    let showProducts: ProductPreviewType[] = []

    if (fillters) {
        showProducts.push(...products)

    } else {
        // showProducts.push(...previews)
    }

    const [filltersName, setFilltersName] = useState("Default Sorting")
    return (
        <>

            <div className="flex-1 container">
                <div className="mb-3 flex justify-between">
                    <div className="nav-item dropdown">
                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {filltersName}
                        </a>
                        <ul className="dropdown-menu">
                            <li onClick={() => { getProducts(""); setFillters(true); setFilltersName("Default Sorting") }} className="dropdown-item" role={"button"}> Default Sorting </li>
                            <li onClick={() => { getProducts("?order[popularity]"); setFilltersName("Sort by popularity") }} className="dropdown-item" role={"button"}> Sort by popularity  </li>
                            <li onClick={() => { getProducts("?order[date]=DESC"); setFilltersName("Sort by newness") }} className="dropdown-item" role={"button"}>Sort by newness  </li>
                            <li onClick={() => { getProducts("?order[price]=ASC"); setFilltersName("Sort by price: low to high") }} className="dropdown-item" role={"button"}> Sort by price: low to high  </li>
                            <li onClick={() => { getProducts("?order[price]=DESC"); setFilltersName("Sort by price: high to low") }} className="dropdown-item" role={"button"}> Sort by price: high to low  </li>
                        </ul>
                    </div>
                    <div className="flex justify-end items-center">
                        <span className="text-gray-600 font-semibold">Views:</span>
                        <span>
                            <FontAwesomeIcon icon={["fas", "grip-vertical"]} onClick={() => setViews(true)} size={"lg"} className="mx-3 " />
                            <FontAwesomeIcon icon={["fas", "list"]} onClick={() => setViews(false)} size={"lg"} />
                        </span>
                    </div>

                </div>



                {views ?

                    /*cols Products Preview */
                    <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
                        {

                            showProducts.map((p: any) => (
                                <>
                                    <li className="position-relative" key={p.id}  >
                                        <ProductPreview {...p} />
                                    </li>
                                </>
                            ))
                        }
                        {isLoading &&
                            !showProducts.length &&
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

                            {showProducts.map((p: any) => (
                                
                                <li className="position-relative mb-3" key={p.id}  >
                                    {console.log({...p})
                                    }
                                    <VerticalPreview {...p} />
                                    
                                </li>
                            ))}
                            {isLoading &&
                                !showProducts.length &&
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
                    </ul>
                }


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
