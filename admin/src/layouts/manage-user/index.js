import { Add, Edit, Visibility } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Stack } from "@mui/material";
import Image from "components/Image";
import RenderTable from "components/RenderTable";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { accountType } from "constants/auth-constants";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAccount } from "services/api/accountAPI";
import DeleteAction from "./components/DeleteAction";
import EditAction from "./components/EditAction";

const ManageUser = () => {
  const [controller] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = controller;
  const [search, setSearch] = useState({ page: 0 });
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        headerName: "Người dùng",
        field: "user",
        width: 210,
        renderCell: ({ row }) => (
          <Stack direction="row" height="fit-content" gap={1} alignItems="center">
            <Avatar src={row.userInformation.avatar} />
            <SoftTypography variant="body2">{row.userInformation.fullName}</SoftTypography>
          </Stack>
        ),
      },
      {
        headerName: "Email",
        field: "email",
        width: 230,
      },
      {
        headerName: "Mật khẩu",
        field: "password",
        valueGetter: ({ row }) => "**********",
        width: 120,
      },
      {
        headerName: "Loại tài khoản",
        field: "level",
        valueGetter: ({ row }) => accountType[row.type?.name],
        width: 120,
      },

      {
        headerName: "Ngày sinh",
        field: "birthDay",
        valueGetter: ({ row }) => row.userInformation.birthDay,
        width: 120,
      },

      {
        headerName: "Thời gian tạo tài khoản",
        field: "createdAt",
        valueGetter: ({ row }) => new Date(row.createdAt).toLocaleString(),
        width: 220,
      },

      {
        headerName: "Thay đổi gần nhất",
        field: "updatedAt",
        valueGetter: ({ row }) => new Date(row.updatedAt).toLocaleString(),
        width: 220,
      },

      {
        headerName: "Hành động",
        field: "action",
        width: 250,
        renderCell: (params) => (
          <Box>
            <EditAction params={params} />
            <DeleteAction params={params} onDelete={() => setSearch({ page: 0 })} />
          </Box>
        ),
      },
    ],
    []
  );

  const params = useMemo(() => ({ page: search.page, page_size: 10 }), [search]);

  const getData = useCallback(async ({ page = 0, page_size = 10 }) => {
    const { data, total: totalRows } = await new Promise((resolve, reject) => {
      getAllAccount({
        page: page + 1,
        page_size,
      })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
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
                Quản lý người dùng
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography variant="body2">
                Tạo, lưu trữ và quản lý thông tin người dùng website
              </SoftTypography>
            </SoftBox>
          </SoftBox>

          <SoftButton
            sx={{ height: "fit-content" }}
            color={sidenavColor}
            variant={transparentSidenav ? "gradient" : "outlined"}
            startIcon={<Add />}
            onClick={() => navigate("/manage-course/create")}
          >
            Thêm người dùng
          </SoftButton>
        </Stack>
        <SoftBox sx={{ minHeight: 800, display: "flex", flexDirection: "col" }}>
          <RenderTable
            params={params}
            columns={columns}
            rowIdField="_id"
            rowHeight={80}
            rowsPerPageOptions={[10, 25, 50]}
            paginationMode="server"
            getData={getData}
          />
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
};

export default ManageUser;
