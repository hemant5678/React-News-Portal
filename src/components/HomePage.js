import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../slices/newsSlice";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { articles, totalResults, status, error } = useSelector(
    (state) => state.news
  );
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchArticles({ category, page: page + 1, query: searchTerm }));
  }, [category, page,searchTerm, dispatch]);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchQuery);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  console.log(articles);

  return (
    <div className="home">
      <nav class="navbar navbar-dark bg-dark navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <h2>
              <span className="text-primary">N</span>ews{" "}
              <span className="text-danger">P</span>ortal
            </h2>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse ms-5 navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li class="nav-item me-3">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item me-3">
                <a class="nav-link" href="#">
                  Trending
                </a>
              </li>
              <li class="nav-item ">
                <div className="filter">
                  <select className="select" onChange={handleCategoryChange} value={category}>
                    <option value="">Category</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="Ssience">Science</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                
              </li> 
            </ul>
             <form onSubmit={handleSearchSubmit} class=" w-50 form">
              <input
                class="form-control me-2"
                type="search"
                // value={searchQuery}
                // onChange={handleSearchChange}
                placeholder="Search for news..."
                aria-label="Search"
              />
              <button class="btn btn-danger " type="submit">
                Search
              </button>
            </form> 
          </div>
        </div>
      </nav>
      <div className="articles-data">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>{error}</p>}
        <div className="articles">
          {articles.map((article, index) => (
            <div key={index} className="article">
              <Link to={`/article/${index}`}>
                <h3 className="text-danger">
                  <strong>{article.title}</strong>
                </h3>
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} />
                )}
                <p className="text-black fw-bold">{article.description}</p>
              </Link>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={Math.ceil(totalResults / 10)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
           
      </div>
   
    </div>
    
  );
};

export default HomePage;
