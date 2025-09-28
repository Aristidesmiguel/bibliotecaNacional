import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Profile, SignIn } from './app/pages'

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
 
])

function App() {
  return <RouterProvider router={router} />
}

export default App
