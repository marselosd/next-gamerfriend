import {
  auth,
  provider,
  signInWithPopup,
  signOut as firebaseSignout,
  GoogleAuthProvider,
} from "@/firebase";
import { setUser, setLoading, logout, setFavorites } from "@/redux/slices/authSlice";
import { AppDispatch } from "../store";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

// Login com Google usando Google ID Token
export const loginWithGoogle = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await setPersistence(auth, browserLocalPersistence);

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const idToken = credential?.idToken;

    if (!idToken) {
      throw new Error("Não foi possível obter o ID Token do Google.");
    }

    const backendResponse = await fetch("https://apigamefriends.onrender.com/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      throw new Error(errorText || "Erro na autenticação com o backend.");
    }

    const backendToken = await backendResponse.text();
    localStorage.setItem("token", backendToken);

    // Aqui você precisaria buscar os dados do usuário, incluindo roles
    const userResponse = await fetch("https://apigamefriends.onrender.com/auth/Usuario-logado", {
      headers: { Authorization: `Bearer ${backendToken}` },
    });

    if (!userResponse.ok) {
      throw new Error("Erro ao obter dados do usuário.");
    }

    const userData = await userResponse.json();

    dispatch(
      setUser({
        name: userData.login || user.displayName || "",
        email: userData.email || user.email || "",
        photo: user.photoURL || "",
        roles: userData.roles || [],
      })
    );

    if (userData.email) {
      const favRes = await fetch(`/api/favorites?userId=${userData.email}`);
      const favData = await favRes.json();
      dispatch(setFavorites(favData.favorites || []));
    }
  } catch (error) {
    console.error("Erro no login com Google:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Login com usuário/senha
export const loginWithCredentials = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const loginResponse = await fetch("https://apigamefriends.onrender.com/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: username, senha: password }),
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.message || "Erro no login");
    }

    const rawToken = await loginResponse.text();
    const token = rawToken.startsWith("Bearer ") ? rawToken.substring(7) : rawToken;

    localStorage.setItem("token", token);

    const userResponse = await fetch("https://apigamefriends.onrender.com/auth/Usuario-logado", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      throw new Error("Erro ao obter dados do usuário.");
    }

    const user = await userResponse.json();

    dispatch(
      setUser({
        name: user.login,
        email: user.email,
        photo: "",
        roles: user.roles || [],
      })
    );

    const favRes = await fetch(`/api/favorites?userId=${user.email}`);
    const favData = await favRes.json();
    dispatch(setFavorites(favData.favorites || []));

    return { success: true };
  } catch (error: unknown) {
    console.error("Login com credenciais falhou:", error);
    let message = "Erro desconhecido";
    if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, message };
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout (Google ou padrão)
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await firebaseSignout(auth);
    localStorage.removeItem("token");
    dispatch(logout());
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

export const restoreSession = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    dispatch(setLoading(true));

    const response = await fetch("https://apigamefriends.onrender.com/auth/Usuario-logado", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Token inválido ou expirado");

    const user = await response.json();

    dispatch(
      setUser({
        name: user.login,
        email: user.email,
        photo: "",
        roles: user.roles || [],
      })
    );

    const favRes = await fetch(`/api/favorites?userId=${user.email}`);
    const favData = await favRes.json();
    dispatch(setFavorites(favData.favorites || []));
  } catch (err) {
    console.error("Erro ao restaurar sessão:", err);
    localStorage.removeItem("token");
    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
  }
};
