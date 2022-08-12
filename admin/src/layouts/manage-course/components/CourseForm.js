/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  FormHelperText,
  Box,
  Chip,
  Grid,
  ListItem,
  MenuItem,
  Paper,
  Stack,
  FormControl,
  useTheme,
  Typography,
  useMediaQuery,
  Divider,
  LinearProgress,
  Alert,
} from "@mui/material";
import { Delete, DeleteOutline, Add, Remove, AutorenewRounded } from "@mui/icons-material";

import { scrollSetting } from "utils/classUltis";
import ConfirmDialog from "components/dialog/confirm-dialog";
import TransferList from "./TransferList";
import { useFieldArray, useFormContext } from "react-hook-form";
import colors from "utils/colors";
import { Upload } from "firebase-client";
import SoftButton from "components/SoftButton";
import { useCourseController } from "context/courseContext";
import SoftInput from "components/SoftInput";
import TextField from "./TextField";
import { generateRandomString } from "utils/number-utils";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const PasswordGenerateField = () => {
  const handleGenerate = () => {
    setValue("password", generateRandomString(10));
  };
  const clearPass = () => {
    setValue("password", "");
  };
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();
  return (
    <>
      <Stack sx={{ flexDirection: "row", alignItems: "flex-end", gap: 1.5 }}>
        <TextField
          label="Mật khẩu khóa học"
          variant="outlined"
          fullWidth
          readOnly
          value={getValues("password") ?? ""}
          {...register("password")}
          error={errors.password ? true : false}
        />
        <SoftButton
          startIcon={<Remove />}
          variant="gradient"
          color="error"
          sx={{ height: 42 }}
          onClick={clearPass}
        >
          Xóa
        </SoftButton>
        <SoftButton
          startIcon={<AutorenewRounded />}
          sx={{
            minWidth: 180,
            height: 42,
          }}
          variant="gradient"
          color="primary"
          onClick={handleGenerate}
        >
          Tạo mật khẩu
        </SoftButton>
      </Stack>
    </>
  );
};

