import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = ({
    open,
    onClose,
    title,
    description,
    agreeText,
    disagreeText,
    handleDeleteClick,
}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-diaslog-slide-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>{disagreeText}</Button>
                    <Button onClick={handleDeleteClick}>{agreeText}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteModal;
