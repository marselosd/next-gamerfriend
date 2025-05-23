import { createSlice } from '@reduxjs/toolkit';

const windowSlice = createSlice({
  name: 'window',
  initialState: {
    width: null,
  },
  reducers: {
    setWindowWidth(state, action) {
      state.width = action.payload;
    },
  },
});

export const { setWindowWidth } = windowSlice.actions;
export default windowSlice.reducer;