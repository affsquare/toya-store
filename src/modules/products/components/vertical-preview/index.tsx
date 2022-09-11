import clsx from "clsx"
import Link from "next/link"
// import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { useEffect, useState } from "react"
import getSymbolFromCurrency from 'currency-symbol-map'

type ProductPreviewType = {
    id: string
    title: string
    handle: string | null
    thumbnail: string | null
    variants: any
    description: string
    collection?: any
}

const VerticalPreview = ({
    id,
    title,
    handle,
    thumbnail,
    variants,
    description,
    collection,
}: ProductPreviewType) => {


    const [price, setPrice] = useState<any>(0)

    function handellVariants() {
        variants.map((v: any, index: any) => (
            setPrice(v.prices[0])
        ))
    }

    useEffect(() => {
        handellVariants()
    },)

    function numberWithCommas(x: any) {
        return x.toString().replace(/\b(\d{1,2})(\d{2})/g, '$1.$2');
    }

    const [addToCart_, setAddToCart] = useState(false)
    // const { addToCart } = useProductActions()
    return (
        <Link href={`/products/${id}`}>
            <a  >
                <div className="flex position-relative transition-all ease-in-out duration-300 " >

                    <Thumbnail thumbnail={thumbnail} size="small" />

                    {/* Add To Cart Buttton */}
                    <div className="text-base-regular ms-3 relative w-75">

                        {/* collection */}
                        {collection && (
                            <Link href={`/collections/${collection.id}`}>
                                <div className="text-small-regular text-base text-gray-500 fw-bold mb-2">
                                    <div>{collection.title}</div>
                                </div>
                            </Link>
                        )}
                        {/* Title */}
                        <span className="title">{title}</span>
                        <div className="flex items-center gap-x-2 mt-1">
                            {/* Price */}
                            {price ? (
                                <>
                                    {price.price_type === "sale" && (
                                        <span className="line-through text-gray-500">
                                            {numberWithCommas(price.original_price)}
                                        </span>
                                    )}
                                    <span
                                        className={clsx("font-semibold price", {
                                            "text-rose-500": price.price_type === "sale",
                                        })}
                                    >
                                        {numberWithCommas(price.amount)} {getSymbolFromCurrency(`${price.currency_code}`)}
                                    </span>
                                </>
                            ) : (
                                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
                            )}
                        </div>

                        <p className="text-muted mt-2">{description}</p>


                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log("hello")
                        }
                        } className="toya-bg text-white rounded absolute bottom-0 end-0 py-2 px-5 text-uppercase tracking-wider">
                            {"Add to cart"}
                        </button>
                    </div>
                </div>
            </a>

        </Link>
    )
}


export default VerticalPreview
