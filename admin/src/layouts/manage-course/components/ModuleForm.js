/* eslint-disable react/prop-types */
import { Box, Collapse, Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  AddCircleOutline,
  AddTask,
  FormatListNumbered,
  SettingsApplications,
} from "@mui/icons-material";

import { useFieldArray, useFormContext } from "react-hook-form";
import SoftButton from "components/SoftButton";
import GroupList from "./module/GroupList";
import { useCourseController } from "context/courseContext";
import SoftTypography from "components/SoftTypography";
import TextField from "./TextField";

const AddModuleForm = ({ open }) => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();
  // const { courseData } = useSelector((state) => state.manageCourse);
  const resetValue = () => setValue("");

  const addNew = () => {
    if (courseData) {
      // dispatch({
      //   type: ADD_NEW_MODULE_REQUEST,
      //   body: { title: value },
      //   courseId: courseData._id,
      //   callback: resetValue,
      // });
    }
  };

  return (
    <Collapse in={open}>
      <Paper sx={{ bgcolor: theme.palette.grey[200], p: 1 }} elevation={0}>
        <SoftTypography textGradient color="info" gutterBottom>
          Tạo chủ đề khóa học
        </SoftTypography>
        <TextField
          label="Tên chương(*)"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          helperText="Vd: Cấu trúc dữ liệu và giải thuật, ..."
          fullWidth
        />
        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <SoftButton variant="outlined" color="info" onClick={resetValue}>
            Hủy bỏ
          </SoftButton>
          <SoftButton
            onClick={addNew}
            disabled={value.length === 0}
            startIcon={<AddCircleOutline />}
            color="info"
            variant="gradient"
          >
            Lưu
          </SoftButton>
        </Stack>
      </Paper>
    </Collapse>
  );
};

const ModuleList = ({ editMode, modules }) => {
  const { control, getValues } = useFormContext();
  const [controller, dispatch] = useCourseController();
  const { swap, move } = useFieldArray({
    control,
    name: "modules",
  });
  const update = (module) => {
    const { id: moduleId, name: title, courseId } = module;
    // dispatch({ type: EDIT_MODULE_REQUEST, moduleId, courseId, title });
  };
  const remove = (module) => {
    const { id: moduleId, courseId } = module;
    // dispatch({ type: REMOVE_MODULE_REQUEST, moduleId, courseId });
  };

  const stepProps = useMemo(
    () => ({
      getStepData: (moduleId, stepId) => {
        // dispatch({ type: GET_LESSON_DATA_REQUEST, moduleId, stepId });
      },
      deleteStep: (courseId, moduleId, stepId) => {
        // dispatch({ type: DELETE_LESSON_REQUEST, moduleId, stepId, courseId });
      },
      updateStep: (moduleId, stepId, body) => {
        // dispatch({ type: UPDATE_LESSON_REQUEST, moduleId, stepId, body });
      },
    }),
    []
  );

  const fields = getValues("modules");
  return (
    <Stack className="w-full mt-4" gap={1} mb={32}>
      {modules?.map((item, index) => (
        <GroupList
          key={index}
          isEnded={index === fields.length - 1}
          editMode={editMode}
          move={move}
          createStep={() => {
            // dispatch({ type: CREATE_NEW_STEP });
          }}
          remove={remove}
          update={update}
          index={index}
          data={item}
          stepProps={stepProps}
        />
      ))}
    </Stack>
  );
};

function ModuleForm() {
  const [editMode, setEditMode] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const [courseController, dispatch] = useCourseController();
  const { modules } = courseController;

  const courseModules = useMemo(() => {
    if (!modules) {
      return [];
    }
    return modules.reduce((arr, module) => {
      const name = module.title;
      const id = module._id;
      const courseId = module.courseId;
      const steps = module.steps.map((step) => ({
        name: step.title,
        id: step._id,
        href: editMode ? `/manage-course/learning/${module.courseId}/${step._id}` : "./",
        type: step.type === "lesson" ? "video" : "test",
        time: step.time,
      }));
      arr.push({ id, name, steps, courseId });
      return arr;
    }, []);
  }, [modules, editMode]);

  return (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column", mt: 4 }} gap={2}>
      <Stack direction="row" gap={2} px={1}>
        <SoftButton
          onClick={() => setAddModule((s) => !s)}
          startIcon={<AddTask />}
          color="info"
          variant={addModule ? "gradient" : "outlined"}
        >
          Thêm Chương
        </SoftButton>
        <SoftButton
          startIcon={<SettingsApplications />}
          onClick={() => setEditMode((s) => !s)}
          color="info"
          variant={editMode ? "gradient" : "outlined"}
        >
          Chỉnh sửa
        </SoftButton>
      </Stack>
      <AddModuleForm open={addModule} />
      <Box pt={1}>
        <SoftTypography
          variant="h5"
          sx={{
            ml: 2,
            fontWeight: "medium",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
          textGradient
          gutterBottom
          color="info"
        >
          <FormatListNumbered /> Danh sách các chương
        </SoftTypography>
        <ModuleList editMode={editMode} modules={courseModules} />
      </Box>
    </Box>
  );
}

export default ModuleForm;
