import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import AdminLayout from '../layouts/adminLayout';
import { useLazyGetProductReviewsQuery, useDeleteProductReviewMutation } from '../../redux/api/productApi';

const ListReviews = () => {

    const [productId, setProductId] = useState("");

    const [getProductReviews, { data, isLoading, error }] = useLazyGetProductReviewsQuery();

    const [deleteProductReviews, { error: deleteError, isLoading: isDeleteLoading, isSuccess }] = useDeleteProductReviewMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }
        if (isSuccess) {
            toast.success("Review deleted");

        }
    }, [error, deleteError, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        getProductReviews(productId);

    };

    const deleteReviewHandler = (id) => {
        deleteProductReviews({ productId, id });

    }

    const setReviews = (reviews) => {
        console.log("Users passed to setUsers:", reviews); // Debugging

        const tableData = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc',
                },
            ],
            rows: [],
        };

        reviews?.forEach((review) => {
            tableData.rows.push({
                id: review?._id,
                user: review?.user?.name,
                rating: review?.rating,
                comment: review?.comment,
                actions: (
                    <>
                        <button className="btn btn-danger mx-2"
                        onClick={() => deleteReviewHandler(review?._id)}
                        disabled={isDeleteLoading}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        console.log("Table Data:", tableData); // Debugging

        return tableData;
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <AdminLayout>
                <div className="row justify-content-center my-5">
                    <div className="col-6">
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label htmlFor="productId_field" className="form-label">
                                    Enter Product ID
                                </label>
                                <input
                                    type="text"
                                    id="productId_field"
                                    className="form-control"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </div>

                            <button
                                id="search_button"
                                type="submit"
                                className="btn btn-primary w-100 py-2"
                            >
                                SEARCH
                            </button>
                        </form>
                    </div>
                </div>

                <h5 className="mt-3 text-center">Product name: <b></b></h5>
                {data?.reviews ? (
                    <MDBDataTable
                        data={setReviews(data.reviews)}
                        className="px-3"
                        striped
                        hover
                    />
                ) : (
                    <p className="text-center mt-4 text-muted">No reviews found or no product selected.</p>
                )}

            </AdminLayout >
        </>
    )
}

export default ListReviews
