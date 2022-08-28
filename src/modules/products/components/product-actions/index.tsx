import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import { Product } from "types/medusa"
import { useStore } from '@lib/context/store-context';
import Plus from "@modules/common/icons/plus"
import Minus from "@modules/common/icons/minus"

type ProductActionsProps = {
    product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
    let { updateOptions, addToCart, options, inStock, variant } =
        useProductActions()

    const price = useProductPrice({ id: product.id, variantId: variant?.id })

    const selectedPrice = useMemo(() => {
        const { variantPrice, cheapestPrice } = price

        return variantPrice || cheapestPrice || null
    }, [price])


    const { updateItem, deleteItem } = useStore()
    let [itemQuentity, setItemQuentity] = useState(1);

    return (
        <div className="flex flex-col gap-y-2">
            {product.collection && (
                <Link href={`/collections/${product.collection.id}`}>
                    <a className="text-small-regular text-gray-700 ">
                        {product.collection.title}
                    </a>
                </Link>
            )}

            {/* product-title */}
            <h3 className="text-xl-regular product-title fw-bold">{product.title}</h3>

            {/* Product-Price  */}
            <div className="my-3 ">
                {selectedPrice ? (
                    <div className="flex flex-col price ">
                        <span
                            className={clsx("text-xl-semi", {
                                "text-rose-600": selectedPrice.price_type === "sale",
                            })}
                        >
                            {selectedPrice.calculated_price}
                        </span>
                        {selectedPrice.price_type === "sale" && (
                            <>
                                <p>
                                    <span className="text-gray-500">Original: </span>
                                    <span className="line-through">
                                        {selectedPrice.original_price}
                                    </span>
                                </p>
                                <span className="text-rose-600">
                                    -{selectedPrice.percentage_diff}%
                                </span>
                            </>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>

            {/* product-description */}
            <p className="text-base-regular">{product.description}</p>

            {/* Product-Size & Color */}
            {product.variants.length > 1 && (
                <div className="my-8 flex flex-col gap-y-6">
                    {product.options.map((option) => {
                        return (
                            <div key={option.id}>
                                <OptionSelect
                                    option={option}
                                    current={options[option.id]}
                                    updateOption={updateOptions}
                                    title={option.title}
                                />
                            </div>
                        )
                    })}
                </div>
            )}
            <div className="addCart d-flex">
                <div className="quantity w-25 d-flex align-items-center">
                    <input type="number" className="input-text qty text-center" step="1" min="1" max="" name="quantity" value={itemQuentity} title="Qty" />
                    <div className="plus-min d-flex flex-column justify-content-center">
                        <div onClick={() => {
                            setItemQuentity(itemQuentity += 1)

                        }
                        } className="btn d-flex justify-center items-center"><Plus /></div>
                        <div onClick={() => {
                            if (itemQuentity > 1) {
                                setItemQuentity(itemQuentity -= 1)
                            }

                        }
                        } className="btn d-flex justify-center items-center"><Minus /></div>
                    </div>
                </div>

                {/* Add To Cart Buttton */}
                <Button onClick={() =>  addToCart(itemQuentity) }>
                    {!inStock ? "Out of stock" : "Add to cart"}
                </Button>
            </div>

        </div>
    )
}

export default ProductActions
