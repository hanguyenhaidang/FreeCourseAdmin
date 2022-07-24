/* eslint-disable react/prop-types */
import React from "react";
import { DeleteOutline, Edit } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { Grid, useTheme } from "@mui/material";
import Dialog from "components/dialog/dialog";
import AvatarWrapper from "./AvatarWrapper";
import TextField from "./TextField";

const EditAction = ({ params, onDelete }) => {
  const [open, setOpen] = React.useState(false);
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

  const onAccept = async () => {
    try {
      onDelete();
    } catch (error) {
      console.log(error);
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
                setFormData({ ...form, fullName: e.target.value });
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              value={form.desc}
              multiline
              minRows={4}
              onChange={(e) => {
                setFormData({ ...form, desc: e.target.value });
              }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default EditAction;
