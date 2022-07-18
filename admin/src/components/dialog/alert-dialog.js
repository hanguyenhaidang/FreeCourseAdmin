/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import Button from "../button/Button";

const AlertDialog = ({ open, setOpen, title, children, sx, ...others }) => {
  return (
    <Dialog
      title={title}
      sx={sx}
      open={open}
      setOpen={setOpen}
      actions={
        <Button width={80} onClick={() => setOpen(false)}>
          Đóng
        </Button>
      }
      {...others}
    >
      {children}
    </Dialog>
  );
};

AlertDialog.propTypes = {
  title: PropTypes.any.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AlertDialog;
