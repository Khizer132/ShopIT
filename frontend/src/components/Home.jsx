import React, { useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { useGetProductsQuery } from '../redux/api/productApi';
import ProductItems from './product/ProductItems';
import Loader from './layouts/Loader';
import { toast } from 'react-hot-toast';
import CustomPagination from './layouts/customPagination';
import { useSearchParams } from 'react-router-dom';
import Filters from './layouts/Filters';

const Home = () => {

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page") || 1);
    const keyword = searchParams.get("keyword") || "";
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const category = searchParams.get("category");
    const ratings = searchParams.get("ratings");


    const params = { page, keyword };

    min !== null && (params.min = min);
    max !== null && (params.max = max);
    category !== null && (params.category = category);
    ratings !== null && (params.ratings = ratings);

    console.log("Fetching products with params:", params);


    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    const coloumnSize = keyword ? 4 : 3;

    if (isLoading) {
        <Loader/>
    }

    useEffect(() => {
        if(isError){
            toast.error(error?.data?.message);
        }
    }, [isError, error]);

    return (
        <>
            <MetaData title = { "Buy Best Product Online" } />
            <div className="row">
                {keyword && (
                    <div className="col-6 col-md-3 mt-5">
                        <Filters />
                    </div>
                )}
                <div className= {keyword ? "col-12 col-sm-6 col-md-9" : "col-12 col-sm-6 col-md-12"}>
                    <h1 id="products_heading" className="text-secondary">
                        {keyword ? 
                        `${data?.products?.length} Products found with keyword: ${keyword}` 
                        : "Latest Products"}
                    </h1>

                    <section id="products" className="mt-5">
                        <div className="row">
                            {data?.products?.map(product => (
                                <ProductItems product={product} coloumnSize={coloumnSize}/>
                            ))}

                            <CustomPagination 
                            resultPerPage={data?.resultPerPage} 
                            filteredProductsCount={data?.filteredProductsCount} 
                            />   
                        </div>
                    </section>

                    
                    
                </div>
            </div>
        </>
    );
};

export default Home;