//style
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardMainPage from "./pages/DashboardMainPage";
import DashboardProfilePage from "./pages/DashboardProfilePage";
import DashboardAccountsPage from "./pages/DashboardAccountsPage";
import DashboardHistoryPage from "./pages/DashboardHistoryPage";
import DashboardSettingsPage from "./pages/DashboardSettingsPage";

//layouts
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeLayout from "./layouts/HomeLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<DashboardLayout />} />}
      >
        <Route index element={<DashboardMainPage />} />
        <Route path="profile" element={<DashboardProfilePage />} />
        <Route path="accounts" element={<DashboardAccountsPage />} />
        <Route path="history" element={<DashboardHistoryPage />} />
        <Route path="settings" element={<DashboardSettingsPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
