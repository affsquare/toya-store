import { StoreGetProductsParams } from "@medusajs/medusa"
import Search from "@modules/common/icons/search"
import { useCollections } from "medusa-react"
import { ChangeEvent } from "react"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
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
  return (
    <>
      <div className="pe-5 py-4  small:pr-0 small:pl-0 small:min-w-[250px]">
        <div className="flex gap-x-3 small:flex-col small:items-center small:gap-y-3">
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
                    defaultChecked={refinementList.collection_id?.includes(
                      c.id
                    )}
                    onChange={(e) => handleCollectionChange(e, c.id)}
                    className=""
                  />
                  {c.title}
                </label>  
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default RefinementList
