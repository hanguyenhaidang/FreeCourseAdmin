import { useTheme } from "@emotion/react";
import {
  ClearRounded,
  DriveFileRenameOutline,
  MoreHoriz,
  StarBorderRounded,
  StarRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Caption from "components/Caption";
import Image from "components/Image";
import UserCard from "components/UserCard";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { LIKE_COMMENT } from "store/types/data-types/blog-type";
// import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";
import { shortenNumber } from "utils/number-utils";
// import Button from "../button/Button";
// import Dropdown from "../dropdown/Dropdown";
// import DropdownItem from "../dropdown/DropdownItem";
// import DropdownMenu from "../dropdown/DropdownMenu";
// import DropdownToggle from "../dropdown/DropdownToggle";
import PropTypes from "prop-types";

function Comment(props) {
  const { owner, data, user, post } = props;
  const theme = useTheme();
  //   const dispatch = useDispatch();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const styles = {
    box: {
      marginBottom: theme.spacing(0.5),
      padding: theme.spacing(1, 1),
      borderRadius: 1,
      backgroundColor: "#EBEBEB",
    },
    likeCount: {
      backgroundColor: (theme) => theme.palette.background.main,
      padding: 1,
      borderRadius: 1,
      maxHeight: 130,
      "&:hover": {
        backgroundColor: (theme) => theme.palette.hover.main,
      },
    },
    text: {
      fontSize: 16,
      color: (theme) => theme.palette.text.main,
    },
    timeSpan: {
      fontSize: 12,
      color: (theme) => theme.palette.text2.main,
    },
    icon: {
      default: {
        color: theme.palette.text3,
        fontSize: theme.typography.pxToRem(30),
      },
      rate: {
        color: theme.palette.warning.main,
        fontSize: theme.typography.pxToRem(30),
      },
    },
    text2: {
      fontWeight: 600,
      fontSize: 18,
    },
    action: {
      fontSize: 14,
      fontWeight: 500,
      "&:hover": {
        textDecoration: "underline",
        color: (theme) => theme.palette.primary.main,
        cursor: "pointer",
      },
    },
    rightAction: {
      top: "50%",
      transform: "translateY(-50%)",
      right: -20,
      zIndex: 10,
      display: "none",
      position: "absolute",
    },
  };

  // Like react
  //   const [likeNum, setLikeNum] = useState(data.likes.length);
  //   const [isLiked, setIsLike] = useState(data.likes.indexOf(user._id) !== -1);

  //   const toggleLike = () => {
  //     setIsLike(!isLiked);
  //     setLikeNum(isLiked ? likeNum - 1 : likeNum + 1);
  //     isLiked ? data.likes?.splice(data.likes.indexOf(user._id), 1) : data.likes?.push(user._id);
  //     dispatch({ type: LIKE_COMMENT, postId: post._id, commentId: data._id });
  //   };

  // Creator data
  const [creatorData, setCreatorData] = useState({
    id: "",
    email: "",
    userInformation: {
      fullName: "",
      avatar: "",
    },
  });

  //   useEffect(() => {
  //     if (data.accountId) {
  //       dispatch({
  //         type: GET_ACCOUNT_INFORMATION,
  //         accountId: data.accountId,
  //         callback: (data) => setCreatorData(data),
  //       });
  //     }
  //   }, [data, dispatch, setCreatorData]);

  return (
    <Box
      className="relative gap-4 mb-2"
      sx={{
        "&:hover .action-button": {
          display: "flex",
        },
      }}
    >
      <Box sx={styles.box} display="flex" flexDirection="row" marginRight={theme.spacing(1.2)}>
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          justifyContent="space-between"
          //   className="flex flex-col gap-2 justify-between"
          marginBottom={theme.spacing(0.5)}
          width="100%"
        >
          <UserCard
            name={creatorData.userInformation.fullName}
            subtitle={data?.createdAt && format(new Date(data.createdAt), "dd/MM/yyyy HH:mm:ss")}
            avatar={creatorData.userInformation.avatar}
          />

          {data.content !== "" && (
            <Caption
              sx={{ margin: theme.spacing(0, 0, 0, 3), fontWeight: 400 }}
              caption={data.content}
            />
          )}
        </Box>
        {/* <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          // margin={theme.spacing(0.5, 0)}
        >
          <IconButton onClick={toggleLike}>
            {isLiked ? (
              <StarRounded sx={styles.icon.rate} />
            ) : (
              <StarBorderRounded sx={styles.icon.default} />
            )}
          </IconButton>
          <Typography
            variant="caption"
            fontWeight={500}
            {...(isLiked > 0 && {
              color: (theme) => theme.palette.warning.main,
            })}
          >
            {shortenNumber(likeNum)}
          </Typography>
        </Box> */}
      </Box>

      {data.url && (
        <Image
          alt="comment"
          // className="aspect-video"
          maxWidth={{
            lg: 500,
            md: 420,
            sm: 280,
            xs: "100%",
          }}
          src={data.url}
          style={{
            objectFit: "cover",
            aspectRatio: 135 / 76,
            borderRadius: 10,
            border: "solid 0.5px #c3c3c3",
          }}
        />
      )}
    </Box>
  );
}

Comment.propTypes = {
  owner: PropTypes.any,
  data: PropTypes.any,
  user: PropTypes.any,
  post: PropTypes.any,
};

export default Comment;
