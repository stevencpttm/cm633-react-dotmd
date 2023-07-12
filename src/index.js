import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import Root from "./Root";
import Home from "./pages/Home";
import View from "./pages/View";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/view/:id",
        element: <View />,
        loader: async ({ params }) => {
          const id = +params.id;

          const listResponse = await fetch(`http://localhost:3001/notes`);
          const list = await listResponse.json();

          const noteResponse = await fetch(`http://localhost:3001/notes/${id}`);
          const note = await noteResponse.json();

          return {
            id: id,
            list: list,
            note: note,
          };
        },
      },
      {
        path: "/create",
        element: <Create />,
        action: async ({ request }) => {
          const formData = await request.formData();
          const title = formData.get("title");
          const content = formData.get("content");

          const createResponse = await fetch(`http://localhost:3001/notes`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              content: content,
              datetime: new Date().toISOString(),
            }),
          });

          const createResult = await createResponse.json();
          console.log(createResult);

          return redirect(`/view/${createResult.id}`);
        },
      },
      {
        path: "/edit/:id",
        element: <Edit />,
        loader: async ({ params }) => {
          const id = params.id;

          const response = await fetch(`http://localhost:3001/notes/${id}`);
          const note = await response.json();

          return {
            id: id,
            note: note,
          };
        },
        action: async ({ request, params }) => {
          const id = params.id;
          const formData = await request.formData();
          const title = formData.get("title");
          const content = formData.get("content");

          await fetch(`http://localhost:3001/notes/${id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              content: content,
              datetime: new Date().toISOString(),
            }),
          });

          return redirect(`/view/${id}`);
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
