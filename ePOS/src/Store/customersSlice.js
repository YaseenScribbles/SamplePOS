import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const customersSlice = createSlice({
    name:'customersSlice',
    initialState:[],
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getCustomers.fulfilled,(state,action) => {
            const {data} = action.payload;
            return data;
        })
    }
})

export const getCustomers = createAsyncThunk('customers/get', async (shop_id) => {
    const data = await fetch(`http://localhost:8000/api/customers/${shop_id}`);
    const result = await data.json();
    return result;
})

export default customersSlice.reducer;
