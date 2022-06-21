import './App.css';
import {ThemeProvider} from "@mui/material";
import {THEMES} from "./utils/theme";
import {Route, Routes} from "react-router";
import EmployeesPage from "./pages/employees/employees-page";
import EmployeeDetailPage from "./pages/employees/employee-detail-page";
import NotFoundPage from "./pages/404/not-found-page";

function App() {
  return (
    <ThemeProvider theme={THEMES.lightTheme}>
      <Routes>
        <Route element={<EmployeesPage />} path="/" />
        <Route element={<EmployeeDetailPage />} path="/employees/:id" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
