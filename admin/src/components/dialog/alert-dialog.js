/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import SoftButton from "components/SoftButton";

const AlertDialog = ({ open, setOpen, title, onClose, children, sx, ...others }) => {
  return (
    <Dialog
      title={title}
      sx={sx}
      open={open}
      setOpen={setOpen}
      actions={
        <SoftButton
          width={120}
          variant="gradient"
          color="info"
          onClick={() => {
            setOpen(false);
            onClose();
          }}
        >
          Đóng
        </SoftButton>
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
