import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {AppRoutes} from "../constants/app.routes"
import Dashboard from "./Dashboard";
import AdminLayout from "../layout/AdminLayout/AdminLayout";
import Field from "./Field";
import FieldGroup from "./FieldGroup";
import NewField from "./Field/NewField";
import NewFieldGroup from "./FieldGroup/NewFieldGroup";

export const adminRoutes = (token, role) => [
  {
    element: <AdminLayout />,
    children: [
      {
        path: AppRoutes.HOME,
        element: <Dashboard />,
      },
      {
        path: AppRoutes.FIELDS,
        element: <Field/>,
      },
      {
        path: AppRoutes.NEWFIELD,
        element: <NewField/>,
      },
      {
        path: AppRoutes.FIELDGROUP,
        element: <FieldGroup/>,
      },
      {
        path: AppRoutes.NEWFIELDGROUP,
        element: <NewFieldGroup/>,
      }
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
