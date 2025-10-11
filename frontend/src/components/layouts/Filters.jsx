import React, { use } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../helpers/helper'
import { PRODUCT_CATEGORIES } from '../constants'
import { get } from 'mongoose'
import StarRatings from 'react-star-ratings'

const Filters = () => {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const naviagte = useNavigate();
    let [searchParams] = useSearchParams();

    // Handle Price Change
    const handlePriceChange = (e) => {
        e.preventDefault();
        console.log("Min Price:", min);
        console.log("Max Price:", max);
        // Add your filtering logic here
        searchParams = getPriceQueryParams(searchParams, 'min', min);
        searchParams = getPriceQueryParams(searchParams, 'max', max);

        const path = window.location.pathname + "?" + searchParams.toString();
        naviagte(path);
        
    }

    // Handle Category Change
    const handleCategoryChange = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name);
        console.log(checkboxes);

        checkboxes.forEach((item) => {
            if(item !== checkbox) item.checked = false;
    });
        if(checkbox.checked === false) {
            if(searchParams.has(checkbox.name)) {
                searchParams.delete(checkbox.name);
                const path = window.location.pathname + "?" + searchParams.toString();
                naviagte(path);
            }
            
        } else {
            
            if(searchParams.has(checkbox.name)) {
                searchParams.set(checkbox.name, checkbox.value);
            } else {
                searchParams.append(checkbox.name, checkbox.value);
            }        
            const path = window.location.pathname + "?" + searchParams.toString();
            naviagte(path);
        }


    };

    // Default Checked Handler
    const defaultCheckedHandler = (checkboxType, checkboxValue) => {
        const value = searchParams.get(checkboxType);
        if(checkboxValue === value) {
            return true;
        }
        return false;
      
    }
    
    return (
        <div>
            <div className="border p-3 filter">
                <h3>Filters</h3>
                <hr />
                <h5 className="filter-heading mb-3">Price</h5>
                <form
                    id="filter_form"
                    className="px-2"
                    onSubmit={handlePriceChange}
                >
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Min ($)"
                                name="min"
                                value={min}
                                onChange={(e) => setMin(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Max ($)"
                                name="max"
                                value={max}
                                onChange={(e) => setMax(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary">GO</button>
                        </div>
                    </div>
                </form>
                <hr />
                <h5 className="mb-3">Category</h5>

                {PRODUCT_CATEGORIES.map((category) => (
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="category"
                        id="check4"
                        value={category}
                        defaultChecked={defaultCheckedHandler("category", category)}
                        onClick={(e) => handleCategoryChange(e.target)} 
                    />
                    <label className="form-check-label" for="check4"> {category} </label>
                </div>
                ))}
                

                <hr />
                <h5 className="mb-3">Ratings</h5>

                {[5,4,3,2,1].map((rating)=> (
                    <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="ratings"
                        id="check7"
                        value={rating}
                        defaultChecked={defaultCheckedHandler("ratings", rating.toString())}
                        onClick={(e) => handleCategoryChange(e.target)}
                    />
                    <label className="form-check-label" for="check7">
                        <StarRatings
                            rating={rating}
                            starRatedColor="#ffb829"
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="1px"
                        />
                    </label>
                </div>

                ))}

            </div>

        </div>
    );
};


export default Filters
