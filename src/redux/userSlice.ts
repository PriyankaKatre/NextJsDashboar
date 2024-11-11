import { createSlice } from "@reduxjs/toolkit";

interface ErrorWithMessage {
  message: string;
}
interface NewsState {
  users: [];
  loading: boolean;
  error: ErrorWithMessage | null;
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export const { setLoading, setUsers, setError } = userSlice.actions;

export default userSlice.reducer;
