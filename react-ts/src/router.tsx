import {
  createBrowserRouter, redirect,
} from "react-router-dom";


import IndexView from './IndexView.tsx'
import HomeView from './HomeView.tsx'
import Login from './Login.tsx'
import React from "react";
//import OrderManageView from './OrderManageView.tsx'
//import FoodManageView from './FoodManageView.tsx'
//import DeskManageView from './DeskManageView.tsx'

//OrderManageView组件第一次挂载的时候才会调用函数,动态引用
// eslint-disable-next-line react-refresh/only-export-components
const OrderManageView = React.lazy(() => import('./OrderManageView.tsx'))
const FoodManageView = React.lazy(() => import('./FoodManageView.tsx'))
const DeskManageView = React.lazy(() => import('./DeskManageView.tsx'))

/**
 * 用lasy的情况下最好在View里用
 * <Suspense fallback={'Loading...}>
    <Outlet />
 * <Suspense/>
 *这样在跳转加载组件过程中不会报错
 *用use请求时也一样
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexView />,
  },
  {
    path: "/home",
    element: <HomeView />,
    children: [
      {
        path: '',
        loader: () => redirect("/home/orders")
      },
      {
        path: "orders",
        element: <OrderManageView />,
      }, {
        path: "foods",
        element: <FoodManageView />,
      }, {
        path: "desks",
        element: <DeskManageView />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router
