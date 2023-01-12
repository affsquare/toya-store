import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { MEDUSA_BACKEND_URL } from "../../../lib/config"
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductPreview from "@modules/products/components/product-preview";
import { ProductProvider } from "@lib/context/product-context"


import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"


export default function BestSeller() {
    const httpClient = axios.create({
        baseURL: MEDUSA_BACKEND_URL
    })
    const [products, setProducts] = useState([]);

    const [collections, setCollections] = useState([])

    // "skin", "men", 'body', 'hair'
    useEffect(() => {
        httpClient.get(`/store/products`).then(({ data }) => {
            setProducts(data?.products)


        })
    }, [])
    const tabs = [
        {
            title: "skin",
            id: "skin",
            render: (props) =>
                <div className='d-flex justify-content-center'>
                    <ul className="grid grid-cols-1 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
                        {
                            props.products.map((p) => (
                                // console.log(p.variants)
                                <>
                                    <li className="position-relative" key={p.id}  >
                                        <ProductProvider product={p}>
                                            <ProductPreview {...p} />
                                        </ProductProvider>
                                    </li>
                                </>
                            ))
                        }
                        {/* {isLoading &&
                !products.length &&
                repeat(8).map((index) => (
                    <li key={index}>
                        <SkeletonProductPreview />
                    </li>
                ))} */}
                        {/* {isFetchingNextPage &&
                repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
                    <li key={index}>
                        <SkeletonProductPreview />
                    </li>
                ))} */}
                    </ul>
                </div>
        },
        {
            title: "men",
            id: "man",
            render: (props) =>
                <div className='d-flex justify-content-center'>
                    <ul className="grid grid-cols-1 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
                        {
                            props.products.map((p) => (
                                // console.log(p.variants)
                                <>
                                    <li className="position-relative" key={p.id}  >
                                        <ProductProvider product={p}>
                                            <ProductPreview {...p} />
                                        </ProductProvider>

                                    </li>
                                </>
                            ))
                        }
                        {/* {isLoading &&
       !products.length &&
       repeat(8).map((index) => (
           <li key={index}>
               <SkeletonProductPreview />
           </li>
       ))} */}
                        {/* {isFetchingNextPage &&
       repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
           <li key={index}>
               <SkeletonProductPreview />
           </li>
       ))} */}
                    </ul>
                </div>

        },
        {
            title: "body",
            id: "women",

            render: (props) =>
                <div className='d-flex justify-content-center'>
                    <ul className="grid grid-cols-1 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
                        {
                            props.products.map((p) => (
                                // console.log(p.variants)
                                <>
                                    <li className="position-relative" key={p.id}  >

                                        <ProductProvider product={p}>
                                            <ProductPreview {...p} />
                                        </ProductProvider>
                                    </li>
                                </>
                            ))
                        }
                        {/* {isLoading &&
       !products.length &&
       repeat(8).map((index) => (
           <li key={index}>
               <SkeletonProductPreview />
           </li>
       ))} */}
                        {/* {isFetchingNextPage &&
       repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
           <li key={index}>
               <SkeletonProductPreview />
           </li>
       ))} */}
                    </ul>
                </div>
        },
        {
            title: "hair",
            id: "hari",

            render: (props) =>
                <div className='d-flex justify-content-center'>
                    <ul className="grid grid-cols-1 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
                        {
                            props.products.map((p) => (
                                // console.log(p.variants)
                                <>
                                    <li className="position-relative" key={p.id}  >
                                        <ProductProvider product={p}>
                                            <ProductPreview {...p} />
                                        </ProductProvider>

                                    </li>
                                </>
                            ))
                        }
                        {/* {isLoading &&
       !products.length &&
       repeat(8).map((index) => (
           <li key={index}>
               <SkeletonProductPreview />
           </li>
       ))} */}
                        {/* {isFetchingNextPage &&
       repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
           <li key={index}>
               <SkeletonProductPreview />
           </li>
       ))} */}
                    </ul>
                </div>
        }
    ]

    const [currentActive, setCurrentActive] = useState(0);
    const [bestseller, setBestseller] = useState("");
    return (
        <>
            <section className="bestSeller bg-info py-5">
                <div className="container">
                    <div className="header text-center">
                        <h2 className="fs-3 best-head"><span className="best-span ">Best Sellers</span> of the week</h2>
                    </div>
                    <div className="bestSellerTabs d-flex align-items-center flex-column mt-4">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            {
                                tabs.map((t, i) => {
                                    return <li key={i} id={`${t.title}-${i}`} className="nav-item" role="presentation">
                                        <button onClick={() => setCurrentActive(i)} className={clsx({
                                            "nav-link": true,
                                            "active": i === currentActive
                                        })} id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target={`#${t.title}-${i}`} type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">{t.title}</button>
                                    </li>
                                })
                            }
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            {tabs.map((t, i) => {
                                if (i == currentActive) {
                                    // httpClient.get(`/store/products?filter[collection]=${t.id}`).then(({ data }) => {
                                    //     setProducts(data.products)
                                    //     console.log(data.products)

                                    // })
                                    // console.log(products.filter(el => el.collection.title == t.id))
                                    return <t.render products={products.filter(el => el.collection.title == t.id)} key={i} />
                                }
                            })}
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}
