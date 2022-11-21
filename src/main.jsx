import React from "react";
import ReactDOM from "react-dom/client";
import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import ErrorPage from "./error-page";
import Game, {loader as gameLoader} from "./routes/game";
import EditGame, {action as editAction, } from "./routes/edit";
import {action as destroyAction} from "./routes/destroy"

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import { action } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "games/:gameId",
        element: <Game/>,
        loader: gameLoader,
      },
      {
        path: "games/:gameId/edit",
        element: <EditGame/>,
        loader: gameLoader,
        action: editAction,
      },
      {
        path: "games/:gameId/destroy",
        action: destroyAction,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);