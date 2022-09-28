import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "react-query"

// Defaults to standard port for Medusa server
// let MEDUSA_BACKEND_URL = "http://localhost:9000"
// let MEDUSA_BACKEND_URL = "http://toyaapp-env.eba-g9uk3evy.eu-west-2.elasticbeanstalk.com"
// let MEDUSA_BACKEND_URL = "http://ec2-3-9-43-164.eu-west-2.compute.amazonaws.com:9000"
let MEDUSA_BACKEND_URL = "http://192.168.1.117:9000"


/*if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 1,
    },
  },
})

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })

export { MEDUSA_BACKEND_URL, queryClient, medusaClient }
