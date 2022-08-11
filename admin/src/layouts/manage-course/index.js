import { Add, Edit, Visibility, ContentCopyRounded } from "@mui/icons-material";
import { Box, Button, Card, Stack, IconButton } from "@mui/material";
import Image from "components/Image";
import RenderTable from "components/RenderTable";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCoursesWithCategory } from "services/api/courseAPI";
import DeleteAction from "./components/DeleteAction";
import ListTag from "./components/ListTag";

const ManageCourse = () => {
  const [controller] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = controller;
  const [search, setSearch] = useState({ page: 0 });
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        headerName: "Ảnh nền",
        field: "background",
        width: 210,
        renderCell: ({ row }) => (
          <Image sx={{ aspectRatio: "16/9", p: 1, width: "100%" }} src={row.background} />
        ),
      },
      {
        headerName: "Tên khóa học",
        field: "title",
        width: 300,
      },
      {
        headerName: "Danh mục",
        field: "category",
        valueGetter: ({ row }) => row.category?.name,
        width: 180,
        editable: true,
      },
      {
        headerName: "Cấp độ",
        field: "level",
        valueGetter: ({ row }) => row.level?.name,
        width: 130,
        editable: true,
      },
      {
        headerName: "Nhãn",
        field: "tag",
        sortable: false,
        flex: 1,
        minWidth: 320,
        renderCell: ListTag,
      },
      {
        headerName: "Học viên",
        field: "participants",
        valueGetter: ({ row }) => row.participants.length,
        type: "number",
      },
      {
        headerName: "Mật khẩu",
        field: "password",
        renderCell: (params) => (
          <Box display="flex" flexDirection="row" alignItems="center">
            Censored password{" "}
            {!params.row.password && (
              <IconButton
                color="primary"
                onClick={() => {
                  navigator.clipboard.writeText(`password`);
                }}
              >
                <ContentCopyRounded />
              </IconButton>
            )}
          </Box>
        ),
        minWidth: 300,
      },
      {
        headerName: "Hành động",
        field: "action",
        width: 250,
        renderCell: (params) => (
          <Box>
            <Link to={{ pathname: "/manage-course/edit/" + params.row._id }}>
              <Button style={{ marginLeft: 16 }} variant="outlined">
                <Edit color="info" />
              </Button>
            </Link>
            <DeleteAction
              params={params}
              onDelete={() =>
                setSearch((s) => ({
                  page: 0,
                }))
              }
            />
          </Box>
        ),
      },
    ],
    []
  );

  const params = useMemo(() => ({ page: search.page, page_size: 10 }), [search]);

  const getData = useCallback(async ({ page = 0, page_size = 10 }) => {
    const { data, total: totalRows } = await new Promise((resolve, reject) => {
      getCoursesWithCategory("all", {
        page: page + 1,
        page_size,
      })
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
    return { data, totalRows };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card
        sx={{
          p: {
            xs: 1,
            md: 2,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <SoftBox>
            <SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" textGradient color={sidenavColor}>
                Quản lý thông tin khóa học
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography variant="body2">Tạo và lưu trữ khóa học</SoftTypography>
            </SoftBox>
          </SoftBox>

          <SoftButton
            sx={{ height: "fit-content" }}
            color={sidenavColor}
            variant={transparentSidenav ? "gradient" : "outlined"}
            startIcon={<Add />}
            onClick={() => navigate("/manage-course/create")}
          >
            Thêm khóa học
          </SoftButton>
        </Stack>
        <SoftBox sx={{ minHeight: 800, display: "flex", flexDirection: "col" }}>
          <RenderTable
            params={params}
            columns={columns}
            rowIdField="_id"
            rowHeight={100}
            rowsPerPageOptions={[10, 25, 50]}
            paginationMode="server"
            getData={getData}
          />
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
};

export default ManageCourse;
