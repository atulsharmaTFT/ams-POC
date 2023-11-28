import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {AppRoutes} from "../constants/app.routes"
import Dashboard from "./Dashboard";
import AdminLayout from "../layout/AdminLayout/AdminLayout";

export const adminRoutes = (token, role) => [
  {
    element: <Outlet />,
    children: [
      {
        path: AppRoutes.HOME,
        element: <Dashboard />,
      }
    ],
  },
  {
    element: token ? <AdminLayout /> : <Navigate to={AppRoutes.HOME} />,
    children: [
      {
        path: AppRoutes.ADMIN_USERS,
        element: <Dashboard />,
      },
      {
        path: AppRoutes.FEEDBACK_DATA,
        element: <Dashboard />,
      },   
    ],
  },
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
