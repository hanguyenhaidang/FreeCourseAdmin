import PropTypes from "prop-types";
import { Box, Button, Chip, Paper, Stack } from "@mui/material";
import RenderTable from "components/RenderTable";
import React, { useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Visibility, Edit, Delete, VisibilityRounded } from "@mui/icons-material";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import Image from "components/Image";
import SoftButton from "components/SoftButton";
import { getAllFeeds } from "services/api/blogAPI";
import { getAccountInfor } from "services/api/accountAPI";
import SoftTypography from "components/SoftTypography";
import DeleteAction from "../DeleteAction";
import { format } from "date-fns";

const PostTable = (props) => {
  const { setPost } = props;
  const columns = [
    {
      headerName: "Tác giả",
      field: "creator",
      width: 200,
      valueGetter: ({ row }) => {
        return row.creator;
      },
    },
    {
      headerName: "Ảnh nền",
      field: "backgroundUrl",
      width: 210,
      renderCell: ({ row }) => (
        <Image
          sx={{ aspectRatio: "16/9", p: 1, width: "100%", objectFit: "cover" }}
          src={row.backgroundUrl}
        />
      ),
    },
    {
      headerName: "Tiêu đề",
      field: "title",
      valueGetter: ({ row }) => row.title || "(Trống)",
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: "Mô tả",
      field: "description",
      valueGetter: ({ row }) => row.description || "(Trống)",
      // editable: true,
      flex: 1,
      minWidth: 80,
    },
    // {
    //   headerName: "Đường dẫn",
    //   field: "url",
    //   valueGetter: ({ row }) => row.url,
    //   editable: true,
    // },
    {
      headerName: "Ngày đăng",
      field: "createdAt",
      valueGetter: ({ row }) => format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss"),
      // flex: 1,
      width: 200,
    },
    {
      headerName: "Lượt thích",
      field: "likes",
      valueGetter: ({ row }) => row.likes?.length,
      flex: 1,
      minWidth: 120,
    },
    {
      headerName: "Lượt bình luận",
      field: "comments",
      valueGetter: ({ row }) => row.comments?.length,
      flex: 1,
      minWidth: 120,
    },
    {
      headerName: "Hành động",
      field: "action",
      width: 250,
      renderCell: (params) => (
        <Box>
          <Link to={""}>
            <Button
              variant="outlined"
              onClick={() => {
                setPost(params.row);
              }}
            >
              <VisibilityRounded color="info" size="large" />
            </Button>
            <DeleteAction params={params} />
          </Link>
          {/* <Link to={{ pathname: "/manage-course/edit/" + params.row._id }}>
            <SoftButton style={{ marginLeft: 16 }} variant="contained" startIcon={<Edit />} />
          </Link> */}
          {/* <DeleteAction params={params} /> */}
        </Box>
      ),
    },
  ];
  const getData = async () => {
    const { data, total } = await getAllFeeds();
    console.log(data);
    return { data, totalRows: total };
  };

  return (
    <Stack gap={1} width="100%" height={500}>
      <RenderTable
        params={{ page: 0, page_size: 10 }}
        columns={columns}
        rowIdField="_id"
        rowHeight={100}
        rowsPerPageOptions={[10, 25, 50]}
        getData={getData}
      />
    </Stack>
  );
};

PostTable.defaultProps = {
  noGutter: false,
};

PostTable.propTypes = {
  row: PropTypes.any,
  noGutter: PropTypes.bool,
  setPost: PropTypes.any,
};
export default PostTable;
