import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsState {
  users: [];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<[]>) => {
      state.users = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUsers, setError } = userSlice.actions;

export default userSlice.reducer;
