/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSoftUIController } from "context";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Stack, Tab, Tabs, useMediaQuery } from "@mui/material";
import TabPanel from "components/TabPanel";
import AccountSetting from "./components/account/AccountSetting";
import LoginAndSecuritySetting from "./components/login-and-security/LoginAndSecuritySetting";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    sx: {
      overflow: "unset",
      whiteSpace: "nowrap!important",
      height: 50,
      justifyContent: {
        md: "flex-start",
        xs: "center",
      },
    },
  };
}

function Overview() {
  const [controller] = useSoftUIController();
  const { sidenavColor } = controller;
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [selected, setSelected] = useState(0);
  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
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
        <SoftBox mb={1}>
          <SoftTypography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            textGradient
            color={sidenavColor}
          >
            Thông tin người dùng
          </SoftTypography>
        </SoftBox>

        <Stack direction={!matchLg ? "column" : "row"}>
          <Tabs
            orientation={!matchLg ? "horizontal" : "vertical"}
            variant="scrollable"
            value={selected}
            onChange={handleSelectedChange}
            allowScrollButtonsMobile
            sx={{
              flexShrink: 0,
              mb: 2,
              height: "fit-content",
            }}
          >
            <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
            <Tab label="Bảo mật và đăng nhập" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={selected} index={0}>
            <AccountSetting />
          </TabPanel>
          <TabPanel value={selected} index={1}>
            <LoginAndSecuritySetting />
          </TabPanel>
        </Stack>
      </Card>
    </DashboardLayout>
  );
}

export default Overview;
