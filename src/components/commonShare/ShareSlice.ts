import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShareState {
    url: string;
}

const initialState: ShareState = {
    url: ""
}

const shareSlice = createSlice({
    name: "share",
    initialState,
    reducers: {
        setUrl(state, action: PayloadAction<string>) {
            state.url = action.payload;
        },
    },
});

export const { setUrl } = shareSlice.actions;
export default shareSlice.reducer;