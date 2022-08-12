/* eslint-disable react/prop-types */
import React from "react";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "center" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const Dialog = ({ open, setOpen, title, children, actions, maxWidth, sx, ...others }) => {
  return (
    <MuiDialog
      open={open}
      maxWidth={maxWidth}
      onClose={() => setOpen && setOpen(false)}
      fullWidth
      TransitionComponent={Transition}
      sx={sx}
      {...others}
    >
      <DialogTitle onClose={() => setOpen && setOpen(false)}>{title}</DialogTitle>
      <DialogContent sx={{ pt: "20px !important" }}>{children}</DialogContent>
      {actions && <DialogActions sx={{ padding: 1.5 }}>{actions}</DialogActions>}
    </MuiDialog>
  );
};
Dialog.propTypes = {
  title: PropTypes.any,
  setOpen: PropTypes.func.isRequired,
};
export default Dialog;
