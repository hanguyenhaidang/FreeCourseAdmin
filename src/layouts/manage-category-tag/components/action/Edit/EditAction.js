/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { AddRounded, DeleteOutline, EditRounded } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useTheme } from "@mui/material";
import { editCategory, editTag } from "services/api/categoryAPI";
import TextField from "../../TextField";
import SoftBox from "components/SoftBox";

const EditAction = ({ params, onEdit, type = ["category", "tag"] }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [formCategory, setFormCategory] = useState({
    categoryName: "",
    categoryUrl: "",
  });

  const [formTag, setFormTag] = useState({
    tagName: "",
  });

  const onAccept = async () => {
    try {
      if (type === "category") {
        const body = { name: formCategory.categoryName, urlPath: formCategory.categoryUrl };
        await editCategory(params.row._id, body);
      }
      if (type === "tag") {
        const body = { name: formTag.tagName };
        await editTag(params.row._id, body);
      }
      onEdit();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params) {
      if (type === "category") {
        setFormCategory({ categoryName: params.row?.name, categoryUrl: params.row?.urlPath });
      }
      if (type === "tag") {
        setFormTag({ tagName: params.row?.name });
      }
    }
  }, [params]);
  return (
    <>
      <SoftButton
        variant="gradient"
        style={{ marginRight: 10 }}
        color="info"
        onClick={() => setOpen(true)}
      >
        <EditRounded />
      </SoftButton>
      <ConfirmDialog open={open} title={"Sửa " + type} setOpen={setOpen} onAccept={onAccept}>
        {type === "category" && (
          <SoftBox>
            <TextField
              fullWidth
              label={"Tên danh mục:"}
              value={formCategory.categoryName}
              onChange={(e) => {
                setFormCategory({ ...formCategory, categoryName: e.target.value });
              }}
            />
            <TextField
              fullWidth
              label={"URL:"}
              value={formCategory.categoryUrl}
              onChange={(e) => {
                setFormCategory({ ...formCategory, categoryUrl: e.target.value });
              }}
            />
          </SoftBox>
        )}
        {type === "tag" && (
          <SoftBox>
            <TextField
              fullWidth
              label={"Tên danh mục:"}
              value={formTag.tagName}
              onChange={(e) => {
                setFormTag({ ...formTag, tagName: e.target.value });
              }}
            />
          </SoftBox>
        )}
      </ConfirmDialog>
    </>
  );
};

export default EditAction;
