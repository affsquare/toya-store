import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { useState } from "react"

const VerticalPreview = ({
    title,
    handle,
    thumbnail,
    price,
}: ProductPreviewType) => {


    const [addToCart_, setAddToCart] = useState(false)
    // const { addToCart } = useProductActions()
    return (
        <Link href={`/products/${handle}`}>
            <a  >
                <div className="flex position-relative transition-all ease-in-out duration-300 " >

                    <Thumbnail thumbnail={thumbnail} size="small" />

                    {/* Add To Cart Buttton */}
                    <div className="text-base-regular ms-3 relative">
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
                                        {price.calculated_price}
                                    </span>
                                </>
                            ) : (
                                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
                            )}
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log("hello")
                        }
                        } className="toya-bg text-white rounded-0 absolute bottom-0 end-0 py-1 px-2 ">
                            {"Add to cart"}
                        </button>
                    </div>
                </div>
            </a>

        </Link>
    )
}


export default VerticalPreview
