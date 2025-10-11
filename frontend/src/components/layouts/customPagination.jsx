import React from 'react'
import Pagination from 'react-js-pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const CustomPagination = ({resultPerPage, filteredProductsCount}) => {

    const [currentPage, setCurrentPage] = useState();
    let [searchParams] = useSearchParams();

    const naviagte = useNavigate();

    const page = Number(searchParams.get('page') || 1);

    useEffect(() => {
        setCurrentPage(page)
    }, [page]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
        if(searchParams.get('page')){
            searchParams.set('page', pageNumber);
        }
        else{   
            searchParams.append('page', pageNumber);
        }

        const path = window.location.pathname + "?" + searchParams.toString();
        naviagte(path);
    };

    console.log(resultPerPage, filteredProductsCount);

  return (
    <div className="d-flex justify-content-center mt-5">
      {filteredProductsCount > resultPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
        />
       )}
    </div>
  )
}

export default CustomPagination
