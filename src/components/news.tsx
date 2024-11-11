import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setLoading, setArticles, setError } from "@/redux/newsSlice";
import NewsCard from "@/components/newsCard";
import NewsHeader from "@/components/newsHeader";
import { Loader2 } from "lucide-react";

interface NewsListProps {
  isListView: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ isListView }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchNews = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `/.netlify/functions/newsProxy?apiKey=${process.env.NEXT_PUBLIC_NEWS_SECRET_KEY}`
      );
      const data = await response.json();
      dispatch(setArticles(data.articles));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const { isLoading, articles, error } = useSelector(
    (state: RootState) => state.news
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) return <p>Error fetching news</p>;

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
          } text-white font-bold py-2 px-4 rounded`}
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
          } text-white font-bold py-2 px-4 rounded`}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

const News: React.FC = () => {
  const [isListView, setIsListView] = useState<boolean>(false);
  return (
    <div className="container mx-auto p-4">
      <NewsHeader setIsListView={setIsListView} />
      <NewsList isListView={isListView} />
    </div>
  );
};

export default News;
