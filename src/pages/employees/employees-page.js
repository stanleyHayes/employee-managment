import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {EMPLOYEES_ACTION_CREATORS, selectEmployee} from "../../redux/features/employees/employees-slice";
import {useEffect, useState} from "react";
import Employee from "../../components/shared/employee";
import {DarkMode, GridOn, LightMode, ListRounded, Refresh} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router";
import {DEPARTMENT_ACTION_CREATORS, selectDepartment} from "../../redux/features/departments/departments-slice";
import {ROLE_ACTION_CREATORS, selectRole} from "../../redux/features/roles/roles-slice";
import qs from "query-string";
import {selectUI, UI_ACTION_CREATORS} from "../../redux/features/ui/ui-slice";
import Empty from "../../components/shared/empty";
import EmployeeList from "../../components/shared/employee-list";

const EmployeesPage = () => {
    const {employees, employeeLoading, employeeError, count} = useSelector(selectEmployee);
    const {themeVariant, viewMode} = useSelector(selectUI);
    const {roles} = useSelector(selectRole);
    const {departments} = useSelector(selectDepartment);
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = qs.parse(location.search);

    useEffect(() => {
        dispatch(DEPARTMENT_ACTION_CREATORS.getDepartments({}));
    }, []);

    useEffect(() => {
        dispatch(ROLE_ACTION_CREATORS.getRoles({query: params['department']}));
    }, []);


    useEffect(() => {
        dispatch(EMPLOYEES_ACTION_CREATORS.getEmployees({query: qs.stringify(params)}));
    }, [size, department, role]);


    const handleSearchClick = () => {
        dispatch(EMPLOYEES_ACTION_CREATORS.getEmployees({query: qs.stringify(params)}));
    }

    const handleDepartmentChange = event => {
        if (event.target.value === "") {
            delete params['department'];

        } else {
            params['department'] = event.target.value;
        }
        setDepartment(event.target.value);
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleRoleChange = event => {
        if (event.target.value === "") {
            delete params["role"];
        } else {
            params['role'] = event.target.value;
        }
        setRole(event.target.value);
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleQueryChange = event => {
        setQuery(event.target.value);
        params['query'] = event.target.value;
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handlePageChange = (event, page) => {
        setPage(page);
        params['page'] = page;
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value);
        params['size'] = event.target.value;
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    return (
        <Layout>
            {employeeLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container sx={{py: 4, minHeight: '90vh'}}>
                {employeeError && (
                    <Alert severity="error">
                        <AlertTitle>{employeeError}</AlertTitle>
                    </Alert>
                )}

                <Box>
                    <Grid container={true} justifyContent="space-between" spacing={2} alignItems="center">
                        <Grid item={true}>
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                Employees
                            </Typography>
                        </Grid>
                        <Grid item={true}>
                            <Stack alignItems="center" direction="row" spacing={2}>
                                {themeVariant === 'dark' ? (
                                    <LightMode
                                        onClick={() => dispatch(UI_ACTION_CREATORS.toggleTheme())}
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            backgroundColor: 'light.secondary',
                                            padding: 0.5,
                                            borderRadius: '25%'
                                        }}/>) : (
                                    <DarkMode
                                        onClick={() => dispatch(UI_ACTION_CREATORS.toggleTheme())}
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            backgroundColor: 'light.secondary',
                                            padding: 0.5,
                                            borderRadius: '25%'
                                        }}
                                    />)}
                                {viewMode === 'grid' ? (
                                    <ListRounded
                                        onClick={() => dispatch(UI_ACTION_CREATORS.toggleViewMode())}
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            backgroundColor: 'light.secondary',
                                            padding: 0.5,
                                            borderRadius: '25%'
                                        }}
                                    />
                                ) : (
                                    <GridOn
                                        onClick={() => dispatch(UI_ACTION_CREATORS.toggleViewMode())}
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            backgroundColor: 'light.secondary',
                                            padding: 0.5,
                                            borderRadius: '25%'
                                        }}/>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider variant="fullWidth" sx={{my: 4}} light={true}/>
                </Box>
                <Box>
                    <Grid container={true} spacing={2} alignItems="center">
                        <Grid item={true} xs={12} md={3}>
                            <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel htmlFor="department">Select Department</InputLabel>
                                <Select
                                    id="department"
                                    margin="dense"
                                    fullWidth={true}
                                    elevation={1}
                                    color="secondary"
                                    onChange={handleDepartmentChange}
                                    value={department}
                                    label="Select Department"
                                    variant="outlined">
                                    <MenuItem
                                        value=""
                                        key="">All Departments</MenuItem>
                                    {departments?.map(deparment => {
                                        return (
                                            <MenuItem
                                                value={deparment.name}
                                                key={deparment._id}>
                                                {deparment.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={12} md={3}>
                            <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel htmlFor="role">Select Role</InputLabel>
                                <Select
                                    id="role"
                                    margin="dense"
                                    defaultValue={role}
                                    color="secondary"
                                    fullWidth={true}
                                    elevation={1}
                                    onChange={handleRoleChange}
                                    value={role}
                                    label="Select Role"
                                    variant="outlined">
                                    <MenuItem value="" key="">All Roles</MenuItem>
                                    {roles?.map(role => {
                                        return (
                                            <MenuItem value={role.name} key={role._id}>{role.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid container={true} item={true} xs={12} md={6} alignItems="center" spacing={2}>
                            <Grid item={true} xs={12} md={9}>
                                <TextField
                                    margin="dense"
                                    fullWidth={true}
                                    color="secondary"
                                    onChange={handleQueryChange}
                                    value={query}
                                    variant="outlined"
                                    required={true}
                                    label="Search"
                                    placeholder="Search employee"
                                />
                            </Grid>
                            <Grid item={true} xs={12} md={3}>
                                <Button
                                    onClick={handleSearchClick}
                                    disableElevation={true}
                                    color="secondary"
                                    size="large"
                                    fullWidth={true}
                                    variant="contained"
                                    sx={{textTransform: 'capitalize'}}>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="fullWidth" sx={{my: 4}} light={true}/>

                {employees?.length === 0 ? (
                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} md={6}>
                            <Empty
                                message={
                                    <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                        Start recruiting ASAP!!!
                                    </Typography>
                                } title={
                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                    No Employees
                                </Typography>
                            } button={
                                <Button
                                    onClick={() => dispatch(EMPLOYEES_ACTION_CREATORS.getEmployees({query: qs.stringify(params)}))}
                                    variant="contained"
                                    disableElevation={true}
                                    size="large"
                                    sx={{textTransform: 'capitalize', color: 'secondary.main'}}
                                    startIcon={<Refresh sx={{color: 'secondary.main'}}/>}>
                                    Refresh
                                </Button>
                            }/>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container={true} spacing={2}>
                        {viewMode === 'grid' ? (
                            employees && employees.map(employee => {
                                return (
                                    <Grid item={true} key={employee._id} xs={12} md={4} lg={3}>
                                        <Employee employee={employee}/>
                                    </Grid>
                                )
                            })
                        ) : (
                            employees && employees.map(employee => {
                                return (
                                    <Grid item={true} key={employee._id} xs={12} md={6} lg={4}>
                                        <EmployeeList employee={employee}/>
                                    </Grid>
                                )
                            })
                        )}
                    </Grid>
                )}
            </Container>
            {parseInt(`${count / size}`) > 0 && (
                <Container sx={{py: 2}}>
                    <Grid container={true} justifyContent="space-between" alignItems="center">
                        <Grid item={true} xs={12} md="auto">
                            <Pagination
                                page={page}
                                color="secondary"
                                size="large"
                                shape="circular"
                                count={parseInt(`${count / size}`)}
                                onChange={handlePageChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>Show</Typography>
                                <Select
                                    id="department"
                                    margin="dense"
                                    elevation={1}
                                    size="small"
                                    color="secondary"
                                    onChange={handleSizeChange}
                                    value={size}
                                    label="Select Department"
                                    variant="outlined">
                                    <MenuItem value={10} key={10}>10</MenuItem>
                                    <MenuItem value={20} key={20}>20</MenuItem>
                                    <MenuItem value={50} key={50}>50</MenuItem>
                                </Select>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>per page</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </Layout>
    )
}

export default EmployeesPage;