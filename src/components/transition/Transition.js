import { Slide } from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide ref={ref} {...props} />;
});

export default Transition;
