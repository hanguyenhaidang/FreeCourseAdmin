/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import { Stack, Button } from "@mui/material";
import SoftButton from "components/SoftButton";

const ConfirmDialog = ({
  open,
  setOpen,
  onAccept,
  deleted,
  onRefuse,
  title,
  children,
  sx,
  ...others
}) => {
  return (
    <Dialog
      title={title}
      sx={sx}
      open={open}
      setOpen={setOpen}
      actions={
        <Stack flexDirection="row" gap={1}>
          <SoftButton
            width={80}
            sx={{ height: 42 }}
            color="info"
            variant="outlined"
            onClick={() => {
              setOpen(false);
              onRefuse && onRefuse();
            }}
          >
            Hủy
          </SoftButton>
          <SoftButton
            width={80}
            variant="gradient"
            color="info"
            sx={{ height: 42 }}
            {...(deleted && {
              color: "error",
              disableElevation: true,
            })}
            onClick={() => {
              setOpen(false);
              onAccept && onAccept();
            }}
          >
            Xác nhận
          </SoftButton>
        </Stack>
      }
      {...others}
    >
      {children}
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.any.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ConfirmDialog;
