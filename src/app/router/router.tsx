import { createBrowserRouter } from "react-router-dom";
import {  About, BookPage, Catalog, Contact, Home, Login, Profile, SignIn } from "../pages";
import { ProtetedRouter } from "./protetedRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/perfil",
    element: (
      <ProtetedRouter>
        <Profile />
      </ProtetedRouter>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/book/:id",
    element: <BookPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);
