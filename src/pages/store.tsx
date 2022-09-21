import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import repeat from "@lib/util/repeat"
import { StoreGetProductsParams } from "@medusajs/medusa"
import Head from "@modules/common/components/head"
import Search from "@modules/common/icons/search"
import Layout from "@modules/layout/templates"
import InfiniteProducts from "@modules/products/components/infinite-products"
import ProductPreview from "@modules/products/components/product-preview"
import VerticalPreview from "@modules/products/components/vertical-preview"
import RefinementList from "@modules/store/components/refinement-list"
import axios from "axios"
import { useState, useEffect, useMemo, useCallback } from "react"
import { NextPageWithLayout } from "types/global"
// import SkeletonProductPreview from '../../modules/skeletons/components/skeleton-product-preview/index';
import { useInfiniteQuery } from "react-query"
import { useCart } from "medusa-react"
import { fetchProductsList } from "@lib/data"
import { useSelector } from "react-redux"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import { useInView } from "react-intersection-observer"
import { Product, Region } from "@medusajs/medusa"
import { Variant } from 'types/medusa';
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useProductActions } from './../lib/context/product-context';
import { MEDUSA_BACKEND_URL } from "../lib/config"

const httpClient = axios.create({
    baseURL: MEDUSA_BACKEND_URL
})

interface IFilterSorter {
    search?: string;
    filter?: Record<string, string>;
    order?: Record<string, "ASC" | "DESC" | number>
}

type UsePreviewProps<T> = {
    // pages?: T[]
    region?: Region
}

// const previews: ProductPreviewType[] = useMemo(() => {
//     if (!region) {
//         return []
//     }

