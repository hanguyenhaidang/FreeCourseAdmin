/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { PhotoCamera } from "@mui/icons-material";
import { accountType } from "constants/auth-constants";
import { Upload } from "firebase-client";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const AvatarWrapper = ({ data, setAvatar, setBg }) => {
  const [file, setFile] = useState(null);
  const [fileAvt, setFileAvt] = useState(null);
  const theme = useTheme();

  const bgRef = useRef(null);
  const avtRef = useRef(null);

  const changeBgHandler = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  const changeAvtHandler = (e) => {
    const avt = e.target.files[0];
    if (!avt?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFileAvt(avt);
  };

  useEffect(() => {
    let uploadTask;
    if (file) {
      // upload file
      uploadTask = new Upload("user-bg", file, (res) => {
        setBg(res);
        setFile(null);
      });
      uploadTask.start();
    }

    return () => {
      uploadTask?.stop();
    };
  }, [file, setBg]);

  useEffect(() => {
    let uploadTask;
    if (fileAvt) {
      // upload file
      uploadTask = new Upload("user-avt", fileAvt, (res) => {
        setAvatar(res);
        setFileAvt(null);
      });
      uploadTask.start();
    }

    return () => {
      uploadTask?.stop();
    };
  }, [fileAvt, setAvatar]);

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          backgroundImage: `url(${data.background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: 10,
        }}
        sx={{
          width: "100%",
          aspectRatio: {
            xs: "20/8",
            md: "20/6",
            lg: "20/5",
          },
          position: "relative",
          border: "1px solid #000",
        }}
      >
        <input type="file" accept="image/*" hidden ref={bgRef} onChange={changeBgHandler} />
        <IconButton
          sx={{
            bottom: 5,
            right: 5,
            position: "absolute",
            backgroundColor: theme.palette.background.paper,
            "&:hover": {
              backgroundColor: theme.palette.background.default,
            },
          }}
          onClick={() => bgRef.current.click()}
        >
          <PhotoCamera />
        </IconButton>
      </Box>
      <Stack
        flexDirection="row"
        gap={2}
        sx={{
          padding: (theme) => theme.spacing(0, 0, 0, 2),
          mt: 1,
        }}
      >
        <Box
          sx={{
            width: {
              md: 140,
              lg: 220,
              sm: 160,
              xs: 100,
            },
            height: {
              md: 140,
              lg: 220,
              sm: 160,
              xs: 100,
            },
            mt: {
              md: -7,
              sm: -9,
              lg: -12,
              xs: -6,
            },
            position: "relative",
            borderRadius: "50%",
            border: (theme) => {
              return {
                sm: "5px solid " + theme.palette.info.light[100],
                xs: "2px solid " + theme.palette.info.light,
              };
            },
          }}
        >
          <Avatar sx={{ width: "100%", height: "100%" }} src={data.avatar} />
          <input type="file" accept="image/*" hidden ref={avtRef} onChange={changeAvtHandler} />
          <IconButton
            sx={{
              bottom: {
                xs: 0,
                sm: 5,
                lg: 10,
              },
              right: {
                xs: 0,
                sm: 5,
                lg: 10,
              },
              position: "absolute",
              width: 35,
              height: 35,
              backgroundColor: theme.palette.background.paper,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
            }}
            onClick={() => avtRef.current.click()}
          >
            <PhotoCamera fontSize="small" />
          </IconButton>
        </Box>
        <Stack flexDirection="column" gap={0.5} flexGrow={1}>
          <Typography>{data?.fullName}</Typography>
          <Typography variant="caption">{accountType[data.type]}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AvatarWrapper;
