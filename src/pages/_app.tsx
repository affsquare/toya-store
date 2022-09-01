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
import { Provider } from "react-redux"
import { store as localStore } from "../store"
import { useEffect } from 'react';
import { ProductActionContext } from "@lib/context/product-context"


function App({ Component, pageProps }: AppPropsWithLayout) {

  // const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    require("../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Provider store={localStore}>
      <MedusaProvider
        baseUrl={MEDUSA_BACKEND_URL}
        queryClientProviderProps={{
          client: queryClient,
        }}
      >
        {/* <ProductActionContext.Provider value={}> */}
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
        {/* </ProductActionContext.Provider> */}
      </MedusaProvider>
    </Provider>
  )
}

export default App
  // {getLayout(<Component {...pageProps} />)}
