import { EditRounded } from "@mui/icons-material";
import { Divider, Grid, Stack, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";

const TextControl = (props) => {
  const { label, type, onSave, value, id, placeholder, helper, ...others } = props;
  const [editedMode, setEditedMode] = useState(false);
  const toggeEditedMode = () => {
    setEditedMode((state) => !state);
  };

  const [text, setValue] = useState("");

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <>
      {!editedMode ? (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <SoftTypography
              sx={{
                fontWeight: 500,
                mb: 0.5,
              }}
              component="span"
              variant="body2"
              htmlFor={id}
            >
              {label}
            </SoftTypography>
          </Grid>
          <Grid item xs={8} sm={7}>
            <SoftTypography variant="body2">{value}</SoftTypography>
          </Grid>
          {onSave && (
            <Grid item xs={4} sm={2}>
              <SoftTypography
                variant="caption"
                onClick={toggeEditedMode}
                sx={{
                  "&:hover": {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
                className="flex gap-1 items-center cursor-pointer"
              >
                <EditRounded /> Chỉnh sửa
              </SoftTypography>
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          <TextField
            label={label}
            placeholder={placeholder}
            fullWidth
            type={type}
            value={text}
            onChange={(e) => {
              setValue(e.target ? e.target.value : e);
            }}
            helper={helper}
            margin={"none"}
            {...others}
          />
          <Stack direction="row" gap={1} mt={1} justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ color: "#fff" }}
              onClick={() => {
                toggeEditedMode();
                setValue(value);
              }}
              width={80}
            >
              Hủy
            </Button>
            <Button
              width={80}
              variant="contained"
              onClick={() => {
                onSave && onSave(type === "date" ? text.toLocaleDateString() : text);
                toggeEditedMode();
              }}
            >
              Lưu
            </Button>
          </Stack>
        </>
      )}

      <Divider flexItem orientation="horizontal" className="w-full h-1 my-3" />
    </>
  );
};

TextControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  helper: PropTypes.string,
  onSave: PropTypes.func,
};

export default TextControl;
