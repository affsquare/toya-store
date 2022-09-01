import { createSlice } from "@reduxjs/toolkit";

interface IFilter {
    [key: string]: [string]
}

interface IOrder {
    [key: string]: 'ASC' | "DESC"
}

const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        filters: {},
        orders: {}
    },
    reducers: {
        addFilter(state, action) {
            const { key, value } = action.payload;
            const tmp: IFilter = state.filters;
            tmp[key] = value;

            state = {
                ...state,
                filters: tmp
            }
        },
        removeFilter(state, action) {
            const { key } = action.payload;
            const tmp: IFilter = state.filters;
            delete tmp[key];

            state = {
                ...state,
                filters: tmp
            }
        },
        resetFilters(state, action) {
            state = {
                ...state,
                filters: {}
            }
        },
        addOrder(state, action) {
            const { key, value } = action.payload;
            const tmp: IOrder = state.orders;
            tmp[key] = value;

            console.log(key, "Add")
            state = {
                ...state,
                orders: tmp
            }
        },
        removeOrder(state, action) {
            const { key } = action.payload;
            const tmp: IOrder = state.orders;
            delete tmp[key];

            console.log(key, "remove")
            state = {
                ...state,
                orders: tmp
            }
        },
        resetOrder(state, action) {
            state = {
                ...state,
                orders: {}
            }
        }
    }
})

export const { addFilter, addOrder, removeFilter, removeOrder, resetFilters, resetOrder } = ProductsSlice.actions;

export default ProductsSlice.reducer;