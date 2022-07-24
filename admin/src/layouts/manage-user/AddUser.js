import React from "react";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Box, Card, Grid, MenuItem, Stack } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Add } from "@mui/icons-material";
import { useSoftUIController } from "context";
import AvatarWrapper from "./components/AvatarWrapper";
import TextField from "./components/TextField";
import { accountType } from "constants/auth-constants";
import { useNavigate } from "react-router-dom";
import { useAuthController } from "context/authContext";
import { AUTH_ERROR } from "context/authContext";
import { register } from "services/api/authAPI";

const AddUser = (props) => {
  const [controller] = useSoftUIController();
  const [_, dispatch] = useAuthController();
  const { sidenavColor, transparentSidenav } = controller;
  const [form, setForm] = React.useState({
    email: "",
    fullName: "",
    birthDay: "01/01/1999",
    major: "",
    desc: "",
    sid: "",
    type: "",
    background: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const setBg = React.useCallback((value) => setForm({ ...form, background: value }), [form]);

  const setAvt = React.useCallback((value) => setForm({ ...form, avatar: value }), [form]);

  const regisAccount = () => {
    register(form)
      .then(() => navigate("/manage-user"))
      .catch((error) =>
        dispatch({
          type: AUTH_ERROR,
          payload: error.response?.data?.message || error.response?.data || error.message || error,
        })
      );
  };

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
                Thêm người dùng mới
              </SoftTypography>
            </SoftBox>
          </SoftBox>

          <SoftButton
            sx={{ height: "fit-content" }}
            color={sidenavColor}
            variant={transparentSidenav ? "gradient" : "outlined"}
            startIcon={<Add />}
            disabled={
              !(
                form.email &&
                form.fullName &&
                form.type &&
                form.password &&
                form.confirmPassword &&
                form.avatar &&
                form.background
              )
            }
            onClick={regisAccount}
          >
            Lưu người dùng
          </SoftButton>
        </Stack>

        <Box p={{ xs: 0, lg: 3, xl: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AvatarWrapper data={form} setAvatar={setAvt} setBg={setBg} />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                placeholder="Nhập email"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
              <TextField
                fullWidth
                label="Tên"
                placeholder="Nhập họ và tên"
                value={form.fullName}
                onChange={(e) => {
                  setForm({ ...form, fullName: e.target.value });
                }}
              />
              <TextField
                fullWidth
                label="Ngày sinh"
                value={form.birthDay.split("/").reverse().join("-")}
                onChange={(e) =>
                  setForm({ ...form, birthDay: e.target.value.split("/").reverse().join("-") })
                }
                type="date"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Loại tài khoản"
                value={form.type}
                disabled={form.type === "admin"}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                select
              >
                {Object.entries(accountType).map((item, index) => (
                  <MenuItem key={index} value={item[0]} disabled={item[0] === "admin"}>
                    {item[1]}
                  </MenuItem>
                ))}
              </TextField>
              {form.type === "student" && (
                <TextField
                  fullWidth
                  label="Mã số sinh viên"
                  value={form.sid}
                  onChange={(e) => {
                    setForm({ ...form, sid: e.target.value });
                  }}
                />
              )}
              <TextField
                fullWidth
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                type="password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
              <TextField
                fullWidth
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => {
                  setForm({ ...form, confirmPassword: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                value={form.desc}
                multiline
                minRows={5}
                onChange={(e) => {
                  setForm({ ...form, desc: e.target.value });
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </DashboardLayout>
  );
};

AddUser.propTypes = {};

export default AddUser;
