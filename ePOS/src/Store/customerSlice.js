import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: "customerSlice",
    initialState: {},
    reducers: {
        addCustomer(state, action) {
            return action.payload;
        },
        updateCustomer(state, action) {
            if (action.payload.field === "mobile") {
                return {
                    ...state,
                    mobileNo: action.payload.value,
                };
            } else {
                return {
                    ...state,
                    name: action.payload.value,
                };
            }
        },
        removeCustomer(state, action) {
            return {};
        },
    },
});

export default customerSlice.reducer;
export const { addCustomer, removeCustomer, updateCustomer } =
    customerSlice.actions;
