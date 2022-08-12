import { Add, Save } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AvatarWrapper from "./avatar-wrapper/AvatarWrapper";
import TextControl from "components/TextControl";
import { accountType } from "constants/auth-constants";
import { useAuthController } from "context/authContext";
import { useSoftUIController } from "context";
import SoftButton from "components/SoftButton";
import { updateUserAccount } from "services/api/authAPI";
import { getMyAccount } from "services/api/authAPI";
import { LOGIN_SUCCESS } from "context/authContext";
import { LOGIN_ERROR } from "context/authContext";
import { LOGOUT } from "context/authContext";

const AccountSetting = () => {
  const [uiController] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = uiController;
  const [controller, dispatch] = useAuthController();
  const { user } = controller;
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    birthDay: "",
    major: "",
    desc: "",
    sid: "",
    type: "",
    background: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      const userInformation = user.userInformation;
      setForm({
        email: user.email,
        fullName: userInformation.fullName,
        birthDay: userInformation.birthDay,
        desc: userInformation.desc,
        sid: userInformation.sid,
        type: user.type.name,
        background: userInformation.background,
        avatar: userInformation.avatar,
        major: userInformation.major,
      });
    }
  }, [user]);

  const setBg = useCallback((value) => setForm({ ...form, background: value }), [form]);

  const setAvt = useCallback((value) => setForm({ ...form, avatar: value }), [form]);

  const updateInformation = useCallback(async () => {
    try {
      await updateUserAccount(form);
      getMyAccount()
        .then(({ user }) => dispatch({ type: LOGIN_SUCCESS, payload: { user } }))
        .catch((error) => {
          dispatch({ type: LOGIN_ERROR, payload: error.message || error });
          dispatch({ type: LOGOUT });
        });
    } catch (error) {
      console.log(error);
    }
  }, [form]);

  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography>Ảnh nền, đại diện</Typography>
            <SoftButton
              color={sidenavColor}
              variant={transparentSidenav ? "gradient" : "outlined"}
              startIcon={<Save />}
              onClick={updateInformation}
            >
              Lưu lại
            </SoftButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider flexItem orientation="horizontal" className="w-full border-2 mb-2" />
        </Grid>
        <Grid item xs={12}>
          <AvatarWrapper data={form} setAvatar={setAvt} setBg={setBg} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography>Thông tin cá nhân</Typography>
            <SoftButton
              color={sidenavColor}
              variant={transparentSidenav ? "gradient" : "outlined"}
              startIcon={<Save />}
              onClick={updateInformation}
            >
              Lưu lại
            </SoftButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider flexItem orientation="horizontal" className="w-full border-2  mb-2" />
        </Grid>
        <Grid item xs={12}>
          <TextControl
            label="Tên hiển thị"
            value={form.fullName}
            onSave={(value) => setForm({ ...form, fullName: value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextControl label="Tên tài khoản" value={form.email} />
        </Grid>
        <Grid item xs={12}>
          <TextControl label="Loại tài khoản" value={accountType[form.type]} />
        </Grid>
        <Grid item xs={12}>
          <TextControl
            label="Ngày sinh"
            value={form.birthDay}
            onSave={(value) => setForm({ ...form, birthDay: value })}
            type="date"
          />
        </Grid>

        <Grid item xs={12}>
          <TextControl
            label="Giới thiệu bản thân"
            value={form.desc}
            onSave={(value) => setForm({ ...form, desc: value })}
            fullWidth
            multiline
            minRows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              padding: 2,
              borderRadius: 1.5,
              border: (theme) => "1px dashed " + theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 4,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.action.active,
              },
            }}
          >
            <Add /> Thêm một thông tin khác về bản thân
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountSetting;
