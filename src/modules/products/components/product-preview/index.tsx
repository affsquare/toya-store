import clsx from "clsx"
import Link from "next/link"
// import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { useEffect, useState } from "react"
import getSymbolFromCurrency from 'currency-symbol-map'
import { ProductProvider, useProductActions } from "@lib/context/product-context"
import { Product } from 'types/medusa';
import { formatAmount } from "medusa-react"

type ProductPreviewType = {
    id?: string
    title?: string
    handle?: string | null
    thumbnail?: string | null
    variants?: any
    collection?: any
}

const ProductPreview = ({
    id,
    title,
    handle,
    thumbnail,
    variants,
    collection,

}: ProductPreviewType) => {
    // console.log(collection);

    // console.log(variants);


    const [price, setPrice] = useState<any>(0)

    function handellVariants() {
        variants?.map((v: any, index: any) => (
            setPrice(v.prices[0])
        ))
    }

    useEffect(() => {
        handellVariants()
    },)

    const [addToCart_, setAddToCart] = useState(false)
    //let { addToCart } = useProductActions()

    function numberWithCommas(x: any) {
        return x.toString().replace(/\b(\d{1,2})(\d{2})/g, '$1.$2');
    }

    return (

        <Link href={`/products/${id}`}>

            <a  >
                <div className="position-relative transition-all ease-in-out duration-300" onMouseEnter={() => setAddToCart(true)} onMouseLeave={() => setAddToCart(false)}>
                    <div className="position-relative ">

                        <Thumbnail thumbnail={thumbnail} size="full" />

                        {addToCart_ ? <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            //addToCart(1);
                        }
                        } className="toya-bg text-white position-absolute rounded-0 start-0 bottom-0  py-1 px-2">
                            {"Add to cart"}
                        </button> : ""}

                    </div>

                    <div className="text-base-regular mt-2 ">
                        {collection && (
                            <Link href={`/collections/${collection.id}`}>
                                <div className="text-small-regular text-xs text-gray-500 fw-bold">
                                    <div>{collection.title}</div>
                                </div>
                            </Link>
                        )}

                        <span className="title">{title}</span>
                        <div className="flex items-center gap-x-2 mt-1">
                            {price ? (
                                <>
                                    {price.price_type === "sale" && (
                                        <span className="line-through text-gray-500">
                                            {price.original_price}
                                        </span>
                                    )}
                                    <span
                                        className={clsx("font-semibold price", {
                                            "text-rose-500": price.price_type === "sale",
                                        })}
                                    >
                                        <span className="me-1 uppercase">{price.currency_code}</span>
                                        {formatAmount({
                                            amount: price.amount,
                                            region: price.currency_code,
                                            includeTaxes: false,
                                        })}
                                    </span>
                                </>
                            ) : (
                                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
                            )}
                        </div>

                    </div>
                </div>
            </a>
        </Link>
    )
}


export default ProductPreview
