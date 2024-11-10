"use client";
import { useQuery } from "react-query";
import axios from "axios";

const fetchNews = async () => {
  const apiKey = "0b39bd073b704123af216bfee6d21226";
  const { data } = await axios.get(
    `https://newsapi.org/v2/everything?q=tesla&from=2024-10-09&sortBy=publishedAt&apiKey=${apiKey}`
  );
  return data.articles;
};

export const useFetchNews = () => {
  return useQuery("news", fetchNews);
};
