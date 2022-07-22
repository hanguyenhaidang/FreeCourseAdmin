/* eslint-disable react/prop-types */
import React from "react";
import { DeleteOutline } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { deleteBlog } from "services/api/blogAPI";

const DeleteAction = ({ params, onDelete }) => {
  const [open, setOpen] = React.useState(false);
  const onAccept = async () => {
    try {
      await deleteBlog(params.row._id);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };
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
        title={`Xóa bài viết`}
        setOpen={setOpen}
        deleted
        onAccept={onAccept}
      >
        <SoftTypography variant="body2">
          Bạn có chắc chắn muốn xóa bài viết <strong>{params.row.title}</strong> này không ?
        </SoftTypography>
      </ConfirmDialog>
    </>
  );
};

export default DeleteAction;
