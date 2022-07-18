/* eslint-disable react/prop-types */
import { Close, Save } from "@mui/icons-material";
import { AppBar, Dialog, IconButton, Paper, Toolbar, Typography, useTheme } from "@mui/material";

import Transition from "components/transition/Transition";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import SoftButton from "components/SoftButton";

const EditContentDialog = ({ open, setOpen, initialValue, setContent }) => {
  const theme = useTheme();
  const [value, setValue] = useState(initialValue || "<p>Nội dung khóa học !!!</p>");
  const editorRef = useRef(null);
  const handleClose = () => setOpen(false);
  const handleSaveContent = () => {
    if (setContent) {
      setContent(value);
    }
  };

  useEffect(() => {
    setValue(initialValue || "<p>Nội dung khóa học !!!</p>");
  }, [initialValue]);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      disableEnforceFocus
      disableAutoFocus
      TransitionComponent={Transition}
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          backgroundColor: "background.main",
        },
      }}
    >
      <AppBar
        sx={{
          position: "sticky",
          backgroundColor: "background.main",
          color: "text.primary",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Nội dung
          </Typography>
          <SoftButton
            color="info"
            variant="outlined"
            autoFocus
            disableElevation
            onClick={handleClose}
            sx={{ mr: 3 }}
          >
            Hủy bỏ
          </SoftButton>
          <SoftButton
            startIcon={<Save />}
            autoFocus
            disableElevation
            variant="gradient"
            color="info"
            onClick={() => {
              handleClose();
              handleSaveContent();
            }}
          >
            Lưu
          </SoftButton>
        </Toolbar>
      </AppBar>
      <Paper sx={{ flexGrow: 1, m: 1, position: "relative" }} elevation={0}>
        <Editor
          apiKey="jv4isigvbusa53vjr4qg9ec2lxc9heu9jc0gp08r618c4zsy"
          onInit={(evt, editor) => (editorRef.current = editor)}
          cloudChannel="6-dev"
          value={value}
          scriptLoading={{ async: true }}
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
          }}
          init={{
            height: "100%",
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "codesample",
              "help",
              "wordcount",
              "emoticons",
            ],

            toolbar:
              "undo redo | blocks fontsize fontfamily | " +
              " bold italic underline strikethrough forecolor backcolor | emoticons link table |alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | anchor fullscreen preview | help",
            content_style: `body { font-family:${theme.typography.fontFamily}; font-size:${theme.typography.body1.fontSize} }`,
          }}
        />
      </Paper>
    </Dialog>
  );
};

export default EditContentDialog;
