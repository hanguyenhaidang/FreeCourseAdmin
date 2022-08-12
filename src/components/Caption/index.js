import React, { useState } from "react";
import { Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const Caption = ({ caption, ...other }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [captionText, setCaptionText] = useState(caption || "");
  const theme = useTheme();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Typography
      paragraph
      sx={{
        margin: theme.spacing(1, 0),
      }}
      {...other}
    >
      {captionText.length < 150
        ? captionText
        : isReadMore
        ? captionText
        : captionText.slice(0, 150)}
      <Typography
        component="span"
        className="font-semibold cursor-pointer"
        onClick={toggleReadMore}
      >
        {" "}
        {captionText.length < 150 ? "" : isReadMore ? "less" : "...more"}
      </Typography>
    </Typography>
  );
};

Caption.propTypes = {
  caption: PropTypes.any,
};

export default Caption;
