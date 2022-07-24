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
import { Divider, Snackbar, Stack, styled } from "@mui/material";
import SoftButton from "components/SoftButton";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Comment from "components/Comment";
import CategoryTable from "./components/CategoryTable";
import TagTable from "./components/TagTable";
import AddAction from "./components/action/Add/AddAction";
import { useMessageController } from "context/messageContext";
import { RESET_MESSAGE } from "context/messageContext";

const ManageCard = styled(Card)(() => ({
  padding: "18px 20px",
}));

function CategoryTagManagement() {
  const [controller] = useSoftUIController();
  const [messageController, dispatch] = useMessageController();
  const { sidenavColor, transparentSidenav } = controller;
  const { message, show, reset } = messageController;

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: RESET_MESSAGE });
    setOpenSnack(false);
  };

  useEffect(() => {
    if (message && show) {
      setSnackMessage(message);
      setOpenSnack(true);
    }
  }, [message, show]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <ManageCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" textGradient color={sidenavColor}>
                Quản lý danh mục
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <AddAction type={"category"} />
            </SoftBox>
          </Stack>
          <SoftBox sx={{ display: "flex", flexDirection: "col" }}>
            <CategoryTable />
          </SoftBox>
        </ManageCard>
        <ManageCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" textGradient color={sidenavColor}>
                Quản lý nhãn
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <AddAction type={"tag"} />
            </SoftBox>
          </Stack>
          <SoftBox sx={{ display: "flex", flexDirection: "col" }}>
            <TagTable />
          </SoftBox>
        </ManageCard>
      </Stack>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackMessage}
      />
    </DashboardLayout>
  );
}

export default CategoryTagManagement;
