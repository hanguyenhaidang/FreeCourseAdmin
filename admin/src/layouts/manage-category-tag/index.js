import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
// import PostTable from "./components/PostTable";
import { useSoftUIController } from "context";
import { Divider, Stack, styled } from "@mui/material";
import SoftButton from "components/SoftButton";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import Comment from "components/Comment";
import CategoryTable from "./components/CategoryTable";
import TagTable from "./components/TagTable";

const ManageCard = styled(Card)(() => ({
  padding: "18px 20px",
}));

function CategoryTagManagement() {
  const [controller] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = controller;
  const [post, setPost] = useState(null);
  // const [comment, setComment] = useState(post?.comments || []);
  const [showComment, setShowComment] = useState(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <ManageCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <SoftBox>
              <SoftBox>
                <SoftTypography variant="h5" fontWeight="bold" textGradient color={sidenavColor}>
                  Quản lý Category và Tag
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Stack>
          <SoftBox sx={{ display: "flex", flexDirection: "col" }}>
            <CategoryTable />
          </SoftBox>
        </ManageCard>
        <ManageCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <SoftBox>
              <SoftBox>
                <SoftTypography variant="h5" fontWeight="bold" textGradient color={sidenavColor}>
                  Quản lý Category và Tag
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Stack>
          <SoftBox sx={{ display: "flex", flexDirection: "col" }}>
            <TagTable />
          </SoftBox>
        </ManageCard>
      </Stack>
    </DashboardLayout>
  );
}

export default CategoryTagManagement;
