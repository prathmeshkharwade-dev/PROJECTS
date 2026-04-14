import { createSlice } from "@reduxjs/toolkit";


const productSclice = createSlice({
    name: "product",
    initialState: {
        sellerProducts:[]
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload
        }
    }
})

export const { setSellerProducts } = productSclice.actions
export default productSclice.reducer