const Store: NextPageWithLayout = () => {

    const { cart } = useCart()

    const { ref, inView } = useInView()


    const [search, setSearchScreen] = useState()

    const [collections, setCollections] = useState([])

    const [sorter, setSorter] = useState("Default Sorting")

    const [views, setViews] = useState(true)

    // const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [params, setParams] = useState<StoreGetProductsParams>({})

    const productsStore = useSelector((st: any) => st?.products)

    const [qb, setQb] = useState<IFilterSorter>({
        filter: {},
        order: {},
        search: ""
    })

    // const queryParams = useMemo(() => {
    //     const p: StoreGetProductsParams = {}

    //     if (cart?.id) {
    //         p.cart_id = cart.id
    //     }

    //     p.is_giftcard = false

    //     return {
    //         ...p,
    //         ...params,
    //     }
    // }, [cart?.id, params])



    // useEffect(() => {
    //     if (inView && hasNextPage) {
    //         fetchNextPage()
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [inView, hasNextPage])

    /*  */
    const query = useMemo(() => {

        let queries: string[] = [];

        if (qb.filter) {
            queries = queries.concat(
                Object.keys((qb.filter as object)).map((k) => `filter[${k}]=${qb.filter?.[k]}`)
            )
        }

        if (qb.order) {
            let map_ = Object.keys((qb.order as object)).map((k) => `order[${k}]=${qb.order?.[k]}`)
            queries = queries.concat(map_)
        }

        if (qb.search) {
            const deepSearch = queries.findIndex((k) => k.includes("search"));

            if (deepSearch !== -1) {
                queries[deepSearch] = `search=${qb?.search}`;
            }

            else {
                queries.push(`search=${qb?.search}`);
            }
        }

        return queries.join("&");
    }, [qb])

    const { data, isLoading, isFetchingNextPage } =
        useInfiniteQuery(
            [`infinite-products-store`]
            // async function () {
            //     const { data } = await httpClient.get(`/store/products?${query}`);
            //     //setProducts(data?.products || []);
            //     return {

            //         response: {
            //             count: data?.products?.length || 0,
            //             products: data?.products || []
            //         }
            //     }
            // }
        )

    // console.log(data)

    useEffect(() => {
        httpClient.get("/store/collections").then(({ data }) => {
            setCollections(data?.collections)
        })

        if (query) {
            httpClient.get(`/store/products?${query}`).then(({ data }) => {
                setProducts(data?.products || [])
            }).catch(console.log)
        }
        else {
            httpClient.get(`/store/products`).then(({ data }) => {
                setProducts(data?.products || [])
            }).catch(console.log)
        }

    }, [qb])


    /* Get All Products */
    const getProducts = useCallback((sorter: string) => {
        httpClient.get(`/store/products${sorter}`).then(({ data }) => {
            setProducts(data?.products || [])
        }).catch(console.log)
    }, [])

    const [checked, setChecked] = useState(false)

    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)


    return (
        <>
            <Head title="Store" description="Explore all of our products." />
            <div className="container">
                <div className="flex ">
                    <div className="flex flex-column pe-5 py-4  small:pr-0 small:pl-0 small:min-w-[250px]">
                        <div className="">
                            <span className=" text-uppercase filter mb-4 flex items-center">
                                <span className="icon-filter-left-svgrepo-com"></span>
                                <span> Filter</span>
                            </span>
                            {/* Search */}
                            {/* <div className="space-y-6 flex-1 flex flex-col justify-between  ">
                                {process.env.FEATURE_SEARCH_ENABLED && (
                                <button
                                    className="bg-gray-50 flex items-center ps-3 py-2 gap-x-2 text-danger"
                                    onClick={() => { }}
                                >
                                    <Search size={24} />
                                    <span placeholder="Search products" className="text-base-regular">
                                        Search products
                                    </span>
                                </button>
                                )}
                            </div> */}

                            {/* Collections */}
                            <ul className="text-base-regular items-center gap-x-4 mt-4">
                                <li className="mb-2">
                                    <label className="flex items-center gap-x-2">
                                        <input
                                            name="collections"
                                            type="radio"
                                            onClick={() => {
                                                setQb({
                                                    ...qb,
                                                    filter: {
                                                        "collection": ""
                                                    }
                                                })
                                            }}

                                        />
                                        All Categories
                                    </label>
                                </li>
                                {collections?.map((c: any, i) => (
                                    <>
                                        <li key={i} className="mb-2">
                                            <label className="flex items-center gap-x-2">
                                                <input
                                                    name="collections"
                                                    type="radio"
                                                    onClick={(e) => {
                                                        setQb({
                                                            ...qb,
                                                            filter: {
                                                                "collection": c.id
                                                            }
                                                        })
                                                        // if (!checked) {
                                                        //     setQb({
                                                        //         ...qb,
                                                        //         filter: {
                                                        //             "collection": c.id
                                                        //         }
                                                        //     })
                                                        //     // setChecked(!checked)
                                                        // }
                                                        // else {
                                                        //     // const qb_ = qb;
                                                        //     // delete qb_?.['filter']?.['collection']
                                                        //     // setQb(qb)
                                                        //     setQb({
                                                        //         ...qb,
                                                        //         filter: {
                                                        //             "collection": ""
                                                        //         }
                                                        //     })
                                                        //     // setChecked(!checked)
                                                        // }
                                                    }}

                                                />
                                                {c?.title}
                                            </label>
                                        </li>
                                    </>
                                ))}
                                <li className="mt-5 ">
                                    <label className="text-gray-500" htmlFor="fromPrice">price Range</label>
                                    <div className="mt-2 row ">

                                        <div className="col-md-4">
                                            <input
                                                onInput={(e: any) => {
                                                    setFromPrice(e.target.value)
                                                }
                                                }
                                                id="fromPrice" className="px-1 border-b-2 border-gray-400 w-100 focus:outline-0 focus:border-orange-900" type="number" placeholder="From" />
                                        </div>

                                        <div className="col-md-4">
                                            <input
                                                onChange={(e: any) => {
                                                    setQb({
                                                        ...qb,
                                                        order: {
                                                            ...qb.order,
                                                            "price": "DESC"
                                                        },
                                                        filter: {
                                                            "price": `${fromPrice},${e.target.value}`
                                                        }
                                                    })


                                                }}
                                                className="px-1 border-b-2 border-gray-400 w-100 focus:outline-0 focus:border-orange-900" type="number" placeholder="To" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <>

                        <div className="flex-1 container">
                            <div className="mb-4 flex justify-between">

                                {/* Sort List */}
                                <div className="nav-item dropdown bg-light px-3 py-2 rounded-pill">
                                    <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"  >
                                        {sorter}
                                    </a>
                                    <ul className="dropdown-menu bg-light">
                                        <li onClick={() => {
                                            setQb({
                                                ...qb,
                                                order: {
                                                    ...qb.order,
                                                    "": "ASC"
                                                }
                                            });
                                            setSorter("Default Sorting")
                                        }} className="dropdown-item" role={"button"}> Default Sorting </li>

                                        <li onClick={() => {
                                            setQb({
                                                ...qb,
                                                order: {
                                                    ...qb.order,
                                                    "popularity": "DESC"
                                                }
                                            })
                                            setSorter("Sort by popularity")
                                        }} className="dropdown-item" role={"button"}> Sort by popularity  </li>

                                        <li onClick={() => {
                                            setQb({
                                                ...qb,
                                                order: {
                                                    ...qb.order,
                                                    "date": "DESC"
                                                }
                                            })
                                            setSorter("Sort by newness")
                                        }} className="dropdown-item" role={"button"}>Sort by newness  </li>

                                        <li onClick={() => {
                                            setQb({
                                                ...qb,
                                                order: {
                                                    ...qb.order,
                                                    "price": "ASC"
                                                }
                                            })
                                            setSorter("Sort by price: low to high")
                                        }} className="dropdown-item" role={"button"}> Sort by price: low to high  </li>

                                        <li onClick={() => {
                                            setQb({
                                                ...qb,
                                                order: {
                                                    ...qb.order,
                                                    "price": "DESC"
                                                }
                                            })
                                            setSorter("Sort by price: high to low")
                                        }} className="dropdown-item" role={"button"}> Sort by price: high to low  </li>

                                    </ul>
                                </div>

                                {/* Search */}
                                <div className="search flex items-center justify-center bg-light px-3 py-2 rounded-pill w-4/12">

                                    <input onChange={(e) => setQb({
                                        ...qb,
                                        search: e.target.value
                                    })} className=" w-100 focus:border-0 bg-transparent focus:outline-none" id="search" type="search" placeholder="Search products" />
                                    <label htmlFor="search" className=""><FontAwesomeIcon icon={["fas", "magnifying-glass"]} /> </label>
                                </div>

                                <div className="flex justify-end items-center">
                                    <span className="text-gray-600 font-semibold">Views:</span>
                                    <span className=" flex items-center">
                                        <span className="icon-grid-svgrepo-com" onClick={() => setViews(true)}></span>
                                        <FontAwesomeIcon icon={["fas", "list"]} onClick={() => setViews(false)} size={"lg"} />
                                    </span>
                                </div>

                            </div>

                            {views ?

                                /*cols Products Preview */
                                <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
                                    {
                                        products?.map((p: any) => (
                                            <>

                                                <li className="position-relative" key={p.id}  >
                                                    <ProductPreview {...p} />
                                                </li>
                                            </>
                                        ))
                                    }
                                    {isLoading &&
                                        !products.length &&
                                        repeat(8).map((index) => (
                                            <li key={index}>
                                                <SkeletonProductPreview />
                                            </li>
                                        ))}
                                    {/* {isFetchingNextPage &&
                                        repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
                                            <li key={index}>
                                                <SkeletonProductPreview />
                                            </li>
                                        ))} */}
                                </ul>

                                :

                                /* Vertical Products Preview */
                                <ul className="flex">
                                    <div className="col-md-12">

                                        {products.map((p: any) => (
                                            <li className="position-relative mb-3" key={p.id}  >
                                                <VerticalPreview {...p} />
                                            </li>
                                        ))}
                                        {isLoading &&
                                            !products.length &&
                                            repeat(8).map((index) => (
                                                <li key={index}>
                                                    <SkeletonProductPreview />
                                                </li>
                                            ))}
                                        {/* {isFetchingNextPage &&
                                            repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
                                                <li key={index}>
                                                    <SkeletonProductPreview />
                                                </li>
                                            ))} */}
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
                </div>
            </div>
        </>
    )
}

Store.getLayout = (page) => <Layout>{page}</Layout>

export default Store
