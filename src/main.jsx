import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import FrontPage from './Pages/FrontPage/FrontPage';
import Login from './Pages/Login/Login';
import AuthProvider from './Context/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage></FrontPage>,
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
