import React, { useEffect } from 'react';
import { useGetAdminUsersQuery } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/adminLayout';

const ListUsers = () => {
    const { isLoading, error, data } = useGetAdminUsersQuery();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        
    }, [error]);

    /*const deleteuserHandler = (id) => {
        deleteuser({id});
    };*/

    console.log("Admin Users Data:", data); // Debugging

    const setUsers = (users) => {
        console.log("Users passed to setUsers:", users); // Debugging

        const tableData = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                },
                {
                    label: 'Role',
                    field: 'role',
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

        users?.forEach((user) => {
            tableData.rows.push({
                id: user?._id,
                name: user?.name,
                email: `${user?.email.substring(0, 20)}`,
                role: user?.role,
                actions: (
                    <>
                        <Link to={`/admin/Users/${user?._id}`} className="btn btn-outline-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger mx-2" 
                        //onClick={() => deleteUserHandler(user?._id)}
                            //disabled={isDeleteLoading}
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
    if (error) return <p>Error loading Users</p>;

    return (
        <AdminLayout>
            {data?.users?.length > 0 ? (
                <>
                    <h3 className="mt-5">{data.users.length} Users</h3>
                    <MDBDataTable
                        data={setUsers(data.users)}
                        className="px-3"
                        striped
                        hover
                    />
                </>
            ) : (
                <p>No Users found</p>
            )}
        </AdminLayout>
    );
};

export default ListUsers;