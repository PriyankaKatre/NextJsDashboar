import { createSlice } from "@reduxjs/toolkit";

interface ErrorWithMessage {
  message: string;
}
interface NewsState {
  articles: [];
  isLoading: boolean;
  error: ErrorWithMessage | null;
}

const initialState: NewsState = {
  articles: [],
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export const { setLoading, setArticles, setError } = newsSlice.actions;

export default newsSlice.reducer;
