import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Search = () => {

    // State to hold the search keyword
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();

    // Handler for search form submission
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword?.trim()) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate("/");
        }
    };
    

  return (
    <div>
      <form onSubmit={searchSubmitHandler}>
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
    </div>
  )
}

export default Search
