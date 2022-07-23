/* eslint-disable react/prop-types */
import React from "react";
import { AddRounded, DeleteOutline } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { DialogContent, useTheme } from "@mui/material";
import { deleteCategory, deleteTag } from "services/api/categoryAPI";
import SoftBox from "components/SoftBox";

const DeleteAction = ({ params, onDelete, type = ["category", "tag"] }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const onAccept = async () => {
    try {
      if (type === "category") {
        await deleteCategory(params.row._id);
      }
      if (type === "tag") {
        await deleteTag(params.row._id);
      }
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SoftButton
        variant="gradient"
        style={{ marginRight: 10 }}
        color="error"
        onClick={() => setOpen(true)}
      >
        <DeleteOutline />
      </SoftButton>
      <ConfirmDialog
        open={open}
        title={"Xóa " + type}
        setOpen={setOpen}
        deleted
        onAccept={onAccept}
      >
        <SoftBox>
          <SoftTypography variant="body2">
            Bạn có chắc chắn muốn xóa {type === "category" ? "danh mục" : "nhãn"}{" "}
            <strong>{params.row.name}</strong> này không ?
          </SoftTypography>
          <SoftTypography color="error" variant="caption">
            Lưu ý: Thao tác này có thể ảnh hưởng đến toàn bộ hệ thống. Nếu chắc chắn vui lòng bấm
            xác nhận.
          </SoftTypography>
        </SoftBox>
      </ConfirmDialog>
    </>
  );
};

export default DeleteAction;
