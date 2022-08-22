import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Button from "@modules/common/components/button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import { Fragment } from "react"
import { CalculatedVariant } from "types/medusa"
import Checkout from './../../../../pages/checkout';

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()
  return (
    <div className="h-full z-50" >
      <Popover className="relative h-full">
        {/* <Link href="/cart" passHref> */}
          <Popover.Button className="h-full text-black">
            <div className="relative " onClick={open}>
              <span><i className="fa-solid fa-cart-shopping fa-xl "> </i></span> <span className="total-items absolute d-flex justify-content-center align-items-center">{totalItems}</span>
            </div>

          </Popover.Button>
        {/* </Link> */}
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-0 left-10 bg-zinc-50 border-x border-b border-gray-200 w-[310px] text-gray-900"
          >
            <div className="px-4 pt-4 flex items-center justify-between mb-4">
              <h3 className="text-large-semi">Shopping Bag</h3>
              <div role="button" onClick={close} className="text-large-semi"><i className="fa-solid fa-xmark fa-1x"></i></div>
            </div>
            {cart && items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                  {items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4 border-b-2 border-gray-300"
                        key={item.id}
                      >
                        <div className="w-[120px]">
                          <Thumbnail thumbnail={item.thumbnail} size="full" />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[130px]">
                                  <Link
                                    href={`/products/${item.variant.product.handle}`}
                                  >
                                    <a>{item.title}</a>
                                  </Link>
                                </h3>
                                <LineItemOptions variant={item.variant} />
                                <span>Quantity: {item.quantity}</span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  region={cart.region}
                                  variant={item.variant as CalculatedVariant}
                                  quantity={item.quantity}
                                  style="tight"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-small-regular flex-1">
                            <div>
                              <button
                                className="flex items-center gap-x-1 text-gray-500"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between align-center">
                    <span className=" text-uppercase fw-bold ">
                      Subtotal{" "}
                      <span className="font-normal d-flex align-items-center">
                        <i className="fa-solid fa-circle-info me-1"></i> <span>include: taxes</span>
                      </span>
                    </span>
                    <span className="text-large-semi">
                      {formatAmount({
                        amount: cart.subtotal || 0,
                        region: cart.region,
                        includeTaxes: false,
                      })}
                    </span>
                  </div>
                  <div className="d-flex">
                    <div className="col-md-6">

                      <Link href="/checkout" passHref>
                        <a >
                          <Button>Checkout</Button>
                        </a>
                      </Link>
                    </div>

                    <div className="col-md-6">
                      <Link href="/cart" passHref>
                        <a>
                          <span className="checkout rounded ms-2">View Cart</span>

                        </a>
                      </Link>
                    </div>

                  </div>

                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <Link href="/store">
                      <a>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </a>
                    </Link>
                    <Link href="/checkout" passHref>
                      <a >Checkout</a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
