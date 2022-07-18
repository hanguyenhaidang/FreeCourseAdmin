/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  MenuItem,
  Slide,
  Stack,
  LinearProgress,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
} from "@mui/material";
import {
  Article,
  Close,
  EditRounded,
  Save,
  Source,
  Upload as UploadIcon,
  YouTube,
} from "@mui/icons-material";
import Prism from "prismjs";
import ReactHtmlParser from "react-html-parser";
import EditContentDialog from "./EditContentDialog";
import ReactPlayer from "react-player";
import { millisecondsToHours, millisecondsToMinutes } from "date-fns";
import { Upload } from "firebase-client";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import TextField from "./TextField";
import SoftInput from "components/SoftInput";
import { useCourseController } from "context/courseContext";
import { createLesson } from "services/api/courseAPI";
import { GET_ALL_MODULES_SUCCESS } from "context/courseContext";
import { getAllModules } from "services/api/courseAPI";
import { COURSE_ERROR } from "context/courseContext";
import { updateStep } from "services/api/courseAPI";

const UploadFile = ({ setValue }) => {
  const theme = useTheme();
  const fileRef = useRef();
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadTask, setUploadTask] = useState(null);
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (file && uploadTask) {
      uploadTask?.start();
    }
    return () => {
      uploadTask?.stop();
      setProgress(0);
    };
  }, [file, uploadTask]);

  const doUpload = useCallback(() => {
    if (file) {
      const task = new Upload(
        "course-data",
        file,
        (res) => {
          setValue(res);
          setFile(null);
          setTimeout(() => setProgress(0), 500);
        },
        (res) => setProgress(res)
      );
      setUploadTask(task);
    }
  }, [file, setValue]);

  return (
    <Box>
      <SoftTypography variant="h6" gutterBottom>
        Tải lên tài liệu
      </SoftTypography>
      <Stack direction="row">
        <SoftInput
          readOnly
          value={file?.name || "Chọn tệp để tải lên"}
          sx={{ borderRadius: theme.spacing(1, 0, 0, 1), flexGrow: 1 }}
        />
        <SoftButton
          variant="outlined"
          onClick={() => fileRef.current.click()}
          color="info"
          sx={{ borderRadius: theme.spacing(0, 1, 1, 0), height: "unset" }}
        >
          Chọn File
        </SoftButton>
        <SoftButton
          variant="gradient"
          color="info"
          startIcon={<UploadIcon />}
          onClick={doUpload}
          disabled={progress !== 0}
          sx={{ height: "unset", ml: 1, width: 130 }}
        >
          Tải lên
        </SoftButton>
        <input ref={fileRef} type="file" accept="video/*" hidden onChange={handleChange} />
      </Stack>
      <Stack
        sx={{
          width: "100%",
          mt: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        {progress > 0 && (
          <>
            <LinearProgress
              sx={{ flexGrow: 1 }}
              color="info"
              variant="determinate"
              value={progress}
            />
            <SoftTypography variant="body2">{Number(progress).toFixed(2)}%</SoftTypography>
          </>
        )}
      </Stack>
    </Box>
  );
};

const EmbedYoutube = ({ setValue, value }) => {
  const theme = useTheme();
  const [href, setHref] = useState(value || "");
  const handleChange = (event) => {
    setHref(event.target.value);
    if (!event.target.value) {
      setValue("");
    }
  };
  return (
    <Box>
      <SoftTypography variant="h6" gutterBottom>
        Nhúng URL của video
      </SoftTypography>
      <Stack flexGrow={1} direction="row">
        <SoftInput
          onChange={handleChange}
          value={href}
          placeholder="Nhập URL"
          sx={{ borderRadius: theme.spacing(1, 0, 0, 1), flexGrow: 1 }}
        />
        <SoftButton
          variant="gradient"
          onClick={() => setValue(href)}
          color="error"
          sx={{
            borderRadius: theme.spacing(0, 1, 1, 0),
            height: "unset",
            width: 140,
            color: "#fff",
          }}
        >
          Xem trước
        </SoftButton>
      </Stack>
    </Box>
  );
};

function LessonForm({ goBack, open, moduleData, close }) {
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("xl"));
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [controller, dispatch] = useCourseController();
  const { step } = controller;
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    content: "",
    type: "youtube",
    stepType: "lesson",
    time: 5 * 60 * 1000,
  });

  useEffect(() => {
    Prism.highlightAll();
  }, [formData.content]);

  useEffect(() => {
    if (step) {
      setFormData({
        title: step.title,
        url: step.content.url,
        content: step.content.content,
        type: step.content.type,
        stepType: "lesson",
        time: step.time,
      });
    }
  }, [step]);

  const canSubmit =
    (formData.type === "default" ||
      (formData.url && (formData.type === "youtube" || formData.type === "video"))) &&
    formData.title;

  const submitForm = async () => {
    const { courseId, id: moduleId } = moduleData;
    const body = formData;
    console.log(body, courseId, moduleId);
    if (step) {
      try {
        await updateStep(moduleId, step._id, body);
        const { modules } = await getAllModules(courseId);
        dispatch({ type: GET_ALL_MODULES_SUCCESS, payload: modules });
        close();
      } catch (error) {
        dispatch({ type: COURSE_ERROR, payload: error.message });
      }
    } else {
      try {
        await createLesson(moduleId, body);
        const { modules } = await getAllModules(courseId);
        dispatch({ type: GET_ALL_MODULES_SUCCESS, payload: modules });
        close();
      } catch (error) {
        dispatch({ type: COURSE_ERROR, payload: error.message });
      }
    }
  };

  return (
    <>
      <Slide direction="left" in={open}>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <AppBar
            sx={{
              position: "sticky",
              backgroundColor: "background.paper",
              color: "text.primary",
              boxShadow: theme.shadows[5],
            }}
          >
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Tạo bài học
              </Typography>
              <SoftButton autoFocus variant="outlined" color="info" onClick={close} sx={{ mr: 2 }}>
                Hủy bỏ
              </SoftButton>
              <SoftButton
                startIcon={<Save />}
                autoFocus
                color="info"
                variant="gradient"
                disabled={!canSubmit}
                onClick={() => {
                  submitForm();
                }}
              >
                Lưu
              </SoftButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 2, margin: theme.spacing(0, 1, 1), height: "unset" }} className="grow">
            <SoftTypography ml={0.5} gutterBottom variant="h5" textGradient color="info">
              Các thông tin cơ bản của bài học
            </SoftTypography>
            <Stack direction="row" flexWrap="wrap" width="100%" gap={{ xs: 2, lg: 5, xl: 12 }}>
              <Box width={{ xl: "calc(100% - 800px)", lg: "calc(100% - 600px)", xs: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Tên bài học"
                      helperText={
                        formData.title
                          ? "Tiêu đề cho mỗi bài học"
                          : "Tên bài học không được để trống"
                      }
                      fullWidth
                      error={!formData.title}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} xl={9}>
                    <SoftTypography variant="h6" ml={0.5}>
                      Thời gian học
                    </SoftTypography>
                    <Stack direction="row" gap={2}>
                      <TextField
                        sx={{ flexGrow: 1 }}
                        label="Giờ"
                        value={millisecondsToHours(formData.time)}
                        select
                        onChange={(e) => {
                          const time =
                            e.target.value * 60 * 60 * 1000 +
                            (millisecondsToMinutes(formData.time) -
                              millisecondsToHours(formData.time) * 60) *
                              60 *
                              1000;
                          setFormData({ ...formData, time });
                        }}
                      >
                        {Array(13)
                          .fill(0)
                          .map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {index} giờ
                            </MenuItem>
                          ))}
                      </TextField>

                      <TextField
                        label="Phút"
                        sx={{ flexGrow: 1 }}
                        select
                        value={
                          millisecondsToMinutes(formData.time) -
                          millisecondsToHours(formData.time) * 60
                        }
                        onChange={(e) => {
                          const time =
                            e.target.value * 60 * 1000 +
                            millisecondsToHours(formData.time) * 60 * 60 * 1000;
                          setFormData({ ...formData, time });
                        }}
                      >
                        {Array(60)
                          .fill(0)
                          .map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {index} phút
                            </MenuItem>
                          ))}
                      </TextField>
                    </Stack>
                  </Grid>
                  <Grid item className="flex flex-col" xs={12}>
                    {!matchLg ? (
                      <TextField
                        label="Tài nguyên cho bài học"
                        sx={{ flexGrow: 1 }}
                        select
                        fullWidth
                        value={formData.type}
                        onChange={(e) => {
                          setFormData({ ...formData, type: e.target.value });
                        }}
                      >
                        <MenuItem value="video">Video tải lên</MenuItem>
                        <MenuItem value="document">Tài liệu</MenuItem>
                        <MenuItem value="youtube">Youtube</MenuItem>
                        <MenuItem value="default">Mặc định(Chỉ bao gồm nội dung)</MenuItem>
                      </TextField>
                    ) : (
                      <>
                        <SoftTypography variant="h6" gutterBottom ml={0.5}>
                          Tài nguyên cho bài học
                        </SoftTypography>

                        <Stack gap={1} direction="row" flexWrap="wrap" flexGrow={1}>
                          <SoftButton
                            startIcon={<UploadIcon />}
                            variant={formData.type === "video" ? "gradient" : "outlined"}
                            {...(formData.type === "video" && {
                              style: { color: "#fff" },
                            })}
                            onClick={() => setFormData({ ...formData, type: "video" })}
                            color="success"
                          >
                            Video tải lên
                          </SoftButton>
                          <SoftButton
                            startIcon={<Article />}
                            onClick={() => setFormData({ ...formData, type: "document" })}
                            variant={formData.type === "document" ? "gradient" : "outlined"}
                            {...(formData.type === "document" && {
                              style: { color: "#fff" },
                            })}
                            color="info"
                          >
                            Tài liệu
                          </SoftButton>
                          <SoftButton
                            startIcon={<YouTube />}
                            onClick={() => setFormData({ ...formData, type: "youtube" })}
                            variant={formData.type === "youtube" ? "gradient" : "outlined"}
                            {...(formData.type === "youtube" && {
                              style: { color: "#fff" },
                            })}
                            color="error"
                          >
                            Youtube
                          </SoftButton>
                          <SoftButton
                            color="primary"
                            startIcon={<Source />}
                            onClick={() => setFormData({ ...formData, type: "default" })}
                            variant={formData.type === "default" ? "gradient" : "outlined"}
                          >
                            Mặc định(Chỉ bao gồm nội dung)
                          </SoftButton>
                        </Stack>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {formData.type === "video" && (
                      <UploadFile setValue={(data) => setFormData({ ...formData, url: data })} />
                    )}

                    {formData.type === "youtube" && (
                      <EmbedYoutube setValue={(data) => setFormData({ ...formData, url: data })} />
                    )}
                  </Grid>
                </Grid>
              </Box>
              {(formData.type === "video" || formData.type === "youtube") && (
                <Stack
                  sx={{
                    flexGrow: 1,
                    justifyContent: "flex-start",
                    p: { xs: theme.spacing(1, 0), sm: 1 },
                    borderRadius: 1,
                  }}
                >
                  <Box
                    square
                    sx={{
                      position: "relative",
                      aspectRatio: "16/9",
                      maxWidth: "100%",
                    }}
                  >
                    {!formData.url && (
                      <SoftTypography
                        variant="h6"
                        textGradient
                        color="info"
                        fontWeight="bold"
                        sx={{ position: "absolute", zIndex: 2, top: 5, left: 10 }}
                      >
                        Xem trước video
                      </SoftTypography>
                    )}

                    <ReactPlayer
                      style={{
                        position: "absolute",
                        backgroundColor: "black",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                      width="100%"
                      height="100%"
                      controls={formData.type === "video"}
                      url={formData.url}
                      config={{
                        youtube: {
                          playerVars: { showinfo: 0 },
                        },
                      }}
                    />
                  </Box>
                </Stack>
              )}
            </Stack>
            <Box mt={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                pr={2}
              >
                <SoftTypography variant="h6" ml={0.5}>
                  Xem trước nội dung bài học
                </SoftTypography>
                <SoftButton
                  startIcon={<EditRounded />}
                  variant="gradient"
                  color="error"
                  onClick={() => setOpenContentDialog(true)}
                >
                  Thêm / Chỉnh sửa
                </SoftButton>
              </Stack>

              <Card
                sx={{
                  p: 2,
                  border: "1px solid " + theme.palette.divider,
                  minHeight: 600,
                }}
                elevation={0}
                className="content"
              >
                {formData.content && ReactHtmlParser(formData.content)}
              </Card>
            </Box>
          </Box>
        </Box>
      </Slide>
      <EditContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
        setContent={(value) => setFormData({ ...formData, content: value })}
        initialValue={formData.content}
      />
    </>
  );
}

export default LessonForm;
