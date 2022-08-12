/* eslint-disable react/prop-types */
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Card, Stack, Tab, Tabs } from "@mui/material";
import { AddCircle, Save } from "@mui/icons-material";
import TabPanel from "components/TabPanel";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useSoftUIController } from "context";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useCourseController } from "context/courseContext";
import { getAllLevels } from "services/api/categoryAPI";
import { GET_LEVELS_SUCCESS } from "context/courseContext";
import { COURSE_ERROR } from "context/courseContext";
import { getAllTags } from "services/api/categoryAPI";
import { GET_TAGS_SUCCESS } from "context/courseContext";
import { getAllCategories } from "services/api/categoryAPI";
import CourseForm from "../components/CourseForm";
import { GET_CATEGORIES_SUCCESS } from "context/courseContext";
import ContentForm from "../components/ContentForm";
import { getCourse } from "services/api/courseAPI";
import { GET_COURSE_DETAIL_SUCCESS } from "context/courseContext";
import { GET_COURSE_DETAIL_REQUEST } from "context/courseContext";
import { createCourse, updateCourse } from "services/api/courseAPI";
import ModuleForm from "../components/ModuleForm";
import { getAllModules } from "services/api/courseAPI";
import { GET_ALL_MODULES_SUCCESS } from "context/courseContext";

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
    sx: {
      overflow: "unset",
      whiteSpace: "nowrap!important",
    },
  };
}

const courseSchema = yup.object().shape({
  title: yup.string().max(100).required("Tiêu đề khóa học không được để trống"),
  content: yup.string().required("Nội dung khóa học không được để trống"),
  shortDesc: yup.string().max(500).required("Mô tả ngắn cho khóa học không được để trống"),
  level: yup.string().required("Cấp độ của khóa học không được để trống"),
  category: yup.string().required("Danh mục khóa học không được để trống"),
  background: yup.string().required("Ảnh nền không được để trống"),
  gains: yup.array().of(yup.string().required("Không được để trống nội dung")),
});

const CreateCourse = ({ type = "create" }) => {
  const { courseId } = useParams();
  const [selected, setSelected] = useState(0);
  const [controller] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = controller;
  const [courseController, dispatch] = useCourseController();
  const { courseDetail: courseData } = courseController;
  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };
  const [formData, setFormData] = useState({
    tags: [],
    title: "",
    shortDesc: "",
    content: "",
    level: "",
    category: "",
    background: "",
    gains: [],
    modules: [],
    password: "",
  });

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(courseSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (type === "edit" && courseId) {
      dispatch({ type: GET_COURSE_DETAIL_REQUEST });
      getCourse(courseId)
        .then((course) => dispatch({ type: GET_COURSE_DETAIL_SUCCESS, payload: course }))
        .catch((error) => dispatch({ type: COURSE_ERROR, payload: error.message }));
    }
  }, [courseId, type]);

  useEffect(() => {
    getAllLevels()
      .then((levels) => dispatch({ type: GET_LEVELS_SUCCESS, payload: { levels } }))
      .catch((error) => dispatch({ type: COURSE_ERROR, payload: error.message }));

    getAllTags()
      .then((tags) => dispatch({ type: GET_TAGS_SUCCESS, payload: { tags } }))
      .catch((error) => dispatch({ type: COURSE_ERROR, payload: error.message }));

    getAllCategories()
      .then((categories) => {
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: { categories } });
      })
      .catch((error) => dispatch({ type: COURSE_ERROR, payload: error.message }));
  }, []);

  useEffect(() => {
    if (courseData) {
      methods.setValue("tags", courseData.tags);
      methods.setValue("title", courseData.title);
      methods.setValue("shortDesc", courseData.shortDesc);
      methods.setValue("content", courseData.content);
      methods.setValue("level", courseData.level);
      methods.setValue("category", courseData.category);
      methods.setValue("background", courseData.background);
      methods.setValue("gains", courseData.gains);
      methods.setValue("modules", courseData.modules);
      methods.setValue("password", courseData.password ?? "");
    } else {
      methods.setValue("tags", []);
      methods.setValue("title", "");
      methods.setValue("shortDesc", "");
      methods.setValue("content", "");
      methods.setValue("level", "");
      methods.setValue("category", "");
      methods.setValue("background", "");
      methods.setValue("gains", []);
      methods.setValue("modules", []);
      methods.setValue("password", "");
    }
  }, [courseData, methods]);

  useEffect(() => {
    if (courseId || courseData?._id) {
      getAllModules(courseId || courseData?._id)
        .then(({ modules }) => dispatch({ type: GET_ALL_MODULES_SUCCESS, payload: modules }))
        .catch((error) => dispatch({ type: COURSE_ERROR, payload: error.message }));
    }
  }, [courseData, courseId]);

  useEffect(() => {
    const subscription = methods.watch((value) => setFormData(value));
    return () => {
      subscription.unsubscribe();
    };
  }, [methods]);

  const onSubmit = (data) => {
    if (!courseData) {
      createCourse(data)
        .then((course) => dispatch({ type: GET_COURSE_DETAIL_SUCCESS, payload: course }))
        .catch((error) => dispatch({ type: COURSE_ERROR, payload: error.message }));
    } else {
      updateCourse(courseId || courseData._id, data)
        .then((course) => dispatch({ type: GET_COURSE_DETAIL_SUCCESS, payload: course }))
        .catch((error) => dispatch({ type: COURSE_ERROR, payload: error.message }));
    }
  };
  const onError = (errors) => console.log(errors);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormProvider {...methods}>
        <Card
          component="form"
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          sx={{
            p: 2,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <SoftBox>
              <SoftBox>
                <SoftTypography variant="h4" fontWeight="bold" textGradient color={sidenavColor}>
                  {type === "edit" ? "Chỉnh sửa khóa học" : "Tạo khóa học"}
                </SoftTypography>
              </SoftBox>
              <SoftBox>
                <SoftTypography variant="body2">Tạo và lưu trữ khóa học</SoftTypography>
              </SoftBox>
            </SoftBox>

            <Stack direction="row" gap={1} display={selected < 2 ? "flex" : "none"}>
              <SoftButton variant="outlined" color="light">
                Hủy
              </SoftButton>
              <SoftButton
                sx={{ height: "fit-content" }}
                color={sidenavColor}
                type="submit"
                variant={transparentSidenav ? "gradient" : "outlined"}
                startIcon={<Save />}
              >
                {courseData ? "Lưu và tiếp tục" : "Tạo khóa học mới"}
              </SoftButton>
            </Stack>
          </Stack>
          <Tabs
            orientation={"horizontal"}
            variant="scrollable"
            value={selected}
            onChange={handleSelectedChange}
            allowScrollButtonsMobile
            aria-label="Vertical tabs example"
            sx={{
              flexShrink: 0,
              marginX: 1,
              height: 50,
            }}
          >
            <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
            <Tab label="Nội dung khóa học" {...a11yProps(1)} />
            <Tab label="Chủ đề bài học" disabled={!courseData} {...a11yProps(2)} />
          </Tabs>

          <TabPanel index={0} value={selected}>
            <CourseForm />
          </TabPanel>
          <TabPanel index={1} value={selected}>
            <ContentForm />
          </TabPanel>
          <TabPanel index={2} value={selected}>
            <ModuleForm />
          </TabPanel>
        </Card>
      </FormProvider>
    </DashboardLayout>
  );
};

export default CreateCourse;
