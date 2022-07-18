/* eslint-disable react/prop-types */
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  Box,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
  Menu,
  MenuItem,
  alpha,
} from "@mui/material";
import {
  ArrowForwardIosSharp,
  AddRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  MoreVertRounded,
  DriveFileRenameOutline,
  ClearRounded,
} from "@mui/icons-material";
import Module from "./Module";

import ConfirmDialog from "components/dialog/confirm-dialog";
import Dialog from "components/dialog/dialog";
import StepFormDialog from "../StepFormDialog";
import SoftTypography from "components/SoftTypography";
import TextField from "../TextField";
import SoftButton from "components/SoftButton";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: 1,
  backgroundColor: theme.palette.background.paper,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .1)" : "rgba(0, 0, 0, .1)",
  borderRadius: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 2),
  },
  padding: theme.spacing(0, 1),
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    color: theme.palette.primary.main,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
}));

export default function GroupList(props) {
  const { editMode, data, index, move, remove, update, isEnded, stepProps, createStep } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openStepForm, setOpenStepForm] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState(data.name || "");
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = () => {
    setExpanded((s) => !s);
  };
  const movePrev = () => move(index, index - 1);
  const moveNext = () => move(index, index + 1);

  const deleteItem = () => {
    remove(data);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setValue(data.name);
  }, [data]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Accordion expanded={expanded === true} {...(!editMode && { onChange: handleChange })}>
          <AccordionSummary
            sx={{
              minHeight: 55,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <SoftTypography
                  sx={{ position: "absolute", left: 0, pr: 2, width: "100%" }}
                  variant="body2"
                  noWrap
                  {...(editMode && { onClick: handleChange })}
                >
                  {`${index + 1}.  ${data.name}`}
                </SoftTypography>
              </Box>

              {editMode ? (
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                  {matchMd && (
                    <>
                      <SoftButton
                        color="info"
                        variant="gradient"
                        onClick={() => {
                          createStep();
                          setOpenStepForm(true);
                        }}
                      >
                        Thêm bài học
                      </SoftButton>
                      <IconButton disabled={index === 0} onClick={movePrev}>
                        <ArrowUpwardRounded />
                      </IconButton>
                      <IconButton onClick={moveNext} disabled={isEnded}>
                        <ArrowDownwardRounded />
                      </IconButton>
                    </>
                  )}
                  <div>
                    <IconButton
                      // aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertRounded />
                    </IconButton>
                    <StyledMenu
                      // id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          movePrev();
                        }}
                        disabled={index === 0}
                      >
                        <ListItemIcon>
                          <ArrowUpwardRounded />
                        </ListItemIcon>
                        <ListItemText>Di chuyển lên trên</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          moveNext();
                        }}
                        disabled={isEnded}
                      >
                        <ListItemIcon>
                          <ArrowDownwardRounded />
                        </ListItemIcon>
                        <ListItemText>Di chuyển xuống dưới</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setOpenStepForm(true);
                        }}
                      >
                        <ListItemIcon>
                          <AddRounded />
                        </ListItemIcon>
                        <ListItemText>Thêm một bài học mới</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setOpenEditDialog(true);
                        }}
                      >
                        <ListItemIcon>
                          <DriveFileRenameOutline />
                        </ListItemIcon>
                        <ListItemText>Chỉnh sửa</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setOpenConfirm(true);
                        }}
                      >
                        <ListItemIcon>
                          <ClearRounded />
                        </ListItemIcon>
                        <ListItemText>Xóa chương này</ListItemText>
                      </MenuItem>
                    </StyledMenu>
                  </div>
                </Box>
              ) : (
                <SoftTypography variant="body2">{data.steps?.length || 0} bài học</SoftTypography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {data.steps?.map((item, index) => (
                <Module
                  editMode={editMode}
                  key={index}
                  type={item.type}
                  title={item.name}
                  id={item.id}
                  courseId={data.courseId}
                  moduleId={data.id}
                  href={item.href}
                  time={item.time}
                  active={item.active}
                  disabled={item.disabled}
                  setOpenStepForm={setOpenStepForm}
                  {...stepProps}
                />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
      <ConfirmDialog
        deleted
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Xóa chủ đề khóa học"
        onAccept={deleteItem}
      >
        <Typography>
          Bạn có chắc muốn xóa chương{" "}
          <Typography component="span" fontWeight={500} color="error.light">
            {data.name}
          </Typography>{" "}
          ?
        </Typography>
      </ConfirmDialog>
      <Dialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        title="Thay đổi chủ đề khóa học"
        actions={
          <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", gap: 1 }}>
            <Button
              sx={{ height: 42 }}
              onClick={() => {
                setOpenEditDialog(false);
                setValue(data.name);
              }}
            >
              Hủy
            </Button>
            <Button
              sx={{ height: 42 }}
              variant="contained"
              disableElevation
              disabled={value.length === 0}
              onClick={() => {
                setOpenEditDialog(false);
                update({ ...data, name: value });
              }}
            >
              Lưu lại
            </Button>
          </Stack>
        }
      >
        <TextField
          label="Chủ đề khóa học(*)"
          value={value}
          fullWidth
          onChange={(e) => setValue(e.target.value)}
        />
      </Dialog>
      <StepFormDialog open={openStepForm} setOpen={setOpenStepForm} moduleData={data} />
    </>
  );
}
