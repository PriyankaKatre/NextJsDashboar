import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsState {
  articles: [];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setArticles: (state, action: PayloadAction<[]>) => {
      state.articles = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setArticles, setError } = newsSlice.actions;

export default newsSlice.reducer;
