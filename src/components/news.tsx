"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setLoading, setArticles, setError } from "@/redux/newsSlice";
import { useFetchNews } from "@/hooks/useFetchNews";
import NewsCard from "@/components/newsCard";
import NewsHeader from "@/components/NewsHeader";

const NewsList: React.FC = ({ isListView }: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, error } = useFetchNews();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    } else if (data) {
      dispatch(setLoading(false));
      dispatch(setArticles(data));
    }
  }, [isLoading, data, error, dispatch]);

  const { articles } = useSelector((state: RootState) => state.news);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news: {error.message}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <NewsCard currentItems={currentItems} isListView={isListView} />
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-700"
          } text-white
            font-bold py-2 px-4 rounded`}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`${
            currentPage === totalPages ? "bg-gray-300" : "bg-gray-700"
          } text-white
            font-bold py-2 px-4 rounded`}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

const News: React.FC = () => {
  const [isListView, setIsListView] = useState(false);
  console.log("isListView", isListView);
  return (
    <div className="container mx-auto p-4">
      <NewsHeader setIsListView={setIsListView} />
      <NewsList isListView={isListView} />
    </div>
  );
};

export default News;
