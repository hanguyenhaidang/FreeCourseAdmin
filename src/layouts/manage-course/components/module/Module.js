/* eslint-disable react/prop-types */
import {
  Article,
  Assignment,
  ClearAll,
  DeleteRounded,
  EditRounded,
  SlowMotionVideoRounded,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";
import ConfirmDialog from "components/dialog/confirm-dialog";
import SoftTypography from "components/SoftTypography";

const Module = (props) => {
  const {
    component,
    type = "default",
    editMode,
    title,
    href,
    time,
    active,
    moduleId,
    id,
    disabled,
    courseId,
    getStepData,
    deleteStep,
    updateStep,
    setOpenStepForm,
  } = props;
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const navigate = useNavigate();
  const styles = {
    box: {
      padding: (theme) => theme.spacing(0.5, 1.5, 0.5, 1.2),
      minHeight: 50,
      borderRadius: 0.8,
      "&:hover p": {
        color: (theme) => theme.palette.info.main,
      },
      borderLeft: "3px solid transparent",
      "&:hover": {
        backgroundColor: (theme) => theme.palette.action.hover + "60",
        borderLeft: (theme) => "3px solid " + theme.palette.info.main,
      },
      mb: 0.4,
    },
    content: {
      color: (theme) => theme.palette.text.main,
      marginRight: 1,
      cursor: "pointer",
    },
  };
  let Icon;
  switch (type) {
    case "video":
      Icon = SlowMotionVideoRounded;
      break;
    case "document":
      Icon = Article;
      break;
    case "test":
      Icon = Assignment;
      break;
    default:
      Icon = ClearAll;
      break;
  }

  const setColor = (type) => {
    switch (type) {
      case "video":
        return (theme) => theme.palette.error.main;
      case "document":
        return (theme) => theme.palette.info.main;
      case "test":
        return (theme) => theme.palette.primary.main;
      default:
        return null;
    }
  };

  return (
    <>
      <ListItemButton
        component={component}
        sx={styles.box}
        disableGutters
        selected={active}
        disabled={disabled}
        {...(!editMode && { onClick: () => navigate(href) })}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Icon
            fontSize="medium"
            sx={{
              color: setColor(type),
            }}
          />
        </ListItemIcon>
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Box flexGrow={1} position="relative">
            <SoftTypography
              style={{
                transform: "translateY(-50%)",
                whiteSpace: "normal",
                position: "absolute",
                left: 0,
                right: 0,
                width: "100%",
                top: "50%",
              }}
              sx={styles.content}
              variant="body2"
            >
              {title}
            </SoftTypography>
          </Box>
          <Stack direction="row" alignItems="center" flexShrink={0}>
            <SoftTypography sx={styles.content} variant="body2">
              {millisecondsToMinutes(time)}:
              {(millisecondsToSeconds(time) - millisecondsToMinutes(time) * 60 + "0").substring(
                0,
                2
              )}
            </SoftTypography>
            {editMode && (
              <>
                <IconButton
                  color="info"
                  onClick={() => {
                    setOpenStepForm(true);
                    getStepData(moduleId, id);
                  }}
                >
                  <EditRounded />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    setOpenConfirm(true);
                    console.log(courseId, moduleId, id);
                  }}
                >
                  <DeleteRounded />
                </IconButton>
              </>
            )}
          </Stack>
        </Stack>
      </ListItemButton>
      <ConfirmDialog
        deleted
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Xóa bài học"
        onAccept={() => deleteStep && deleteStep(courseId, moduleId, id)}
      >
        <SoftTypography variant="body2">
          Bạn có chắc muốn xóa bài học{" "}
          <SoftTypography textGradient variant="body2" component="span" color="error">
            {title}
          </SoftTypography>{" "}
          ?
        </SoftTypography>
      </ConfirmDialog>
    </>
  );
};

export default Module;
