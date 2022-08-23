import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import Button from '@modules/common/components/button'
import { useState } from "react"

const ProductPreview = ({
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
                <div className="position-relative " onMouseEnter={() => setAddToCart(true)} onMouseLeave={() => setAddToCart(false)}>
                    <Thumbnail thumbnail={thumbnail} size="full" />
                    <div className="text-base-regular mt-2 ">
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
                        {/* Add To Cart Buttton */}
                        {addToCart_ ? <Button  className="position-absolute rounded-0 start-0 w-50 prod-cart-btn">
                            {"Add to cart"}
                        </Button> : ""}
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProductPreview
