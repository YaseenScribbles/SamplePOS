import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const salesPersonsSlice = createSlice({
    name: 'salesPersonsSlice',
    initialState: [],
    reducers: {
        addSalesPerson(state, action) {
            state.push(action.payload);
        },
        editSalesPerson(state, action) {
            return state.map((s) => {
                if (s.barcode === action.payload.barcode) {
                    return {
                        ...s,
                        code: action.payload.code,
                    };
                }
            });
        },
        deleteSalesPerson(state,action){
            return state.filter(s => s.barcode !== action.payload)
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getSalesPersons.fulfilled,(state,action) =>{
            const { data } = action.payload;
            return data;
        })
    }
});

export const getSalesPersons = createAsyncThunk('salespersons/get',async (shop_id) => {
    const data = await fetch(`http://localhost:8000/api/salespersons/${shop_id}`);
    const results = await data.json();
    return results;
})

export default salesPersonsSlice.reducer;
export const { addSalesPerson,editSalesPerson,deleteSalesPerson } = salesPersonsSlice.actions;
