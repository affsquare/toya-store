import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { CartProvider, MedusaProvider } from "medusa-react"
import { Hydrate } from "react-query"

import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "styles/globals.css"
import '../../node_modules/@fortawesome/fontawesome-free/js/all.min.js'
import { AppPropsWithLayout } from "types/global"
// import { Layout } from '@modules/layout/templates';
import { useLayoutEffect } from 'react';
import Layout from './../modules/layout/templates/index';
import { IS_BROWSER } from '@lib/constants';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  useLayoutEffect(() => {
    import("../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js")
  })


  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <Hydrate state={pageProps.dehydratedState}>
        <CartDropdownProvider>
          <MobileMenuProvider>
            <CartProvider>
              <StoreProvider>
                <AccountProvider>
                  <Layout>

                    <Component {...pageProps} />
                  </Layout>
                </AccountProvider>
              </StoreProvider>
            </CartProvider>
          </MobileMenuProvider>
        </CartDropdownProvider>
      </Hydrate>
    </MedusaProvider>
  )
}

export default App
  // {getLayout(<Component {...pageProps} />)}
