/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Add, AddRounded, DeleteOutline } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useTheme } from "@mui/material";
import { addCategory, addTag } from "services/api/categoryAPI";
import { useSoftUIController } from "context";
import SoftBox from "components/SoftBox";
import TextField from "../../TextField";
import { useMessageController, SET_MESSAGE } from "context/messageContext";

const AddAction = ({ type = ["category", "tag"] }) => {
  const [controller] = useSoftUIController();
  const [messageController, dispatch] = useMessageController();
  const { sidenavColor, transparentSidenav } = controller;
  // const { message, show, reset } = messageController;
  const [open, setOpen] = React.useState(false);

  const [formCategory, setFormCategory] = useState({
    categoryName: "",
    categoryUrl: "",
  });

  const [formTag, setFormTag] = useState({
    tagName: "",
  });

  const theme = useTheme();
  const onAccept = async () => {
    try {
      if (type === "category") {
        const body = { name: formCategory.categoryName, urlPath: formCategory.categoryUrl };
        await addCategory(body);
        const message = `Đã thêm danh mục ${formCategory.categoryName}`;
        dispatch({ type: SET_MESSAGE, payload: message });
      }
      if (type === "tag") {
        const body = { name: formTag.tagName };
        const message = `Đã thêm nhãn ${formTag.tagName}`;
        dispatch({ type: SET_MESSAGE, payload: message });
        await addTag(body);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SoftButton
        variant="outlined"
        style={{ marginRight: 10 }}
        color={sidenavColor}
        onClick={() => setOpen(true)}
        startIcon={<Add />}
      >
        Thêm {type}
      </SoftButton>
      <ConfirmDialog
        maxWidth="md"
        open={open}
        title={"Thêm " + type}
        setOpen={setOpen}
        // deleted
        onAccept={onAccept}
      >
        {type === "category" && (
          <SoftBox>
            <TextField
              fullWidth
              label={"Tên danh mục:"}
              onChange={(e) => {
                setFormCategory({ ...formCategory, categoryName: e.target.value });
              }}
            />
            <TextField
              fullWidth
              label={"URL:"}
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
              label={"Tên nhãn:"}
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

export default AddAction;
