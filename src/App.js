import './App.css';
import {ThemeProvider} from "@mui/material";
import {THEMES} from "./utils/theme";
import {Route, Routes} from "react-router";
import EmployeesPage from "./pages/employees/employees-page";
import EmployeeDetailPage from "./pages/employees/employee-detail-page";
import NotFoundPage from "./pages/404/not-found-page";
import {useSelector} from "react-redux";
import {selectUI} from "./redux/features/ui/ui-slice";

function App() {

    const {themeVariant} = useSelector(selectUI);
    const theme = themeVariant === 'dark' ? THEMES.darkTheme: THEMES.lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<EmployeesPage />} path="/" />
        <Route element={<EmployeeDetailPage />} path="/employees/:id" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
