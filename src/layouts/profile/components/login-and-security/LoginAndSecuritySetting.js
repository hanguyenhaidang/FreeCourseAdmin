import { KeyRounded, LogoutRounded, VpnKeyRounded } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Avatar,
  Stack,
  ListItemButton,
  Alert,
  Button,
} from "@mui/material";
import React from "react";
import TextControl from "components/TextControl";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthController } from "context/authContext";
import { LOGOUT } from "context/authContext";
import { useSoftUIController } from "context";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import { changePass } from "services/api/authAPI";

const LoginAndSecuritySetting = () => {
  const [changePassMode, setChangePassMode] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [regisState, setRegisState] = useState({
    success: "",
    error: "",
  });
  const [uiController] = useSoftUIController();
  const [controller, dispatch] = useAuthController();
  const { sidenavColor, transparentSidenav } = uiController;
  const { user } = controller;

  const toggleChangePassMode = () => {
    setChangePassMode((s) => !s);
  };

  const changePassword = () => {
    changePass(form)
      .then((data) => {
        setRegisState({ success: data, error: null });
        setForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        setRegisState({ success: null, error: error?.response?.data.message || error.message });
      });
  };

  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Thông tin bảo mật</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider flexItem orientation="horizontal" className="w-full border-2 mb-2" />
        </Grid>
        <Grid item xs={12}>
          <TextControl label="Tên tài khoản" value={user?.email} />
        </Grid>
        {!changePassMode ? (
          <>
            <Grid item xs={12}>
              <TextControl label="Mật khẩu" value="***********************************" />
            </Grid>
            <Grid item xs={12}>
              <SoftButton
                fullWidth
                color={sidenavColor}
                variant={transparentSidenav ? "gradient" : "outlined"}
                onClick={toggleChangePassMode}
              >
                Đổi mật khẩu mới
              </SoftButton>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="body2" fontWeight="medium">
                  Mật khẩu cũ
                </SoftTypography>
              </SoftBox>
              <SoftInput
                placeholder="Nhập mật khẩu cũ"
                fullWidth
                value={form.oldPassword}
                type="password"
                onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                icon={{ direction: "left", component: <VpnKeyRounded /> }}
              />
            </Grid>
            <Grid item xs={12}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="body2" fontWeight="medium">
                  Mật khẩu mới
                </SoftTypography>
              </SoftBox>
              <SoftInput
                placeholder="Nhập mật khẩu mới"
                fullWidth
                type="password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                icon={{ direction: "left", component: <KeyRounded /> }}
              />
            </Grid>
            <Grid item xs={12}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="body2" fontWeight="medium">
                  Xác nhận mật khẩu mới
                </SoftTypography>
              </SoftBox>
              <SoftInput
                placeholder="Nhập lại mật khẩu mới"
                fullWidth
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                icon={{ direction: "left", component: <KeyRounded /> }}
              />
            </Grid>
            <Grid item xs={12}>
              {regisState.error && <Alert severity="error">{regisState.error}</Alert>}

              {regisState.success && <Alert severity="success">{regisState.success}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" gap={2}>
                <Button
                  onClick={toggleChangePassMode}
                  variant="contained"
                  sx={{
                    color: "#fff",
                  }}
                >
                  Hủy
                </Button>
                <Button
                  width={160}
                  variant="contained"
                  onClick={changePassword}
                  color={sidenavColor}
                >
                  Đổi mật khẩu
                </Button>
              </Stack>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Divider flexItem orientation="horizontal" className="w-full border-2 mb-2" />
        </Grid>
        <Grid item xs={12}>
          <ListItemButton
            sx={{ width: "100%", borderRadius: 1 }}
            onClick={() => dispatch({ type: LOGOUT })}
          >
            <Box
              component={Link}
              sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}
              to="./"
            >
              <Avatar
                sx={{
                  height: 35,
                  width: 35,
                }}
              >
                <LogoutRounded />
              </Avatar>
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.main,
                  fontWeight: 500,
                }}
                variant="body2"
              >
                Đăng xuất
              </Typography>
            </Box>
          </ListItemButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginAndSecuritySetting;
