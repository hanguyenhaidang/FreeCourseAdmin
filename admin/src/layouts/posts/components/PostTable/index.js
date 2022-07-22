import PropTypes from "prop-types";
import { Box, Button, Chip, Paper, Stack } from "@mui/material";
import RenderTable from "components/RenderTable";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [search, setSearch] = useState({ page: 0 });

  const getUserData = useCallback(async (id) => {
    const data = await new Promise((resolve, reject) => {
      getAccountInfor(id)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    return data;
  });

  const columns = useMemo(
    () => [
      {
        headerName: "Tác giả",
        field: "creator",
        width: 200,
        valueGetter: async ({ row }) => {
          try {
            const data = await getAccountInfor(row.creator);
            // console.log(data);
            // return data?.userInformation?.fullName;
            return row.creator;
          } catch (error) {
            // console.log(error);
            return row.creator;
          }
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
              <DeleteAction params={params} onDelete={() => setSearch((s) => ({ page: 0 }))} />
            </Link>
          </Box>
        ),
      },
    ],
    []
  );
  const params = useMemo(() => ({ page: search.page, page_size: 10 }), [search]);

  const getData = useCallback(async () => {
    const { data, total } = await new Promise((resolve, reject) => {
      getAllFeeds()
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    return { data, totalRows: total };
  });

  return (
    <Stack gap={1} width="100%" height={500}>
      <RenderTable
        params={params}
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
