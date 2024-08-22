import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../assets/status";

const products = {
    status: "",
    data: [
        {
            id: "",
            barcode: "",
            description: "",
            retailPrice: "",
            discount: "",
            salesPersonCode: "",
        },
    ],
};

const productSlice = createSlice({
    name: "productSlice",
    initialState: products,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = Status.Success;
                const { data } = action.payload;
                state.data = data;
            })
            .addCase(getProducts.pending, (state, action) => {
                state.status = Status.Loading;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = Status.Error;
                state.data = [];
            });
    },
});

export const getProducts = createAsyncThunk("products/get", async (shop_id) => {
    const data = await fetch(`http://localhost:8000/api/products/${shop_id}`);
    const results = await data.json();
    return results;
});

export default productSlice.reducer;
export const {} = productSlice.actions;
