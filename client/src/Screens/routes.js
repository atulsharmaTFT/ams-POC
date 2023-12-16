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
import Asset from "./Assets";
import Organization from "./Organization";
import ViewAsset from "./Assets/viewAsset";
import Assets from "./Assets";
import EditAsset from "./Assets/editAsset";
import Archive from "./Archive";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";

export const adminRoutes = (token, role) => [
  {
    element: <DashboardLayout />,
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
        element: <Archive/>,
      },
      {
        path: AppRoutes.VIEWASSET,
        element: <ViewAsset />,
      },
      {
        path: AppRoutes.ASSETS,
        element: <Asset/>,
      },
      {
        path: AppRoutes.ORGANIZATIONS,
        element: <Organization/>,
      },
      {
        path: AppRoutes.EDITASSET,
        element: <EditAsset />,
      },
    ],
  },
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
