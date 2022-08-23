import { LineItem, Region } from "@medusajs/medusa"
import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div>
      <div className="border-b border-gray-200 pb-3 ">
        <h1 className="text-xl-semi">Shopping Bag</h1>
      </div>
      <div className="products-header d-flex my-4 fw-bolder text-gray-500">
        <div className="col-md-4 text-end  pe-5">Product</div>
        <div className="col-md-3 text-center ">Price</div>
        <div className="col-md-3 text-start ps-4">Quantity</div>
      </div>
      <div className="grid grid-cols-1 gap-y-5 pb-8">
        {items && region
          ? items
            .sort((a, b) => {
              return a.created_at > b.created_at ? -1 : 1
            })
            .map((item) => {
              return <Item key={item.id} item={item} region={region} />
            })
          : Array.from(Array(5).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
      </div>
    </div>
  )
}

export default ItemsTemplate
