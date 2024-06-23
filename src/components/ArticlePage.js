import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './ArticlePage.css';

const ArticlePage = () => {
  const { id } = useParams();
  const article = useSelector((state) => state.news.articles[id]);

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="article-page">
      
      <Link to="/"><button>Back to Home</button></Link>
      <h1>{article.title}</h1>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default ArticlePage;