const ResultBox = () => {
  const [list, setList] = useState([]);
  const {
    register,
    formState: { errors },
    getValues,
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "gains" });

  const addNew = () => {
    setList([...list, ""]);
    append("");
  };

  return (
    <>
      <Divider sx={{ mb: 5, borderWidth: 2, borderColor: "info.main" }} orientation="horizontal" />
      <Stack sx={{ mb: 3, flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Typography className="font-medium">Kết quả đạt được</Typography>
        <SoftButton
          onClick={addNew}
          startIcon={<Add />}
          disableElevation
          variant="outlined"
          color="info"
        >
          Thêm kết quả
        </SoftButton>
      </Stack>
      <Stack gap={1}>
        {fields.map((item, index) => (
          <Stack key={item.id} sx={{ flexDirection: "row", gap: 2 }}>
            <FormControl required sx={{ flexGrow: 1 }}>
              <SoftInput
                error={errors.gains && errors.gains[index] ? true : false}
                placeholder="Nhập kết quả đạt được"
                fullWidth
                value={getValues(`gains.${index}`)}
                {...register(`gains.${index}`, { required: true })}
              />
              <FormHelperText error={errors.gains && errors.gains[index] ? true : false}>
                {(errors.gains && errors.gains[index]?.message) ||
                  "Kết quả đạt được sau khi học khóa học"}
              </FormHelperText>
            </FormControl>
            <SoftButton
              color="error"
              variant="gradient"
              onClick={() => remove(index)}
              sx={{ height: "fit-content" }}
            >
              <DeleteOutline />
            </SoftButton>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

const CourseForm = () => {
  const theme = useTheme();
  const [controller, dispatch] = useCourseController();
  const { categories, tags, levels } = controller;
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileDataURL, setFileDataURL] = useState(null);
  const bgRef = useRef(null);

  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();

  const changeBgHandler = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      setValue("background", "");
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    let uploadTask;
    if (file) {
      setValue("background", "");
      // show file in background
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);

      // upload file
      uploadTask = new Upload(
        "course-bg",
        file,
        (res) => {
          setValue("background", res);
          setFileDataURL(res);
        },
        (progress) => {
          setProgress(progress);
        }
      );
      uploadTask.start();
    } else {
      setTimeout(() => {
        if (!getValues("background")) {
          setFileDataURL();
        } else {
          setFileDataURL(getValues("background"));
        }
      }, [500]);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
      uploadTask?.stop();
      setProgress(0);
    };
  }, [file, getValues, setValue]);

  const handleDelete = (selected) => () => {
    const newList = getValues("tags")?.filter((_, index) => selected !== index);
    setValue("tags", newList);
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "100%", flexDirection: "column", py: 4 }} gap={2}>
        {errors.content && <Alert severity="error">{errors.content?.message}</Alert>}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography ml={0.5} gutterBottom className="font-medium">
              Các thông tin cơ bản của khóa học
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} xl={8}>
            <TextField
              label="Tên khóa học"
              variant="outlined"
              fullWidth
              value={getValues("title")}
              {...register("title", { required: true })}
              error={errors.title ? true : false}
              helperText={errors.title?.message || "Vd: Cấu trúc dữ liệu và giải thuật, ..."}
            />
            <TextField
              label="Mô tả ngắn cho khóa học(Không bắt buộc)"
              multiline
              rows={4}
              fullWidth
              value={getValues("shortDesc")}
              {...register("shortDesc", { required: true })}
              error={errors.shortDesc ? true : false}
              helperText={errors.shortDesc?.message || "Tóm tắt các tính chất của khóa học"}
            />
            <Stack
              sx={{ flexDirection: "row", gap: 2, mt: 2, width: "100%" }}
              flexWrap={matchMd ? "nowrap" : "wrap"}
            >
              <TextField
                select
                label="Danh mục"
                sx={{ flexGrow: 1 }}
                onChange={() => {}}
                fullWidth={!matchMd}
                placeholder="Danh mục khóa học"
                value={categories.length > 0 ? getValues("category") || "" : ""}
                {...register("category", { required: true })}
                error={errors.category ? true : false}
                helperText={errors.category?.message || "Lựa chọn danh mục cho khóa học"}
              >
                {[
                  ...categories.map((item) => ({
                    value: item._id,
                    name: item.name,
                  })),
                ].map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                sx={{ flexGrow: 1 }}
                select
                label="Mức độ"
                value={levels.length > 0 ? getValues("level") || "" : ""}
                {...register("level", { required: true })}
                error={errors.level ? true : false}
                helperText={errors.level?.message || "Lựa chọn cấp độ cho khóa học"}
              >
                {levels.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5} xl={4} minHeight={{ xs: 250, sm: 300, lg: 380 }}>
            <Stack gap={1} width="100%" pt={{ xs: 0, md: 4 }} height="100%">
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  bgcolor: theme.palette.grey[800],
                  ...(fileDataURL && {
                    backgroundImage: `url(${fileDataURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }),
                }}
              >
                {progress > 0 && progress < 100 && (
                  <Box
                    sx={{
                      width: "100%",
                      position: "absolute",
                      right: 0,
                      left: 0,
                      top: 5,
                      px: 1,
                    }}
                  >
                    <LinearProgress
                      sx={{ height: 8, borderRadius: 1 }}
                      variant="determinate"
                      value={progress}
                    />
                  </Box>
                )}
                <input
                  type="file"
                  hidden
                  ref={bgRef}
                  accept=".png, .jpg, .jpeg"
                  onChange={changeBgHandler}
                />
                <Stack
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    gap: 1,
                    flexDirection: "row",
                  }}
                >
                  <SoftButton variant="contained" onClick={() => bgRef.current.click()}>
                    Đổi ảnh nền
                  </SoftButton>
                  {file && (
                    <SoftButton
                      sx={{ minWidth: 40 }}
                      variant="gradient"
                      color="error"
                      onClick={() => setFile(null)}
                    >
                      <Delete color="light" />
                    </SoftButton>
                  )}
                </Stack>
              </Paper>
              <Typography sx={{ color: errors.background ? "error.main" : "text.main" }} ml={1}>
                {errors.background?.message || " Background khóa học"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ flexGrow: 1, width: "100%" }}>
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid " + theme.palette.divider,
                  p: 0.6,
                  display: "flex",
                  alignSelf: "start",
                  gap: 2,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <SoftButton
                  sx={{ flexShrink: 0 }}
                  variant="gradient"
                  color="info"
                  onClick={() => setOpen(true)}
                >
                  Thêm Tag
                </SoftButton>
                <Box sx={{ height: 42, position: "relative", flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      gap: 0.5,
                      listStyle: "none",
                      p: 0.5,
                      m: 0,
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      ...scrollSetting({
                        overflowX: "overlay",
                        overflowY: "hidden",
                        width: 5,
                      }),
                    }}
                    component="ul"
                  >
                    {getValues("tags")?.map((data, index) => {
                      let tag = tags.find((item) => item._id === data);
                      return (
                        <ListItem sx={{ p: 0, width: "fit-content" }} key={index}>
                          <Chip
                            label={tag?.name}
                            sx={{
                              bgcolor: colors.at(index),
                              color: "#fff",
                            }}
                            onDelete={handleDelete(index)}
                          />
                        </ListItem>
                      );
                    })}
                  </Box>
                </Box>
              </Paper>
              <FormHelperText>Thêm tag để khóa học dễ dàng được tìm thấy</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <PasswordGenerateField />
          </Grid>
          <Grid item xs={12}>
            <ResultBox />
          </Grid>
        </Grid>
      </Box>
      <ChooseTagsDialog
        open={open}
        setOpen={setOpen}
        tags={tags}
        selected={getValues("tags")}
        onSave={(data) => {
          setValue("tags", data);
        }}
      />
    </>
  );
};

export default CourseForm;

const ChooseTagsDialog = ({ open, setOpen, onSave, selected, tags }) => {
  const [data, setData] = useState([]);

  const selectTags = useMemo(() => {
    return tags
      .filter((item) =>
        selected ? (selected.findIndex((e) => e === item._id) >= 0 ? true : false) : false
      )
      .map((tag) => ({ value: tag._id, name: tag.name }));
  }, [selected, tags]);
  const tagArray = useMemo(() => tags?.map((tag) => ({ value: tag._id, name: tag.name })), [tags]);

  return (
    <ConfirmDialog
      onAccept={() => onSave && onSave(data)}
      open={open}
      setOpen={setOpen}
      title="Chọn tag cho khóa học"
    >
      <TransferList
        elevation={0}
        data={tagArray}
        selected={selectTags}
        onChange={setData}
        leftTitle="Tag chưa chọn"
        rightTitle="Tag đã chọn"
      />
    </ConfirmDialog>
  );
};
