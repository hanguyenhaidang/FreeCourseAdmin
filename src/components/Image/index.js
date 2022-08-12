import { Box } from "@mui/material";
import { forwardRef } from "react";

const Image = forwardRef((props, ref) => <Box ref={ref} component="img" {...props} />);

export default Image;
