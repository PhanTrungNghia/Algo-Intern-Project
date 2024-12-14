import { Route, Routes } from "react-router-dom";
import { AddAdminFunction } from "../../Pages/adminFunction/AddAdminFunction";
import { Login } from "../../Pages/login/Login";
import { PrivateRoute } from "../PrivateRoute";
import Home from "../../Pages/adminFunction/Home";
import { Demo } from "../../Pages/adminFunction/DemoPage";
import DataTable from "../../DataTable/DataTable";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/readAllAdminFunction" element={<PrivateRoute><DataTable /></PrivateRoute>}></Route>
            <Route path="/addAdminFunction" element={<PrivateRoute><AddAdminFunction /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/demo" element={<Demo />} />
            {/* <Route path="*" element={<Navigate to="/readAllAdminFunction" />} /> */}
        </Routes>
    )
}

export default AppRoutes;