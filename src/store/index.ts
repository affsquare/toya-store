import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ProductsReducer from "./reducers/products"

export const store = configureStore({
    reducer: combineReducers({
        products: ProductsReducer
    }),
    preloadedState: {
        products: {
            filters: {},
            orders: {}
        }
    }
});


