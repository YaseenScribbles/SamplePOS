import { configureStore } from "@reduxjs/toolkit";
import scannedProductsSlice from "./scannedProductsSlice";
import customerSlice from "./customerSlice";
import salesPersonsSlice from "./salesPersonsSlice";
import notificationSlice from "./notificationSlice";
import productSlice from "./productSlice";
import customersSlice from "./customersSlice";

const store = configureStore({
    reducer: {
        scannedProducts: scannedProductsSlice,
        customer: customerSlice,
        salesPersons: salesPersonsSlice,
        notification: notificationSlice,
        products: productSlice,
        customers: customersSlice,
    },
});

export default store;
