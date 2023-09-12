import React, { useState, useEffect } from "react";
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from "../apiSlice";
import { useSelector } from "react-redux";

// import MUI
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ConstructionOutlined } from "@mui/icons-material";

// import Sweet alert
import Swal from "sweetalert2";

// import other components
import DeleteModal from "./DeleteModal";
import EditUserForm from "./EditUserForm";
import Loading from "./Loading";

const DisplayUsers = () => {
    // ------- role of a user, admin or user
    const role = useSelector((state) => state.isAdminSlice.isAdmin);

    // ------- api
    const { data: users, isError, error, isLoading } = useGetUsersQuery();

    const [
        deleteUser,
        {
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: errorDelete,
            isLoading: deleteIsLoading,
        },
    ] = useDeleteUserMutation();

    const [updateUser] = useUpdateUserMutation();

    // ------- local states
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [formModal, setFormModal] = useState(false);

    useEffect(() => {
        if (deleteIsLoading) {
            Swal.close();
            setOpenModal(false);
            Swal.fire({
                title: "Deleting in process.",
                html: "Please wait...",
                showCancelButton: false,
                showConfirmButton: false,
            });
        }

        if (isDeleteSuccess) {
            Swal.close();
            showSuccessAlert();
        } else if (isDeleteError) {
            Swal.close();
            Swal.fire({
                title: "Error",
                text: `An error occurred: ${errorDelete.message}`,
                icon: "error",
            });
        }
    }, [deleteIsLoading, isDeleteSuccess, isDeleteError, errorDelete]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>{error.status}</div>;
    }
    const openFormModal = () => {
        setFormModal(true);
        console.log("the id before nisulod sa edituserform", rowSelectionModel[0]);
    };
    const closeFormModal = () => {
        setRowSelectionModel([]);
        setFormModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // DELETE SECTION -----------------------------------

    const showSuccessAlert = () => {
        Swal.fire({
            title: "Success",
            text: "User deleted successfully!",
            icon: "success",
        });
    };

    const handleDeleteClick = async () => {
        try {
            for (const userId of rowSelectionModel) {
                const result = await deleteUser(userId); // Call the mutate function with the userId as an argument
                if (result.data.success) {
                    console.log(result.data.success);
                } else {
                    console.log("delete true is not success", result.error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // END OF DELETE SECTION -----------------------------------

    //default columns to show
    const userColumns = [
        { field: "firstname", headerName: "Firstname", flex: 1 },
        { field: "lastname", headerName: "Lastname", flex: 1 },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "birthday", headerName: "Birthday", flex: 1 },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 },
    ];

    // only show action column if admin
    if (role === true) {
        userColumns.push({
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="multiple-icon-container">
                        <EditIcon className="button-icon action-style" onClick={openFormModal} />
                        <DeleteIcon
                            className="button-icon action-style"
                            onClick={handleOpenModal}
                        />
                    </div>
                );
            },
        });
    }

    const userRows = users.map((user, index) => ({
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        username: user.userName,
        email: user.email,
        gender: user.gender,
        birthday: user.birthday ? new Date(user.birthday).toLocaleDateString() : "N/A",
        address: user.address || "N/A",
        role: user.isAdmin ? "admin" : "user",
    }));

    return (
        <div className="table-container">
            {users && (
                <Box sx={{ height: 500, width: 1 }}>
                    <DataGrid
                        columns={userColumns}
                        rows={userRows}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                csvOptions: { disableToolbarButton: true },
                                printOptions: { disableToolbarButton: true },
                            },
                        }}
                        initialState={{
                            ...userRows.initialState,
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[5, 10, 20, 30]}
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                        sx={{
                            ".MuiDataGrid-columnHeaderTitle": {
                                fontWeight: "bold",
                            },
                        }}
                    />

                    {formModal && (
                        <EditUserForm
                            open={formModal}
                            onClose={closeFormModal}
                            disagreeText="Cancel"
                            agreeText="Submit"
                            closeFormModal={closeFormModal}
                            userId={rowSelectionModel[0]}
                        />
                    )}

                    {openModal && (
                        <DeleteModal
                            open={openModal}
                            onClose={handleCloseModal}
                            title="Delete User?"
                            description="Are you sure you want to delete this user? This action is irreversible and will remove all associated data and permissions for the user."
                            disagreeText="Close"
                            agreeText="Delete"
                            handleDeleteClick={handleDeleteClick}
                        />
                    )}
                </Box>
            )}
        </div>
    );
};

export default DisplayUsers;
