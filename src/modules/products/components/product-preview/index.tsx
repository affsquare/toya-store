import clsx from "clsx"
import Link from "next/link"
// import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { useEffect, useState } from "react"
import getSymbolFromCurrency from 'currency-symbol-map'

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


    const [price, setPrice] = useState<any>(0)

    function handellVariants() {
        variants.map((v: any, index: any) => (
            setPrice(v.prices[0])
        ))
    }

    useEffect(() => {
        handellVariants()
    },)

    // function handellPrice (handellVariants:any) {
    //     handellVariants.map((v: any) => (
    //         console.log(v.amount)
    //     ))
    // }



    const [addToCart_, setAddToCart] = useState(false)

    return (
        <Link href={`/products/${id}`}>

            <a  >
                <div className="position-relative transition-all ease-in-out duration-300" onMouseEnter={() => setAddToCart(true)} onMouseLeave={() => setAddToCart(false)}>
                    <div className="position-relative ">

                        <Thumbnail thumbnail={thumbnail} size="full" />

                        {addToCart_ ? <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        } className="toya-bg text-white position-absolute rounded-0 start-0 bottom-0  py-1 px-2">
                            {"Add to cart"}
                        </button> : ""}
                        {

                        }
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
                                        {price.amount} {getSymbolFromCurrency(`${price.currency_code}`)}
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
