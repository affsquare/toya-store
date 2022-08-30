import { StoreGetProductsParams } from "@medusajs/medusa"
import Search from "@modules/common/icons/search"
import { useCollections } from "medusa-react"
import { ChangeEvent, useEffect, useState } from "react"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import InfiniteProducts from "@modules/products/components/infinite-products"

type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
}

const RefinementList = ({
  refinementList,
  setRefinementList,
}: RefinementListProps) => {
  const { collections, isLoading } = useCollections()

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

  /* ///////////// */
  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenCountry = () => setScreen("country")
  const setScreenSearch = () => setScreen("search")

  const [products, setProducts] = useState([])

  async function getProducts(fillter:any) {
    let response = await fetch(`http://ec2-18-133-173-186.eu-west-2.compute.amazonaws.com:9000/store/products${fillter}`);
    // let productsContainer;
    if (response.status == 200) {
      const productsContainer = await response.json();
      setProducts(productsContainer.products)
      console.log(products, fillter);
      
    }
  }

  useEffect(() => {
    getProducts("")
  }, [])

  return (
    <>

      <h1></h1>
      <div className="pe-5 py-4  small:pr-0 small:pl-0 small:min-w-[250px]">
        <div className="flex gap-x-3  small:flex-col small:items-center small:gap-y-3">
          <span className=" text-uppercase filter mb-4">
            <i className="fa-solid fa-bars-staggered fa-xl me-2"></i>
            <span> Filter</span>
          </span>

          <div className="space-y-6 flex-1 flex flex-col justify-between ">
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

          <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2">
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

          <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2">
            {/* {products.map((p:any) => ( */}

            <li >
              <label className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  // defaultChecked={refinementList.collection_id?.includes(p.id)}
                  onChange={() => getProducts("")
                  }
                  className=""
                />
                Default Sorting
              </label>
            </li>
            {/* // ))} */}

            <li >
              <label className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  // defaultChecked={refinementList.collection_id?.includes(c.id)}
                  onClick={() => getProducts("?order[poularity]")}
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
                  onChange={() => { getProducts("?order[date]=ASC")}}
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
                  onChange={(e) => getProducts("?order[price]=ASC")}
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
                  onChange={(e) => getProducts("?order[price]=DESC")}
                  className=""
                />
                Sort by price: high to low
              </label>
            </li>

          </ul>

        </div>
      </div>
    </>
  )
}

export default RefinementList
