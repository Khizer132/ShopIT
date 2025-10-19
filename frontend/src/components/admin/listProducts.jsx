import React, { useEffect } from 'react';
import { useGetAdminProductsQuery } from '../../redux/api/productApi';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/adminLayout';

const ListProducts = () => {
    const { isLoading, error, data } = useGetAdminProductsQuery();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [error]);

    console.log("Admin Products Data:", data); // Debugging

    const setProducts = (products) => {
        console.log("Products passed to setProducts:", products); // Debugging

        const tableData = {
            columns: [
                {
                    label: 'Product ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Stock',
                    field: 'stock',
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

        products?.forEach((product) => {
            tableData.rows.push({
                id: product._id,
                name: `${product?.name.substring(0, 20)}`,
                stock: product?.stock,
                actions: (
                    <>
                        <Link to={`admin/products/${product._id}`} className="btn btn-outline-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link to={`admin/products/${product._id}/upload_images`} className="btn btn-outline-success ms-2">
                            <i className="fa fa-image"></i>
                        </Link>
                        <button className="btn btn-danger mx-2">
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
    if (error) return <p>Error loading products</p>;

    console.log("Admin Products Data:", data);

    return (
        <AdminLayout>
            {data?.products?.length > 0 ? (
                <>
                    <h3 className="mt-5">{data.products.length} Products</h3>
                    <MDBDataTable
                        data={setProducts(data.products)}
                        className="px-3"
                        striped
                        hover
                    />
                </>
            ) : (
                <p>No products found</p>
            )}
        </AdminLayout>
    );
};

export default ListProducts;