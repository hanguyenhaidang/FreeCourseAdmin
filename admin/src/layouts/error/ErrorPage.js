import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AlertDialog from "components/dialog/alert-dialog";
import { useAuthController } from "context/authContext";
import { useCourseController } from "context/courseContext";
import { useMessageController } from "context/messageContext";
import { RESET_ERROR } from "context/authContext";
import SoftTypography from "components/SoftTypography";

const ErrorPage = (props) => {
  const [open, setOpen] = useState(false);
  const [authController, authDispatch] = useAuthController();
  const [courseController, courseDispatch] = useCourseController();
  const [messageController, messageDispatch] = useMessageController();
  const { error: courseError } = courseController;
  const { error: authError } = authController;
  const { error: messageError } = messageController;

  useEffect(() => {
    if (courseError || authError || messageError) {
      setOpen(true);
    }
  }, [courseError, authError, messageError]);

  const handleClose = () => {
    authDispatch({ type: RESET_ERROR });
    courseDispatch({ type: RESET_ERROR });
    messageDispatch({ type: RESET_ERROR });
  };

  return (
    <AlertDialog title="Thông báo" onClose={handleClose} open={open} setOpen={setOpen}>
      <SoftTypography variant="body2">
        {courseError || authError || messageError || ""}
      </SoftTypography>
    </AlertDialog>
  );
};

ErrorPage.propTypes = {};

export default ErrorPage;
