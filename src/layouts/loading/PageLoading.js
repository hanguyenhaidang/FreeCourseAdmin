import { Backdrop, Box, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./loading.scss";

const PageLoading = () => {
  const theme = useTheme();
  const { promiseInProgress } = usePromiseTracker({ area: "general" });
  useEffect(() => {
    const oldStyle = document.body.style.overflow;
    if (promiseInProgress) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = oldStyle;
      document.body.style.paddingRight = "unset";
    }
    return () => (document.body.style.overflow = oldStyle);
  }, [promiseInProgress]);
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background:
          theme.palette.mode === "light"
            ? "#fff"
            : "linear-gradient(45deg, rgba(0,0,0,0.8855917366946778) 0%, rgba(0,0,0,0.9360119047619048) 10%, rgba(1,1,1,0.9612219887955182) 20%, rgba(1,1,1,0.9808298319327731) 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 49%, rgba(0,0,0,0.9) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={promiseInProgress}
    >
      <Box className="loader">
        <div>
          <ul>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <li key={index}>
                  <svg viewBox="0 0 90 120" fill="currentColor">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
              ))}
          </ul>
        </div>
        <Typography component="span">Loading</Typography>
      </Box>
    </Backdrop>
  );
};

export default PageLoading;
