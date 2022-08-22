import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { CalculatedVariant } from "types/medusa"
import { useState } from 'react';
import { formatAmount } from 'medusa-react';

type ItemProps = {
    item: Omit<LineItem, "beforeInsert">
    region: Region
}

const Item = ({ item, region }: ItemProps) => {

    const { updateItem, deleteItem } = useStore()

    let [itemQuentity, setItemQuentity] = useState(item.quantity);

    const [solidHeart, setSolidHeart] = useState(false);

    return (
        <>
        <div className="products-header d-flex ">
            <div className="col-md-6 text-end pe-5">Product</div>
            <div className="col-md-2 text-center">Price</div>
            <div className="col-md-2 text-center pe-5">Quantity</div>
            <div className="col-md-2 text-center">Subtotal  </div>
        </div>
            <div className="row items-center">

                {/* Image */}
                <div className="col-md-2">
                    <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>

                {/* Title */}
                <div className="col-md-2">
                    <span>{item.title}</span>
                    <LineItemOptions variant={item.variant} />
                </div>

                {/* Price */}
                <div className="col-md-2">
                    <div className="">
                        <LineItemPrice
                            variant={item.variant as CalculatedVariant}
                            quantity={item.quantity}
                            region={region}
                        />
                    </div>
                </div>

                {/* Quantity */}
                <div className="col-md-2">

                    <div className="quantity d-flex align-items-center">
                        {/* Decrease */}
                        <div onClick={() => {
                            if (itemQuentity) {
                                setItemQuentity(itemQuentity -= 1)
                            }

                            updateItem({
                                lineId: item.id,
                                quantity: itemQuentity,
                            })
                        }
                        } role="button" className="bg-gray-200 rounded-circle  w-6 h-6 d-flex items-center justify-center text-xs"><i className="fa-solid fa-minus"></i></div>
                        <span className=" text-center mx-3 " > {itemQuentity}</span>

                        {/* increase */}
                        <div onClick={() => {
                            if (itemQuentity >= 0) {
                                setItemQuentity(itemQuentity += 1)
                            }
                            updateItem({
                                lineId: item.id,
                                quantity: itemQuentity,
                            })
                        }} role="button" className="bg-gray-200 rounded-circle  w-6 h-6 d-flex items-center justify-center text-xs"><i className="fa-solid fa-plus "></i></div>

                    </div>
                </div>

                {/* SubTotal */}
                <div className="col-md-2">
                    <h5>SubTotal</h5>
                </div>

                {/* Icons */}
                <div className="col-md-2">
                    <div className="d-flex items-center justify-between">
                        <div className="heart" role="button" onClick={() => setSolidHeart(!solidHeart)}>
                            {solidHeart ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                        </div>
                        <button
                            className=" d-flex items-center  text-gray-500"
                            onClick={() => deleteItem(item.id)}
                        >
                            <Trash size={14} />
                            <span className="ms-1">Remove</span>
                        </button>
                    </div>

                </div>




                {/* <NativeSelect
            value={item.quantity}
            onChange={(value) =>
              updateItem({
                lineId: item.id,
                quantity: parseInt(value.target.value),
              })
            }
            className="max-h-[35px] w-[75px]"
          >
            {Array.from([...Array(item.variant.inventory_quantity)].keys())
              .slice(0, 10)
              .map((i) => {
                const value = i + 1
                return (
                  <option value={value} key={i}>
                    {value}
                  </option>
                )
              })}
          </NativeSelect> */}


            </div>
        </>
    )
}

export default Item
