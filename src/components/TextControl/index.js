import { EditRounded } from "@mui/icons-material";
import { Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import { useSoftUIController } from "context";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";

const TextControl = (props) => {
  const { label, type, onSave, value, id, placeholder, helper, ...others } = props;
  const [uiController] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = uiController;
  const [editedMode, setEditedMode] = useState(false);
  const toggeEditedMode = () => {
    setEditedMode((state) => !state);
  };

  const [text, setValue] = useState("");

  useEffect(() => {
    if (type === "date") {
      setValue(value.split("/").reverse().join("-"));
    } else {
      setValue(value);
    }
  }, [value]);

  return (
    <>
      {!editedMode ? (
        <Grid container spacing={1}>
          {label && (
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
          )}
          {value && (
            <Grid item xs={8} sm={7}>
              <SoftTypography variant="body2">{value}</SoftTypography>
            </Grid>
          )}
          {onSave && (
            <Grid item xs={4} sm={2}>
              <SoftTypography
                variant="caption"
                onClick={toggeEditedMode}
                sx={{
                  "&:hover": {
                    color: sidenavColor,
                  },
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <EditRounded /> Chỉnh sửa
              </SoftTypography>
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          <SoftBox mb={1} ml={0.5}>
            {label && (
              <SoftTypography component="label" variant="body2" fontWeight="medium">
                {label}
              </SoftTypography>
            )}
          </SoftBox>
          <SoftInput
            placeholder={placeholder}
            fullWidth
            value={text}
            type={type}
            onChange={(e) => {
              setValue(e.target ? e.target.value : e);
            }}
            {...others}
          />
          <Stack direction="row" gap={1} mt={1} justifyContent="flex-end">
            <SoftButton
              variant="outlined"
              color="dark"
              onClick={() => {
                toggeEditedMode();
                setValue(value);
              }}
              size="small"
              width={80}
            >
              Hủy
            </SoftButton>
            <SoftButton
              size="small"
              color={sidenavColor}
              variant={transparentSidenav ? "gradient" : "outlined"}
              onClick={() => {
                onSave && onSave(type === "date" ? text.split("-").reverse().join("/") : text);
                toggeEditedMode();
              }}
            >
              Lưu
            </SoftButton>
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
