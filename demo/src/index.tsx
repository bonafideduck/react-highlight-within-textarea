import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Performance } from "./Performance";
import { DraftPerf } from "./DraftPerf";
import { QuillPerf } from "./QuillPerf";
import "./App.css"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/performance",
    element: <Performance />,
  },
  {
    path: "/draftperf",
    element: <DraftPerf />,
  },
  {
    path: "/quillperf",
    element: <QuillPerf />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
