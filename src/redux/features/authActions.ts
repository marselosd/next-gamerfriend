import { auth, provider, signInWithPopup, signOut as firebaseSignout } from "@/firebase";
import { setUser, setLoading, logout } from "@/redux/slices/authSlice";
import { AppDispatch } from "../store";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

export const loginWithGoogle = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        await setPersistence(auth, browserLocalPersistence);
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        dispatch(setUser({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }))

        const res = await fetch(`/api/favorites?userId=${user.email}`);
        const data = await res.json();
        if (data.favorites) {
        dispatch({
            type: 'favorites/setFavorites',
            payload: data.favorites
        });
        }
    } catch (error) {
        console.error("Login failed", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
    await firebaseSignout(auth);
    dispatch(logout());
};