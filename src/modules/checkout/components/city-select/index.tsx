import NativeSelect, {
    NativeSelectProps,
} from "@modules/common/components/native-select"
import { useCart, useRegions } from "medusa-react"
import { forwardRef, useImperativeHandle, useMemo, useRef, useEffect, useState } from "react"
import axios from "axios"
import { MEDUSA_BACKEND_URL } from "../../../../lib/config"

const CitySelect = forwardRef<HTMLSelectElement, NativeSelectProps>(


    ({ placeholder = "city", ...props }, ref) => {
        const innerRef = useRef<HTMLSelectElement>(null)

        const httpClient = axios.create({
            baseURL: MEDUSA_BACKEND_URL
        })

        useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
            ref,
            () => innerRef.current
        )

        const [city, setCity] = useState([]);

        useEffect(() => {
            httpClient.get("/store/cities").then(({ data }) => {
                setCity(data.cities)
            })
        }, [])

        const { regions } = useRegions()
        const { cart } = useCart()


        const cityOptions = useMemo(() => {
            const currentRegion = regions?.find((r) => r.id === cart?.region_id)


            if (!currentRegion) {
                return []
            }

            return city.map((c:any) => ({
                value: c.id,
                // label: c.name,
            }))
        }, [regions, cart])


        return (
            <NativeSelect ref={innerRef} placeholder={placeholder} {...props}>
                {city?.map(({ name, id }, index) => (
                    <>
                        {/* {
                            console.log(city)
                            
                        } */}
                        <option key={index} value={id}>
                            {name}
                        </option>
                    </>

                ))}
            </NativeSelect>
        )
    }
)

CitySelect.displayName = "CitySelect"

export default CitySelect
