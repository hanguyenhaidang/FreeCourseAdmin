/* eslint-disable react/prop-types */
import React from "react";
import { Edit, KeyRounded } from "@mui/icons-material";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { Alert, Box, Grid, MenuItem, Stack, Tab, Tabs, useTheme } from "@mui/material";
import Dialog from "components/dialog/dialog";
import AvatarWrapper from "./AvatarWrapper";
import TextField from "./TextField";
import TabPanel from "components/TabPanel";
import TextControl from "components/TextControl";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from "context";
import SoftInput from "components/SoftInput";
import { accountType } from "constants/auth-constants";
import { editAccount } from "services/api/accountAPI";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    sx: { height: 40 },
  };
}

const EditAction = ({ params, onEdit }) => {
  const [open, setOpen] = React.useState(false);
  const [uiController] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = uiController;
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({
    email: "",
    fullName: "",
    birthDay: "",
    major: "",
    desc: "",
    sid: "",
    type: "",
    background: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const [changePassMode, setChangePassMode] = React.useState(false);

  const setBg = React.useCallback((value) => setForm({ ...form, background: value }), [form]);

  const setAvt = React.useCallback((value) => setForm({ ...form, avatar: value }), [form]);

  React.useEffect(() => {
    if (params?.row) {
      const user = params.row;
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
        password: "",
        confirmPassword: "",
      });
    }
  }, [params]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleChangePassMode = () => {
    setChangePassMode((s) => !s);
  };
  const onAccept = async () => {
    try {
      setError(null);
      editAccount(params.row._id, form).then(() => {
        onEdit();
        setOpen(false);
      });
    } catch (error) {
      setError(error.response?.data?.message || error.response?.data || error.message || error);
    }
  };
  return (
    <>
      <SoftButton
        variant="gradient"
        style={{ marginLeft: 16 }}
        color="info"
        onClick={() => setOpen(true)}
      >
        <Edit />
      </SoftButton>
      <Dialog open={open} setOpen={setOpen} maxWidth="xl" title={`Thông tin người dùng`}>
        <Box sx={{ mb: 2 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
            <Tab label="Bảo mật" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AvatarWrapper data={form} setAvatar={setAvt} setBg={setBg} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                label="Tên"
                value={form.fullName}
                onChange={(e) => {
                  setForm({ ...form, fullName: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField fullWidth label="Email" value={form.email} readOnly />
            </Grid>
            <Grid item xs={12} lg={6}>
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
            {form.type === "student" && (
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  label="Mã số sinh viên"
                  value={form.sid}
                  onChange={(e) => {
                    setForm({ ...form, sid: e.target.value });
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                value={form.desc}
                multiline
                minRows={4}
                onChange={(e) => {
                  setForm({ ...form, desc: e.target.value });
                }}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextControl label="Tên tài khoản" value={form.email} />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            {!changePassMode ? (
              <>
                <Grid item xs={12}>
                  <TextControl label="Mật khẩu" value="***********************************" />
                </Grid>
                {form.type !== "admin" && (
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
                )}
              </>
            ) : (
              <>
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
                  <Stack direction="row" gap={2}>
                    <SoftButton onClick={toggleChangePassMode} variant="outlined" color="info">
                      Hủy
                    </SoftButton>
                    <SoftButton
                      onClick={toggleChangePassMode}
                      color="info"
                      width={160}
                      variant="gradient"
                    >
                      Xác nhận
                    </SoftButton>
                  </Stack>
                </Grid>
              </>
            )}
          </Grid>
        </TabPanel>
        {error && (
          <Alert severity="error" sx={{ my: 3 }}>
            {error}
          </Alert>
        )}
        <Stack direction="row" mt={3} justifyContent="flex-end">
          <SoftButton
            variant="outlined"
            style={{ marginLeft: 16 }}
            color="error"
            onClick={() => setOpen(false)}
          >
            Hủy
          </SoftButton>
          <SoftButton
            variant="gradient"
            style={{ marginLeft: 16 }}
            color="info"
            onClick={() => {
              onAccept();
            }}
          >
            Lưu lại
          </SoftButton>
        </Stack>
      </Dialog>
    </>
  );
};

export default EditAction;
