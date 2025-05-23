import { createSlice } from "@reduxjs/toolkit";

interface FavoriteState {
    items: string[]
}

const initialState: FavoriteState = {
    items: [],
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite(state, action) {
            const id = action.payload;
            if (state.items.includes(id)) 
                state.items = state.items.filter(item => item !== id);
            else
                state.items.push(id);
        },
        clearFavorites(state) {
            state.items = [];
        }
    }
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;