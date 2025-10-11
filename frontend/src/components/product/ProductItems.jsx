import React from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

const ProductItems = ({ product, coloumnSize }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${coloumnSize} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product?.images[0]?.url}
                    alt="Product"
                />
                <div
                    className="card-body ps-3 d-flex justify-content-center flex-column"
                >
                    <h5 className="card-title">
                        <Link to={`/product/${product?._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto d-flex">
                        <StarRatings
                            rating={product?.ratings}
                            starRatedColor="#ffb829"
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="1px"
                        />
                        <span id="no_of_reviews" className="pt-2 ps-2"> {product?.numOfReviews} </span>
                    </div>
                    <p className="card-text mt-2">{product?.price || 0}</p>
                    <Link to={`/product/${product?._id}`} id="view_btn" className="btn btn-block">
                        View Details {/* Replace with a valid URL */}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductItems
