import { EditRounded } from "@mui/icons-material";
import { Box, Stack, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditContentDialog from "./EditContentDialog";
import ReactHtmlParser from "react-html-parser";
import Prism from "prismjs";
import { useFormContext } from "react-hook-form";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const ContentForm = () => {
  const theme = useTheme();
  const {
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [openContentDialog, setOpenContentDialog] = useState(false);
  useEffect(() => {
    if (getValues("content")) {
      Prism.highlightAll();
    }
  }, [getValues]);
  return (
    <>
      <Box
        sx={{
          p: 2,
          minHeight: 700,
          height: "100%",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <SoftBox>
            <SoftTypography variant="h6" fontWeight="bold" textGradient color="info">
              Nội dung khóa học
            </SoftTypography>
          </SoftBox>
          <SoftButton
            startIcon={<EditRounded />}
            variant="gradient"
            color="info"
            onClick={() => setOpenContentDialog(true)}
          >
            Thêm / Chỉnh sửa
          </SoftButton>
        </Stack>
        <SoftBox className="content">{ReactHtmlParser(getValues("content"))}</SoftBox>
      </Box>
      <EditContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
        setContent={(value) => setValue("content", value)}
        initialValue={getValues("content") || ""}
      />
    </>
  );
};

export default ContentForm;
