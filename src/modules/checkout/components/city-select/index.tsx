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

        const { regions } = useRegions()
        const { cart } = useCart()


        const countryOptions = useMemo(() => {
            const currentRegion = regions?.find((r) => r.id === cart?.region_id)


            if (!currentRegion) {
                return []
            }

            return currentRegion.countries.map((country) => ({
                value: country.iso_2,
                label: country.display_name,
            }))
        }, [regions, cart])


        const [city, setCity] = useState([]);

        useEffect(() => {
            httpClient.get("/store/cities").then(({ data }) => {
                setCity(data.cities)
            })
        })


        return (
            <NativeSelect ref={innerRef} placeholder={placeholder} {...props}>
                {city?.map(({ name, code }, index) => (
                    <>

                        <option key={index} value={code}>
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
