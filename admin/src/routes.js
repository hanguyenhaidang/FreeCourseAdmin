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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignOut from "layouts/authentication/sign-out";

// Soft UI Dashboard React icons
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PostManagement from "layouts/posts";
import Protected from "guards/Protected";
import ManageCourse from "layouts/manage-course";
import { LocalLibrary, LocalOfferOutlined, Logout, People } from "@mui/icons-material";
import CreateCourse from "layouts/manage-course/pages/CreateCourse";
import ManageUser from "layouts/manage-user";
import CategoryTagManagement from "layouts/manage-category-tag";
import AddUser from "layouts/manage-user/AddUser";

const routes = [
  { type: "title", title: "Manage Pages", key: "manage-pages" },
  {
    type: "collapse",
    name: "Quản lý người dùng",
    key: "manage-user",
    route: "/manage-user",
    icon: <People size="12px" />,
    component: (
      <Protected>
        <ManageUser />
      </Protected>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Thêm người dùng",
    key: "add-user",
    route: "/manage-user/add-user",
    hidden: true,
    component: (
      <Protected>
        <AddUser />
      </Protected>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quản lý khóa học",
    key: "manage-course",
    route: "/manage-course",
    icon: <LocalLibrary size="12px" />,
    component: (
      <Protected>
        <ManageCourse />
      </Protected>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tạo khóa học",
    key: "manage-course-create",
    route: "/manage-course/create",
    hidden: true,
    component: (
      <Protected>
        <CreateCourse />
      </Protected>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Edit khóa học",
    key: "manage-course-edit",
    route: "/manage-course/edit/:courseId",
    hidden: true,
    component: (
      <Protected>
        <CreateCourse type="edit" />
      </Protected>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quản lý bài viết",
    key: "post",
    route: "/post",
    icon: <ArticleOutlinedIcon size="12px" />,
    component: (
      <Protected>
        <PostManagement />
      </Protected>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Danh mục và nhãn",
    key: "category-tag",
    route: "/category-tag",
    icon: <LocalOfferOutlined size="12px" />,
    component: (
      <Protected>
        <CategoryTagManagement />
      </Protected>
    ),
    noCollapse: true,
  },
  { type: "title", title: "Profile Page", key: "account-pages" },
  {
    type: "collapse",
    name: "Thông tin người dùng",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: (
      <Protected>
        <Profile />
      </Protected>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    hidden: true,
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  { type: "title", title: "Authentication", key: "authentication-title" },
  {
    type: "collapse",
    name: "Đăng xuất",
    key: "sign-out",
    route: "/authentication/logout",
    icon: <Logout size="12px" />,
    component: (
      <Protected>
        <SignOut />
      </Protected>
    ),
    noCollapse: true,
  },
];

export default routes;
