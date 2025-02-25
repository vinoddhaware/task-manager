import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./auth/AuthLayout"
import Login from "./auth/Login"
import Home from "./pages/Home"
import { UserLoginProvider } from "./contextAPI/userLoginContext"
import { TaskProvider } from "./contextAPI/taskListContext"


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/',
          element: <Login />
        },
        {
          path: '/home',
          element: <Home />
        },
      ]
    }
  ])

  return (
    <>
    <UserLoginProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </UserLoginProvider>
    </>
  )
}

export default App
