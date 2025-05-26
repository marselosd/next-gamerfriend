import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/interfaces/interfaces";

interface AuthState {
    user: User | null;
    loading: boolean;
    items: string[];
};

const initialState: AuthState = {
    user: null,
    loading: false,
    items: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        logout(state) {
            state.user = null;
        },
        setFavorites(state, action: PayloadAction<string[]>) {
            state.items = action.payload;
        },
    },
});

export const { setUser, setLoading, logout, setFavorites } = authSlice.actions;
export default authSlice.reducer;