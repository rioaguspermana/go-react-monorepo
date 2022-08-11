import { Routes, Route } from "react-router-dom";

// Main Menu
import Dashboard from "./index_page/Dashboard";
import UserProfile from "./index_page/UserProfile";
import ChangePassword from "./index_page/ChangePassword";
// Employee
import EmployeeIndex from "./employee/Index";
import EmployeeList from "./employee/List";
import EmployeeForm from "./employee/Form";
// Task
import TaskIndex from "./task/Index";
import TaskList from "./task/List";
import TaskForm from "./task/Form";

function AppRoute() {
  return (
    <Routes>
      <Route path={`/`} element={<Dashboard />} />
      <Route path={`/me`} element={<UserProfile />} />
      <Route path={`/change_password`} element={<ChangePassword />} />
      {/* Main Menu */}
      <Route path={`/employee`} element={<EmployeeIndex />}>
        <Route index element={<EmployeeList />} />
        <Route path={`/employee/create`} element={<EmployeeForm />} />
        <Route path={`/employee/:id`} element={<EmployeeForm />} />
      </Route>
      <Route path={`/task`} element={<TaskIndex />}>
        <Route index element={<TaskList />} />
        <Route path={`/task/create`} element={<TaskForm />} />
        <Route path={`/task/:id`} element={<TaskForm />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
