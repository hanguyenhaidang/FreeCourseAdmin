/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, Select } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import React, { forwardRef } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TextField = forwardRef(
  (
    {
      icon,
      label,
      value,
      onChange,
      type,
      fullWidth,
      sx,
      placeholder,
      helperText,
      error,
      readOnly,
      select,
      children,
      ...other
    },
    ref
  ) => {
    return (
      <FormControl sx={sx} fullWidth={fullWidth}>
        <SoftBox mb={0.5} ml={0.5}>
          <SoftTypography component="label" variant="body2" fontWeight="medium">
            {label}
          </SoftTypography>
        </SoftBox>
        {!select ? (
          <SoftInput
            error={error}
            placeholder={placeholder}
            sx={{ width: "100%" }}
            value={value}
            type={type}
            onChange={onChange}
            icon={icon}
            readOnly={readOnly}
            ref={ref}
            {...other}
          />
        ) : (
          <Select
            value={value}
            onChange={onChange}
            MenuProps={MenuProps}
            input={
              <SoftInput
                error={error}
                placeholder={placeholder}
                sx={{ width: "100%", height: "100%" }}
                icon={icon}
                ref={ref}
                {...other}
              />
            }
          >
            {children}
          </Select>
        )}
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default TextField;
