import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { useContext, useState } from "react"
import { useProductActions } from '@lib/context/product-context';

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
                <div className="position-relative transition-all ease-in-out duration-300" onMouseEnter={() => setAddToCart(true)} onMouseLeave={() => setAddToCart(false)}>
                    <div className="position-relative ">

                        <Thumbnail thumbnail={thumbnail} size="full" />

                        {addToCart_ ? <button onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("hello")
                        }
                        } className="toya-bg text-white position-absolute rounded-0 start-0 bottom-0  py-1 px-2">
                            {"Add to cart"}
                        </button> : ""}

                    </div>
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

                    </div>
                </div>
            </a>
        </Link>
    )
}


export default ProductPreview
