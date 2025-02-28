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
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage></FrontPage>,
    errorElement: <ErrorPage></ErrorPage>
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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
