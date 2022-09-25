import { Dialog, Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Button from "@modules/common/components/button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Cart from "@modules/common/icons/cart"
import Edit from "@modules/common/icons/edit"
import Trash from "@modules/common/icons/trash"
import X from "@modules/common/icons/x"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import { Fragment, useState } from "react"
import { CalculatedVariant } from "types/medusa"
import Checkout from './../../../../pages/checkout';

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()
  const [show, setShow] = useState(false);


  return (
    <>
      <div className="h-full z-50" >
        {/* <div className="layer position-absolute top-0 bottom-0 end-0 start-0 bg-info"></div> */}
        <Popover className="relative h-full">

          <Popover.Button className="h-full text-black">
            <div className="relative " onClick={open}>
              <span className="text-gray-600 ">
                <span> <Cart /> </span>
              </span>
              <span className="total-items absolute d-flex justify-content-center align-items-center">{totalItems}</span>
            </div>
          </Popover.Button>

          <Transition
            show={state}
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div onClick={close} className="fixed inset-0 bg-black/[.6] transition-opacity " ></div>
          </Transition>

          <Transition
            show={state}
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <Popover.Panel
              static
              className=" small:flex fixed inset-y-0 right-0 w-[300px] flex-col px-2 z-50 bg-zinc-50 border-x border-b border-gray-200  text-gray-900"
            >
              <div className=" pt-4 flex items-center justify-between mb-5 px-3">
                <h3 className="text-large-semi">Shopping Bag</h3>
                <X onClick={close} role="button" />
                
              </div>
              {cart && items?.length ? (
                <>
                  <div className="cartDown-height overflow-y-scroll  px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                    {items
                      .sort((a, b) => {
                        return a.created_at > b.created_at ? -1 : 1
                      })
                      .map((item) => (
                        <div
                          className="grid grid-cols-[122px_1fr] gap-x-4 border-bottom border-gray-300"
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
                                  {/* <LineItemOptions variant={item.variant} /> */}
                                  <span>Quantity: {item.quantity}</span>
                                  <div>price: {formatAmount({
                                    amount: item.unit_price * item.quantity,
                                    region: cart.region,
                                    includeTaxes: false,
                                  })}</div>
                                </div>
                                {/* {console.log(cart.region)} */}

                                <div className="flex justify-end bg-danger">

                                  {/* <LineItemPrice
                                    region={cart.region}
                                    variant={item.variant as CalculatedVariant}
                                    quantity={item.quantity}
                                    style="tight"
                                  /> */}
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
                  <div className="absolute bottom-0 start-0 end-0  flex flex-col gap-y-4 text-small-regular">
                    <div className="flex items-center justify-between align-center px-3">
                      <div>
                        <span className=" text-uppercase fw-bold ">Subtotal:</span>
                        <span className="font-normal d-flex align-items-center text-xs">
                          <span className="icon-info me-1"></span> <span>include: taxes</span>
                        </span>
                      </div>
                      <span className="text-xl toya-color">
                        {formatAmount({
                          amount: cart.subtotal || 0,
                          region: cart.region,
                          includeTaxes: false,
                        })}
                      </span>
                    </div>
                    <div className="d-flex">
                      <div className="col-6">
                        <Link href="/cart" passHref>
                          <a>
                            <span onClick={close} className="checkout ">View Cart</span>
                          </a>
                        </Link>
                      </div>
                      <div className="col-6">
                        <Link href="/checkout" passHref>
                          <a >
                            <Button onClick={close}> Checkout</Button>
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
                    <span className=" h6 my-4">Your shopping bag is empty.</span>
                    <div>
                      <Link href="/store">
                        <a>
                          <span className="sr-only ">Go to all products page</span>
                          <Button onClick={close}>Explore products</Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  )
}

export default CartDropdown
