import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import PostTable from "./components/PostTable";
import { useSoftUIController } from "context";
import { Divider, Stack, styled } from "@mui/material";
import SoftButton from "components/SoftButton";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Comment from "components/Comment";
import Prism from "prismjs";
import ReactHtmlParser from "react-html-parser";

const ManageCard = styled(Card)(() => ({
  padding: "18px 20px",
}));

function PostManagement() {
  const [controller] = useSoftUIController();
  const { sidenavColor, transparentSidenav } = controller;
  const [post, setPost] = useState(null);
  const [showComment, setShowComment] = useState(false);
  useEffect(() => {
    Prism.highlightAll();
    console.log(Prism);
  }, [post]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <ManageCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <SoftBox>
              <SoftBox>
                <SoftTypography variant="h5" fontWeight="bold" textGradient color={sidenavColor}>
                  Quản lý thông tin bài viết
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Stack>
          <SoftBox sx={{ display: "flex", flexDirection: "col" }}>
            <PostTable setPost={setPost} />
          </SoftBox>
        </ManageCard>
        {post && (
          <ManageCard>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <SoftBox>
                <SoftBox>
                  <SoftTypography variant="h5" fontWeight="bold" textGradient color={sidenavColor}>
                    Xem nội dung bài viết
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <SoftButton
                sx={{ height: "fit-content" }}
                color="error"
                variant={/*transparentSidenav ? "gradient" : "outlined"*/ "gradient"}
                onClick={() => {
                  setPost();
                  setShowComment(false);
                }}
              >
                Đóng
              </SoftButton>
            </Stack>
            <Divider />
            <SoftBox sx={{ display: "flex", flexDirection: "column", padding: "5px 12px" }}>
              <SoftBox className="content">{ReactHtmlParser(post?.content || "")}</SoftBox>
              <Divider />
              <SoftBox>
                <SoftButton
                  color={sidenavColor}
                  fullWidth
                  onClick={() => {
                    setShowComment(!showComment);
                  }}
                >
                  {showComment ? "Ẩn bình luận" : "Xem bình luận"}
                </SoftButton>
                {showComment && (
                  <SoftBox mt={2}>
                    {post.comments &&
                      post.comments.map((comment, index) => <Comment key={index} data={comment} />)}
                  </SoftBox>
                )}
              </SoftBox>
            </SoftBox>
          </ManageCard>
        )}
      </Stack>
    </DashboardLayout>
  );
}

export default PostManagement;
