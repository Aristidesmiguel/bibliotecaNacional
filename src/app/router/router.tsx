import { createBrowserRouter } from "react-router-dom";
import { Catalog, Home, Login, Profile, SignIn } from "../pages";
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
    element: 

        <Catalog />
      
    ,
  },
]);
