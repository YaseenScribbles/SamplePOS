import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState: {},
    reducers: {
        addNotification(state, action) {
            return action.payload;
        },
        removeNotification(state, action) {
            return {};
        },
    },
});

export default notificationSlice.reducer;
export const { addNotification, removeNotification } =
    notificationSlice.actions;

// New action creator to remove notification after a delay
export const removeNotificationAfterDelay = () => (dispatch) => {
    setTimeout(() => {
        dispatch(removeNotification());
    }, 3000); // Adjust the delay as needed (in milliseconds)
};
