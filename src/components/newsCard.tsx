import React, { useState } from "react";
import { dateString, truncateText } from "@/utils/common";
import Link from "next/link";

const NewsCard = ({ currentItems, isListView }) => {
  const [expandedArticles, setExpandedArticles] = useState<number[]>([]);

  const toggleExpandArticle = (index: number) => {
    setExpandedArticles((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <div className="container mx-auto p-4">
      <div
        className={`grid gap-4 ${isListView ? "grid-cols-1" : "grid-cols-2"}`}
      >
        {currentItems.length > 0 &&
          currentItems.map((article, index) => {
            const isExpanded = expandedArticles.includes(index);
            return (
              <div className="rounded overflow-hidden shadow-lg" key={index}>
                <img
                  width="100%"
                  className="md:h-30 lg:h-68"
                  src={
                    article.urlToImage
                      ? article.urlToImage
                      : `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Jw19b9ki0UqSS_nDNv33XQHaEw%26pid%3DApi&f=1&ipt=177d93e6600b72ebd2dac5fafbdc66e39d2689e7d94dda66156711e19855c8d3&ipo=images`
                  }
                  alt="new image"
                />
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold">
                    {truncateText(article.title, 100)}
                  </h2>
                  <span>
                    {article.author} :{dateString(article.publishedAt)}
                  </span>
                  <p>
                    {isExpanded
                      ? article.description
                      : truncateText(article.description, 100)}
                  </p>
                  <button
                    className="text-sky-600 hover:text-sky-700 font-semibold mt-10"
                    onClick={() => toggleExpandArticle(index)}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                  <div className="text-sky-600 hover:text-sky-700 font-semibold mt-10 text-center">
                    <Link
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Article
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default NewsCard;
