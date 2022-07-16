export const textEllipse = (line) => {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "line",
    overflow: "hidden",
  };
};

export const centerItems = () => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
};

export const scrollSetting = (options) => {
  options = {
    overflowX: "hidden",
    overflowY: "overlay",
    width: 8,
    scrollThumbColor: (theme) => theme.palette.shadow.main + "50",
    ...options,
  };
  return {
    overflowX: options.overflowX,
    overflowY: options.overflowY,
    height: "100%",
    "&::-webkit-scrollbar": {
      WebkitAppearance: "none",
    },
    "&::-webkit-scrollbar:vertical": {
      width: options.width,
    },
    "&::-webkit-scrollbar:horizontal": {
      height: options.width,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: options.scrollThumbColor,
      borderRadius: 1,
    },
  };
};

export const maxLines = (line = 1) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: line,
  WebkitBoxOrient: "vertical",
});
