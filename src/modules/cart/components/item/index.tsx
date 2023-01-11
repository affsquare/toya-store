import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { CalculatedVariant } from "types/medusa"
import { useState } from 'react';
import MyVerticallyCenteredModal from './../MyVerticallyCenteredModal';
import Plus from "@modules/common/icons/plus"
import Minus from "@modules/common/icons/minus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatAmount } from "medusa-react"
import Link from "next/link"

type ItemProps = {
    item: Omit<LineItem, "beforeInsert">
    region: Region
}

/* Heart Icons Components */
const HeartIcon = (props: any) => {

    if (props.active) {
        return <FontAwesomeIcon icon="heart" />
    }

    return <FontAwesomeIcon icon={["far", "heart"]} />
}

const Item = ({ item, region }: ItemProps) => {

    const { updateItem, deleteItem } = useStore()

    let [itemQuentity, setItemQuentity] = useState(item.quantity);

    const [solidHeart, setSolidHeart] = useState(false);

    const [modalShow, setModalShow] = useState(false);



    return (
        <Link href={`/products/${item.variant.product.id}`}>
            <div className="row items-center bg-gray-50">

                {/* Image */}
                <div className="col-sm-2">
                    <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>

                {/* Title */}
                <div className="col-sm-3">
                    <span>{item.title}</span>
                    <LineItemOptions variant={item.variant} />
                </div>

                {/* Price */}
                <div className="col-sm-2">
                    <div className="my-2 my-md-0">
                        {/* <LineItemPrice
                            variant={item.variant as CalculatedVariant}
                            quantity={item.quantity}
                            region={region}
                        /> */}
                        {formatAmount({
                            amount: item.unit_price * item.quantity,
                            region: region,
                            includeTaxes: false,
                        })}
                    </div>
                </div>

                {/* Quantity */}
                <div className="col-sm-2">

                    <div className="quantity d-flex align-items-center my-2 my-md-0">
                        {/* Decrease */}
                        <div onClick={() => {
                            if (itemQuentity > 1) {
                                setItemQuentity(itemQuentity -= 1)
                            }
                            updateItem({
                                lineId: item.id,
                                quantity: itemQuentity,
                            })
                        }} role="button" className="bg-gray-200 rounded-circle  w-6 h-6 d-flex items-center justify-center text-xs"><Minus /></div>
                        <span className=" text-center mx-2 mx-md-3 " > {itemQuentity}</span>

                        {/* increase */}
                        <div onClick={() => {
                            if (itemQuentity >= 0) {
                                setItemQuentity(itemQuentity += 1)
                            }
                            updateItem({
                                lineId: item.id,
                                quantity: itemQuentity,
                            })
                        }} role="button" className="bg-gray-200 rounded-circle  w-6 h-6 d-flex items-center justify-center text-xs"><Plus /></div>

                    </div>
                </div>

                {/* Icons */}
                <div className="col-sm-3 col-md-2">
                    <div className="d-flex items-center justify-between">
                        <div className="heart me-sm-2 me-1 " role="button" onClick={() => { setSolidHeart(!solidHeart) }}>
                            <HeartIcon active={solidHeart} />
                        </div>
                        <button
                            className=" d-flex items-center  text-gray-500"
                            onClick={() => setModalShow(true)}
                        >
                            <Trash size={14} />
                            <span className="">Remove</span>
                        </button>
                    </div>
                </div>

                {/* Model */}
                <MyVerticallyCenteredModal
                    thumbnail={item.thumbnail}
                    title={item.title}
                    delete={() => deleteItem(item.id)}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

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
        </Link>
    )
}

export default Item
