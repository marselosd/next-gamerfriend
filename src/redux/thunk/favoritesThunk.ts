import { AppDispatch, RootState } from "@/redux/store";
import { setFavorites } from "@/redux/slices/authSlice";

export const fetchFavorites = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const userId = getState().auth.user?.email;
  if (!userId) return;

  try {
    const res = await fetch(`/api/favorites?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) throw new Error('Erro ao buscar favoritos');
    const data = await res.json();
    dispatch(setFavorites(data.favorites || []));
  } catch (error) {
    console.error(error);
  }
};

export const toggleFavorite = (itemId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const userId = getState().auth.user?.email;
  if (!userId) return;

  try {
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId }),
    });
    if (!res.ok) throw new Error('Erro ao atualizar favoritos');
    const data = await res.json();

    dispatch(setFavorites(data.favorites));
  } catch (error) {
    console.error(error);
  }
};
