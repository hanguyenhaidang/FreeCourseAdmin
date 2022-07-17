/* eslint-disable react/prop-types */
import React from "react";
import { DeleteOutline } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

const DeleteAction = ({ params }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <SoftButton
        variant="gradient"
        style={{ marginLeft: 16 }}
        color="error"
        onClick={() => setOpen(true)}
      >
        <DeleteOutline />
      </SoftButton>
      <ConfirmDialog
        open={open}
        title={`Xóa khóa học`}
        setOpen={setOpen}
        deleted
        onAccept={() => {}}
      >
        <SoftTypography variant="body2">
          Bạn có chắc chắn muốn xóa khóa học {params.row.title} này không
        </SoftTypography>
      </ConfirmDialog>
    </>
  );
};

export default DeleteAction;
