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

    // Pega o Google ID Token corretamente
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const idToken = credential?.idToken;

    if (!idToken) {
      throw new Error("Não foi possível obter o ID Token do Google.");
    }

    console.log("Token do Google a ser enviado:", idToken);

    const backendResponse = await fetch("http://localhost:8080/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    console.log("Resposta backend:", backendResponse.status);

    const backendToken = await backendResponse.text();
    if (!backendResponse.ok) {
      throw new Error(backendToken || "Erro na autenticação com o backend.");
    }

    localStorage.setItem("token", backendToken);

    dispatch(
      setUser({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
      })
    );

    // Buscar favoritos (opcional)
    if (user.email) {
      const res = await fetch(`/api/favorites?userId=${user.email}`);
      const data = await res.json();
      if (data.favorites) {
        dispatch(setFavorites(data.favorites));
      }
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

    const loginResponse = await fetch("http://localhost:8080/auth", {
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

    const userResponse = await fetch("http://localhost:8080/auth/Usuario-logado", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await userResponse.json();

    dispatch(
      setUser({
        name: user.login,
        email: user.email,
        photo: "",
      })
    );

    const favRes = await fetch(`/api/favorites?userId=${user.email}`);
    const favData = await favRes.json();
    dispatch(setFavorites(favData.favorites || []));

    return { success: true };
  } catch (error: any) {
    console.error("Login com credenciais falhou:", error.message);
    return { success: false, message: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout (Google ou padrão)
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await firebaseSignout(auth);
    localStorage.removeItem("token"); // Remove token do backend
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

    const response = await fetch("http://localhost:8080/auth/Usuario-logado", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Token inválido ou expirado");

    const user = await response.json();

    dispatch(
      setUser({
        name: user.login,
        email: user.email,
        photo: "",
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