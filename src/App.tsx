import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {  Catalog, Home, Login, Profile, SignIn } from './app/pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/perfil",
    element: <Profile />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/catalog",
    element: <Catalog />
  },
 
])

function App() {
  return <RouterProvider router={router} />
}

export default App
