/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Transition from "components/transition/Transition";
import LessonForm from "./LessonForm";

const StepFormDialog = ({ open, setOpen, moduleData }) => {
  const [stepType, setStepType] = useState("lesson");

  const goBack = () => {
    if (step) {
      setOpen(false);
    } else {
      setStepType("");
    }
  };

  const { step } = { step: null };

  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      TransitionProps={{ direction: "up" }}
      PaperProps={{ sx: { bgcolor: "background.main", overflowX: "hidden" } }}
    >
      <LessonForm
        goBack={goBack}
        close={() => setOpen(false)}
        open={stepType === "lesson"}
        moduleData={moduleData}
      />
    </Dialog>
  );
};

export default StepFormDialog;
