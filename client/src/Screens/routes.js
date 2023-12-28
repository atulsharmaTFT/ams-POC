import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppRoutes } from "../constants/app.routes";
import Dashboard from "./Dashboard";
import AdminLayout from "../layout/AdminLayout/AdminLayout";
import Field from "./Field";
import FieldGroup from "./FieldGroup";
import NewField from "./Field/NewField";
import NewFieldGroup from "./FieldGroup/NewFieldGroup";
import Product from "./Product";
import NewProduct from "./Product/NewProduct";
import AddProductDetails from "./Product/AddProductDetails";
import Assets from "./Assets";
import ViewAsset from "./Assets/viewAsset";
import EditAsset from "./Assets/editAsset";
import Archive from "./Archive";
import LoginForm from "./Login";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import Domain from "./Domain";
import Organization from "./Organization";
import NewOrganization from "./Organization/NewOrganization";
import Users from "./Users/Users";
import AddAdmin from "./Organization/AddAdmin";
import RoleManagement from "./RoleManagement";
import AddNewRole from "./RoleManagement/AddNewRole";
import AddNewUser from "./Users/AddNewUser/AddNewUser";

export const adminRoutes = (token, role) => [
  {
    element: !!token ? <DashboardLayout /> : <Navigate to={AppRoutes.LOGIN} />,
    children: [
      {
        path: AppRoutes.HOME,
        element: <Dashboard />,
      },
      {
        path: AppRoutes.FIELDS,
        element: <Field />,
      },
      {
        path: AppRoutes.NEWFIELD,
        element: <NewField />,
      },
      {
        path: AppRoutes.FIELDGROUP,
        element: <FieldGroup />,
      },
      {
        path: AppRoutes.NEWFIELDGROUP,
        element: <NewFieldGroup />,
      },
      {
        path: AppRoutes.PRODUCT,
        element: <Product />,
      },
      {
        path: AppRoutes.NEWPRODUCT,
        element: <NewProduct />,
      },
      {
        path: AppRoutes.ADDPRODUCTDETAILS,
        element: <AddProductDetails />,
      },
      {
        path: AppRoutes.EDITPRODUCTFIELDS,
        element: <NewProduct />,
      },
      {
        path: AppRoutes.ASSETS,
        element: <Assets />,
      },
      {
        path: AppRoutes.ARCHIVEASSETS,
        element: <Archive />,
      },
      {
        path: AppRoutes.VIEWASSET,
        element: <ViewAsset />,
      },
      {
        path: AppRoutes.ORGANIZATIONS,
        element: <Organization />,
      },
      {
        path: AppRoutes.EDITASSET,
        element: <EditAsset />,
      },
      {
        path: AppRoutes.DOMAIN,
        element: <Domain />,
      },
      {
        path: AppRoutes.ORGANIZATIONS,
        element: <Organization />,
      },
      {
        path: AppRoutes.NEWORGANIZATION,
        element: <NewOrganization />,
      },
      {
        path: AppRoutes.MANAGEUSERS,
        element: <Users />,
      },
      {
        path: AppRoutes.ORGANIZATIONS_ADMIN,
        element: <AddAdmin />,
      },
      {
        path: AppRoutes.ROLE_MANAGEMENT,
        element: <RoleManagement />,
      },
      {
        path: AppRoutes.NEW_ROLE,
        element: <AddNewRole />,
      },
      {
        path: AppRoutes.ADD_USER,
        element: <AddNewUser />,
      },
    ],
  },
  {
    element: !!!token ? <Outlet /> : <Navigate to={AppRoutes.HOME} />,
    children: [{ path: AppRoutes.LOGIN, element: <LoginForm /> }],
  },
  // {
  //   path: AppRoutes.LOGIN,
  //   element: <LoginForm/>
  // }
  // {
  //   element:  <AdminLayout /> ,
  //   children: [
  //     {
  //       path: AppRoutes.ADMIN_USERS,
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: AppRoutes.FEEDBACK_DATA,
  //       element: <Dashboard />,
  //     },
  //   ],
  // },
];

// export const userRoutes = (token) => [
//   {
//     element: <UserLayout />,
//     children: [
//       {
//         path: AppRoutes.ALL,
//         element: <Participants />,
//       },
//       {
//         path: AppRoutes.LOGIN,
//         element: <Home />,
//       },
//       {
//         path: AppRoutes.REGISTER,
//         element: <Register />,
//       },
//       {
//         path: AppRoutes.USER_DASHBOARD,
//         element: <Participants />,
//       },
//       {
//         path: AppRoutes.USER_JOIN_ROOM,
//         element: <Room />,
//       },
//       {
//         path: AppRoutes.USER_QUIZ_QUESTIONS,
//         element: <Quiz />,
//       },
//       {
//         path: AppRoutes.USER_PROGRESS_BAR,
//         element: <ProgressBar />,
//       },
//       {
//         path: AppRoutes.TAMBBOLA,
//         element: <Tambola />,
//       },

//       {
//         path: AppRoutes.PAGE_NOT_FOUND,
//         element: <Participants />,
//       },
//       {
//         path: AppRoutes.DRAG,
//         element: <Draggable />,
//       },
//       {
//         path: AppRoutes.EMBEDED_QUIZ,
//         element: <EmbededQuiz />,
//       },
//     ],
//   },
// ];
