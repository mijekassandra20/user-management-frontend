// import React, { useState } from 'react'
// import { useGetUsersQuery } from '../apiSlice'

// import { DataGrid } from '@mui/x-data-grid';

// const DisplayUsers = () => {
//     const { data: users, isError, error, isFetching, isLoading } = useGetUsersQuery({
//         pollingInterval: 3000,
//         refetchOnMountOrArgChange: true,
//         skip: false,
//     });

//     if (isLoading || isFetching) {
//         return <div>loading...</div>;
//     }

//     if (isError) {
//         console.log({ error });
//         return <div>{error.status}</div>;
//     }

//     const userColumns = [
//         { field: 'firstname', headerName: 'FirstName', flex: 1 },
//         { field: 'lastname', headerName: 'Lastname', flex: 1 },
//         { field: 'username', headerName: 'Username', flex: 1 },
//         { field: 'gender', headerName: 'Gender', flex: 1 },
//         { field: 'birthday', headerName: 'Birthday', flex: 1 },
//         { field: 'address', headerName: 'Address', flex: 1 },
//         { field: 'role', headerName: 'Role', flex: 1 }
//     ]

//     const userRows = users.map((user, index) => ({
//         id: index,
//         firstname: user.firstName,
//         lastname: user.lastName,
//         username: user.userName,
//         gender: user.gender,
//         birthday: user.birthday ? new Date(user.birthday).toLocaleDateString() : 'N/A',
//         address: user.address || 'N/A',
//         role: user.isAdmin ? 'admin' : 'user'
//     }));

//     return (
//         <div>
//             <h1>Users List Sample display</h1>

//             {isFetching && <p>Fetching...</p>}

//             {users && (
//                 <DataGrid
//                     columns={userColumns}
//                     rows={userRows}
//                     initialState={{
//                         ...userRows.initialState,
//                         pagination: { paginationModel: { pageSize: 5 } },
//                     }}
//                     pageSizeOptions={[5, 10, 25]}
//                 />
//             )}

//         </div>
//     )
// }

// export default DisplayUsers