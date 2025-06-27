import { auth, provider, signInWithPopup, signOut as firebaseSignout } from "@/firebase";
import { setUser, setLoading, logout, setFavorites } from "@/redux/slices/authSlice";
import { AppDispatch } from "../store";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

// Login com Google
export const loginWithGoogle = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    dispatch(setUser({
      name: user.displayName || "",
      email: user.email || "",
      photo: user.photoURL || ""
    }));

    const res = await fetch(`/api/favorites?userId=${user.email}`);
    const data = await res.json();
    if (data.favorites) {
      dispatch(setFavorites(data.favorites));
    }
  } catch (error) {
    console.error("Login failed", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Login com credenciais (username e senha)
export const loginWithCredentials = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    // 1. Faz login na API local
    const loginResponse = await fetch("http://localhost:8080/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: username,
        senha: password,
      }),
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.message || "Erro no login");
    }

    const rawToken = await loginResponse.text();
    let token = rawToken;

    if (token.startsWith("Bearer ")) {
      token = token.substring(7);
    }

    if (!token) {
      throw new Error("Token não recebido");
    }


    localStorage.setItem("token", token);


    const userResponse = await fetch("http://localhost:8080/auth/Usuario-logado", {
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      throw new Error("Falha ao obter dados do usuário");
    }

    const user = await userResponse.json();

    // 3. Atualiza estado Redux
    dispatch(setUser({
      name: user.login,
      email: user.email,
      photo: "", 
    }));

    // 4. Busca favoritos
    const favRes = await fetch(`/api/favorites?userId=${user.email}`);
    const favData = await favRes.json();
    if (favData.favorites) {
      dispatch(setFavorites(favData.favorites));
    } else {
      dispatch(setFavorites([]));
    }

    return { success: true };
  } catch (error: any) {
    console.error("Login com credenciais falhou:", error.message);
    return { success: false, message: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await firebaseSignout(auth);
  dispatch(logout());
};
