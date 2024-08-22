import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const scannedProductsSlice = createSlice({
    name: "scannedProductsSlice",
    initialState: initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        update(state, action) {
            return state.map((s) => {
                if (s.barcode.toLowerCase() == action.payload.toLowerCase()) {
                    return {
                        ...s,
                        qty: (+s.qty + 1).toString(),
                    };
                } else {
                    return s;
                }
            });
        },
        remove(state, action) {
            return state.filter(
                (s) => s.barcode.toLowerCase() != action.payload.toLowerCase()
            );
        },
        updateDiscount(state, action) {
            return state.map((s) => ({
                ...s,
                discount: action.payload,
            }));
        },
        updateSalesPerson(state, action) {
            return state.map((s) => {
                if (s.barcode === action.payload.barcode) {
                    return {
                        ...s,
                        salesPersonCode: action.payload.code,
                    };
                } else {
                    return s;
                }
            });
        },
        updateQty(state, action) {
            return state.map((s) => {
                if (s.barcode === action.payload.barcode) {
                    return {
                        ...s,
                        qty: action.payload.qty,
                    };
                } else {
                    return s;
                }
            });
        },
    },
});

export default scannedProductsSlice.reducer;

export const { add, remove, update, updateDiscount, updateSalesPerson,updateQty } =
    scannedProductsSlice.actions;
