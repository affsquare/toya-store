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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getSymbolFromCurrency from "currency-symbol-map"

type ProductActionsProps = {
    product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {


    let { updateOptions, addToCart, options, inStock, variant } =
        useProductActions()

    // const price = useProductPrice({ id: product.id, variantId: variant?.id })

    // const selectedPrice = useMemo(() => {
    //     const { variantPrice, cheapestPrice } = price

    //     return variantPrice || cheapestPrice || null
    // }, [price])


    const { updateItem, deleteItem } = useStore()
    let [itemQuentity, setItemQuentity] = useState(1);
    // const [price, setPrice] = useState(0)

    const price: any = product.variants.map((p: any) => {
        return (p.prices[0])
    }
    )

    function numberWithCommas(x: any) {
        return x.toString().replace(/\b(\d{1,2})(\d{2})/g, '$1.$2');
    }

    return (
        <>
            <div className=" d-flex align-items-center mb-3">

                <span className="shop">
                    <Link href="/">Home</Link>
                </span>
                <span className='mx-2 d-flex align-items-center text-xs text-gray-400 fw-bold '>
                    &#62;
                </span>

                <span className="text-xs text-gray-500 fw-bold ">
                    <Link href="/shop">
                        <a className="hover:text-orange-800">
                            shop
                        </a>
                    </Link>
                </span>

                <span className='mx-2 d-flex align-items-center text-xs text-gray-400 fw-bold'>
                    &#62;
                </span>

                {product.collection && (
                    <Link href={`/collections/${product.collection.id}`}>
                        <a className="text-small-regular text-xs text-gray-500 fw-bold hover:text-orange-800">
                            {product.collection.title}
                        </a>
                    </Link>
                )}

                <span className='mx-2 d-flex align-items-center text-xs text-gray-400 fw-bold'>
                    &#62;
                </span>

                <span className="text-xs text-gray-600 ">{product.title}</span>
            </div>

            <div className="flex flex-col gap-y-2">

                {/* product-title */}
                <h3 className="text-xl-regular product-title fw-bold">
                    {product.title}
                </h3>

                {/* Product-Price  */}
                <div className="my-3 toya-color text-xl-semi fw-bold">
                    <h3> {price[0].amount} {getSymbolFromCurrency(`${price[0].currency_code}`)}</h3>

                    {/* {selectedPrice ? (
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
                    )} */}
                </div>

                {/* product-description */}
                <p className="text-muted">{product.description}</p>

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
                    <Button onClick={() => addToCart(itemQuentity)}>
                        {!inStock ? "Out of stock" : "Add to cart"}
                    </Button>
                </div>

                {/* shipping */}
                <div className="shipping d-flex items-center mt-2">
                    <span className="icon-truck"></span>
                    <p className="ms-3 text-muted">Congratulations! You've got free shipping.</p>
                </div>

                {/* categories */}
                <div className="categories my-4">
                    <span>Categories:</span>
                    <span className="text-muted ms-2">{product.title}</span>
                </div>

                {/* Share Icons*/}
                <div className="socialIcons text-muted fw-bold">
                    <span className="me-2">Share</span>
                    <span className="icon-facebook-svgrepo-com mx-2"></span>
                    <span className="icon-mail mx-2"></span>
                    <span className="icon-twitter-logo-shape-svgrepo-com mx-2"></span>
                    <span className="icon-telegram-svgrepo-com mx-2"></span>
                    <span className="icon-whatsapp-logo-variant-svgrepo-com mx-2"></span>
                    <span className="icon-linkedin-logo-svgrepo-com mx-2"></span>

                </div>

            </div>
        </>
    )
}

export default ProductActions
