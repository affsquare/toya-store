import { StoreGetProductsParams } from "@medusajs/medusa"
import Search from "@modules/common/icons/search"
import { useCollections } from "medusa-react"
import { ChangeEvent, useEffect, useState } from "react"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import InfiniteProducts from "@modules/products/components/infinite-products"
import { addFilter, addOrder, removeOrder, resetFilters, resetOrder } from "../../../../store/reducers/products"
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import Thumbnail from "@modules/products/components/thumbnail"
type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
}

const RefinementList = ({
  refinementList,
  setRefinementList,
}: RefinementListProps) => {

  
  const dispatcher = useDispatch();
  
  const productStore = useSelector((st: any) => st.products)
  
  const { collections, isLoading } = useCollections();
  const handleCollectionChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = e.target

    const collectionIds = refinementList.collection_id || []

    const exists = collectionIds.includes(id)

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        collection_id: [...collectionIds, id],
      })
      return
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        collection_id: collectionIds.filter((c) => c !== id),
      })
      return
    }

    return
  }

  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenCountry = () => setScreen("country")
  const setScreenSearch = () => setScreen("search")

  // const [products, setProducts] = useState([])

  // const apiURL = `http://ec2-3-9-43-164.eu-west-2.compute.amazonaws.com:9000`
  // async function getProducts(fillter: any) {
  //   let response = await fetch(`${apiURL}/store/products${fillter}`);

  //   if (response.status == 200) {
  //     const productsContainer = await response.json();
  //     setProducts(productsContainer.products)
  //     // console.log(products, fillter);
  //   }
  // }

  // useEffect(() => {
  //   getProducts("")
    
  // }, [])
  
  // async function handelFillters() {
  //   await getProducts("?order[price]=DESC")
  //   // console.log(products);
  //   products.map((p)=>{
  //     return
  //       // console.log(p.collection_id)
        
  //       // setRefinementList(
  //       //   {...refinementList, p}
  //       // )
      
  //   })
  // }

  // const handleChnageOrder = () => {
  //   if (!productStore?.orders?.["price"]) {
  //     dispatcher(addOrder({ key: "price", value: 'DESC' }))
  //     setRefinementList({ ...refinementList, order: productStore.orders })
  //     // console.log(refinementList, "yes");

  //   } else {
  //     dispatcher(removeOrder({ key: "price" }))

  //     // console.log(refinementList, "no");
  //   }
  // }



  return (
    <>
      <div className="flex flex-column pe-5 py-4  small:pr-0 small:pl-0 small:min-w-[250px]">
        <div className="">
          <span className=" text-uppercase filter mb-4">
            <i className="fa-solid fa-bars-staggered fa-xl me-2"></i>
            <span> Filter</span>
          </span>

          <div className="space-y-6 flex-1 flex flex-col justify-between  ">
            {process.env.FEATURE_SEARCH_ENABLED && (
              <button
                className="bg-gray-50 flex items-center ps-3 py-2 gap-x-2 text-danger"
                onClick={setScreenSearch}
              >
                <Search size={24} />
                <span placeholder="Search products" className="text-base-regular">
                  Search products
                </span>
              </button>
            )}
          </div>

          <ul className="text-base-regular items-center gap-x-4 mt-4">
            {collections?.map((c) => (
              <li key={c.id}>
                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={refinementList.collection_id?.includes(c.id)}
                    onChange={(e) => handleCollectionChange(e, c.id)}

                    className=""
                  />
                  {c.title}
                </label>
              </li>
            ))}
          </ul>

          {/* <ul className="text-base-regular items-center gap-x-4 mt-2">

            <li >
              <label className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  // defaultChecked={refinementList.collection_id?.includes(p.id)}
                  onChange={() =>
                    dispatcher(resetOrder(null))
                  }
                  className=""
                />
                Default Sorting
              </label>
            </li>
            

            <li >
              <label className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  // defaultChecked={refinementList.collection_id?.includes(c.id)}
                  onChange={e => {

                  }}
                  className=""
                />
                Sort by popularity
              </label>
            </li>

            <li >
              <label className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  // defaultChecked={refinementList.collection_id?.includes(c.id)}
                  onChange={(e) => {

                  }
                  }
                  className=""
                />
                Sort by newness
              </label>
            </li>

            <li >
              <label className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  // defaultChecked={refinementList.collection_id?.includes(c.id)}
                  onChange={(e) => {

                  }
                  }
                  className=""
                />
                Sort by price: low to high
              </label>
            </li>

            <li >
              <label className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  // defaultChecked={refinementList.collection_id?.includes(c.id)}
                  onClick={(e) => {
                    handleChnageOrder()
                    
                  }}
                  className=""
                />
                Sort by price: high to low
              </label>
            </li>

          </ul> */}

        </div>
      </div>
    </>
  )
}

export default RefinementList
