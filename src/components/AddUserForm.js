import React, { useState, useEffect } from "react";

// import Sweet alert
import Swal from "sweetalert2";

// ============= MATERIAL UI==========
import { Button, Dialog } from "@mui/material";
import {
    TextField,
    Autocomplete,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Alert,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// ============= HOOK ==========
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddUserMutation } from "../apiSlice";
import { useDispatch } from "react-redux";

import { string, z, date, boolean } from "zod";

const schema = z.object({
    firstName: string().nonempty("First Name is required"),
    lastName: string().nonempty("Last Name is required"),
    address: string().nonempty("Address is required"),
    email: string().email("Invalid email format").nonempty("Email is required"),
    userName: string().nonempty("Username is required"),
    password: string().nonempty("Password is required"),
    isAdmin: boolean().refine((value) => value !== null, {
        message: "Role is required",
        path: ["isAdmin"],
    }),
    gender: string().nonempty("Gender is required"),
    birthday: date().refine((value) => value !== null && value !== undefined, {
        message: "Birthday is required.",
        path: ["birthday"],
    }),
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddUserForm = ({ open, onClose, agreeText, disagreeText, handleCloseForm }) => {
    // ============= RTK ==========
    const dispatch = useDispatch();

    const [
        addUser,
        {
            isSuccess: isAddSuccess,
            isError: isAddError,
            error: errorAdd,
            isLoading: submitIsLoading,
        },
    ] = useAddUserMutation();

    // ============= HOOKS ==========
    const {
        register,
        handleSubmit,
        control,
        reset: resetForm,
        formState,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { errors } = formState;

    const showSuccessAlert = () => {
        Swal.fire({
            title: "Success",
            text: "User added successfully!",
            icon: "success",
        });
    };

    useEffect(() => {
        if (submitIsLoading) {
            Swal.close();
            Swal.fire({
                title: "Processing",
                html: "Please wait...",
                showCancelButton: false,
                showConfirmButton: false,
            });
        }

        if (isAddSuccess) {
            Swal.close();
            showSuccessAlert();
            resetForm();
        } else if (isAddError) {
            Swal.close();
            Swal.fire({
                title: "Error",
                text: `An error occurred: ${errorAdd.message}`,
                icon: "error",
            });
        }
    }, [submitIsLoading, isAddSuccess, isAddError, errorAdd, resetForm]);

    const submitForm = async (data) => {
        try {
            onClose();
            const res = await addUser(data);
            console.log("result: ", res.status);
        } catch (error) {
            console.log(error);
        }
    };

    // const submitForm = async (data) => {
    //     onClose();
    //     resetForm();
    //     const res = await addUser(data);
    //     console.log('result: ', res.status);
    // };

    // ============= PASS VISIBILITY ==========
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // ============= ALERT TRIGGERS ==========
    const [alert, setAlert] = useState(false);

    // ============= MUI CUSTOMIZE ==========
    const styles = {
        dialogPaper: {
            minHeight: "80vh",
            maxHeight: "80vh",
        },
        inputContainer: {
            width: "250px",
            flex: "1",
        },
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                className="form-container"
            >
                <DialogTitle sx={{ fontWeight: "bold" }}>Add User Form</DialogTitle>
                <DialogContent sx={{ width: "500px", height: "60vh", overflowY: "auto" }}>
                    <form className="input-box" onSubmit={handleSubmit(submitForm)}>
                        <div className="row">
                            <TextField
                                sx={{
                                    width: styles.inputContainer.flex,
                                }}
                                error={errors?.firstName}
                                helperText={errors?.firstName?.message}
                                {...register("firstName")}
                                label="First Name"
                                variant="outlined"
                            />

                            <TextField
                                sx={{
                                    width: styles.inputContainer.flex,
                                }}
                                error={errors?.lastName}
                                helperText={errors?.lastName?.message}
                                {...register("lastName")}
                                label="Last Name"
                                variant="outlined"
                            />
                        </div>

                        <div className="row">
                            <FormControl
                                sx={{
                                    width: styles.inputContainer.flex,
                                }}
                                error={errors?.isAdmin}
                                helperText={errors?.isAdmin?.message}
                            >
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Controller
                                    name="isAdmin"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Role"
                                            {...field}
                                        >
                                            <MenuItem value={true}>Admin</MenuItem>
                                            <MenuItem value={false}>User</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <FormControl
                                sx={{
                                    width: styles.inputContainer.flex,
                                }}
                                error={errors?.gender}
                                helperText={errors?.gender?.message}
                            >
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Gender"
                                            {...field}
                                        >
                                            <MenuItem value={"Male"}>Male</MenuItem>
                                            <MenuItem value={"Female"}>Female</MenuItem>
                                            <MenuItem value={"Other"}>Other</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <Controller
                                error={errors?.birthday}
                                helperText={errors?.birthday?.message}
                                name="birthday"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{
                                                width: styles.inputContainer.flex,
                                            }}
                                            label="Birthday"
                                            value={field.value}
                                            onChange={(date) => {
                                                field.onChange(new Date(date));
                                            }}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>

                        <div className="row">
                            <TextField
                                sx={{
                                    width: styles.inputContainer.flex,
                                }}
                                error={errors?.address}
                                helperText={errors?.address?.message}
                                {...register("address")}
                                label="Address"
                                variant="outlined"
                            />
                        </div>
                        <hr />

                        <div className="col">
                            <TextField
                                error={errors?.userName}
                                helperText={errors?.userName?.message}
                                {...register("userName")}
                                label="Username"
                                variant="outlined"
                            />
                            <TextField
                                error={errors?.email}
                                helperText={errors?.email?.message}
                                {...register("email")}
                                label="Email"
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-basic"
                                error={errors?.password}
                                helperText={errors?.password?.message}
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                variant="outlined"
                                {...register("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <DialogActions>
                            <Button
                                onClick={() => {
                                    onClose();
                                    resetForm();
                                }}
                            >
                                {disagreeText}
                            </Button>
                            <Button type="submit">{agreeText}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddUserForm;
