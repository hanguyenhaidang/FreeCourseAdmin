import PropTypes from "prop-types";
import { Box, Chip, Paper, Stack } from "@mui/material";
import RenderTable from "components/RenderTable";
import React, { useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Visibility, Edit } from "@mui/icons-material";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import Image from "components/Image";
import SoftButton from "components/SoftButton";
import { getAllFeeds } from "../../../../services/api/blogAPI";

const PostTable = () => {
  // const dispatch = useDispatch();
  const columns = [
    {
      headerName: "Tác giả",
      field: "creator",
      width: 200,
      valueGetter: ({ row }) => row.creator,
    },
    {
      headerName: "Ảnh nền",
      field: "backgroundUrl",
      width: 210,
      renderCell: ({ row }) => (
        <Image className="aspect-video w-full p-2" src={row.backgroundUrl} />
      ),
    },
    {
      headerName: "Tiêu đề",
      field: "title",
      valueGetter: ({ row }) => row.title,
    },
    {
      headerName: "Mô tả",
      field: "description",
      valueGetter: ({ row }) => row.description,
      editable: true,
    },
    {
      headerName: "Đường dẫn",
      field: "url",
      valueGetter: ({ row }) => row.url,
      editable: true,
    },
    {
      headerName: "Ngày đăng",
      field: "createdAt",
      valueGetter: ({ row }) => row.createdAt,
    },
    {
      headerName: "Lượt thích",
      field: "likes",
      valueGetter: ({ row }) => row.likes?.length,
    },
    {
      headerName: "Hành động",
      field: "action",
      width: 250,
      renderCell: (params) => (
        <Box>
          <Link to={""}>
            <SoftButton variant="contained">button</SoftButton>
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
    // console.log(data);
    return { data, totalRows: total };
  };

  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => ({ data: [], totalRow: 0 });

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
};
export default PostTable;
