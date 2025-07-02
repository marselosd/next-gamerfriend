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
            if (action.payload) {
                state.user = {
                    ...action.payload,
                    roles: action.payload.roles ?? [],
                };
            } else {
                state.user = null;
            }
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
