import React, { useState } from "react";

// ============= MATERIAL UI==========
import { Box, Button, CircularProgress, Dialog } from "@mui/material";
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
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// ============= HOOK ==========
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetUserInfoQuery, useUpdateUserMutation } from "../apiSlice";

import { string, z, date, boolean } from "zod";

const schema = z.object({
    firstName: string().nonempty("First Name is required"),
    lastName: string().nonempty("Last Name is required"),
    address: string().nonempty("Address is required"),
    email: string().email("Invalid email format").nonempty("Email is required"),
    userName: string().nonempty("Username is required"),
    isAdmin: boolean().refine((value) => value !== null, {
        message: "Role is required",
        path: ["isAdmin"],
    }),
    gender: string().nonempty("Gender is required"),
    // birthday: date().refine((value) => value !== null && value !== undefined, {
    //     message: "Birthday is required.",
    //     path: ["birthday"],
    // }),
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditUserForm = ({ open, onClose, agreeText, disagreeText, userId }) => {
    const { data: user, isError, error, isFetching, isLoading } = useGetUserInfoQuery(userId);
    // ============= RTK ==========
    const [updateUser] = useUpdateUserMutation();

    // ============= FORM HOOKS ==========

    const { register, handleSubmit, control, reset, formState } = useForm({
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    const submitForm = async (form) => {
        const updatedUserData = { _id: userId, ...form };
        await updateUser(updatedUserData);
        reset();
        onClose();
    };

    // ============= PASS VISIBILITY ==========
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                <DialogTitle sx={{ fontWeight: "bold" }}>Edit User Info</DialogTitle>
                <DialogContent sx={{ width: "500px", height: "60vh", overflowY: "auto" }}>
                    {isLoading || isFetching ? (
                        <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <form className="input-box" onSubmit={handleSubmit(submitForm)}>
                                <div className="row">
                                    <TextField
                                        sx={{
                                            width: styles.inputContainer.flex,
                                        }}
                                        defaultValue={user?.firstName}
                                        InputLabelProps={{ shrink: true }}
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
                                        defaultValue={user?.lastName}
                                        InputLabelProps={{ shrink: true }}
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
                                            defaultValue={user?.isAdmin}
                                            render={({ field }) => (
                                                <Select
                                                    InputLabelProps={{ shrink: true }}
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
                                        <InputLabel id="demo-simple-select-label">
                                            Gender
                                        </InputLabel>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            defaultValue={user?.gender}
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
                                        // defaultValue={dayjs(user?.birthday)}
                                        render={({ field }) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    sx={{
                                                        width: styles.inputContainer.flex,
                                                    }}
                                                    label={`${dayjs(user?.birthday).format(
                                                        "MM/DD/YYYY"
                                                    )}`}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        field.onChange(new Date(date));
                                                    }}
                                                    slotProps={{
                                                        textField: { placeholder: "DD/MM/YYYY" },
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
                                        defaultValue={user?.address}
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
                                        defaultValue={user?.userName}
                                        helperText={errors?.userName?.message}
                                        {...register("userName")}
                                        label="Username"
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={errors?.email}
                                        defaultValue={user?.email}
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
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <DialogActions>
                                    <Button
                                        onClick={() => {
                                            reset();
                                            onClose();
                                        }}
                                    >
                                        {disagreeText}
                                    </Button>
                                    <Button type="submit">{agreeText}</Button>
                                </DialogActions>
                            </form>
                        </>
                    )}

                    {isError && <div>{error.status}</div>}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditUserForm;
