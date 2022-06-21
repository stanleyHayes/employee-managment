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
import {Refresh} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router";
import emptyBox from "./../../assets/images/empty-folder.png";
import {DEPARTMENT_ACTION_CREATORS, selectDepartment} from "../../redux/features/departments/departments-slice";
import {ROLE_ACTION_CREATORS, selectRole} from "../../redux/features/roles/roles-slice";
import qs from "query-string";

const EmployeesPage = () => {
    const {employees, employeeLoading, employeeError, count} = useSelector(selectEmployee);
    const {roles} = useSelector(selectRole);
    const {departments} = useSelector(selectDepartment);
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [size] = useState(20);

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
    }, []);


    const handleSearchClick = () => {
        dispatch(EMPLOYEES_ACTION_CREATORS.getEmployees({query: qs.stringify(params)}));
    }

    const handleDepartmentChange = event => {
        if(event.target.value === ""){
            delete params['department'];
        }else{
            setDepartment(event.target.value);
            params['department'] = event.target.value;
        }
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleRoleChange = event => {
        if(event.target.value === ""){
            delete params["role"];
        }else{
            setRole(event.target.value);
            params['role'] = event.target.value;
        }
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

    return (
        <Layout>
            {employeeLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container sx={{py: 4}}>
                {employeeError && (
                    <Alert severity="error">
                        <AlertTitle>{employeeError}</AlertTitle>
                    </Alert>
                )}

                <Box>
                    <Typography variant="h4" sx={{color: 'text.primary'}}>
                        Employees
                    </Typography>
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

                        <Grid container={true} item={true} xs={12} md={6} alignItems="center" spacing={1}>
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
                            <Stack direction="column" spacing={4} justifyContent="center">
                                <Stack direction="row" justifyContent="center">
                                    <img
                                        alt="Not found logo"
                                        src={emptyBox}
                                        style={{objectFit: 'cover', objectPosition: 'center', width: 150, height: 150}}
                                    />
                                </Stack>
                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                    Oops! Looks like there are no employees
                                </Typography>
                                <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                    Start recruiting ASAP!!!
                                </Typography>
                                <Button
                                    onClick={() => dispatch(EMPLOYEES_ACTION_CREATORS.getEmployees({query: qs.stringify(params)}))}
                                    variant="contained"
                                    disableElevation={true}
                                    size="large"
                                    sx={{textTransform: 'capitalize', color: 'secondary.main'}}
                                    startIcon={<Refresh sx={{color: 'secondary.main'}}/>}>
                                    Refresh
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container={true} spacing={2}>
                        {employees && employees.map(employee => {
                            return (
                                <Grid item={true} key={employee._id} xs={12} md={4} lg={3}>
                                    <Employee employee={employee}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                )}
            </Container>
            {parseInt(`${count / size}`) > 0 && (
                <Box sx={{py: 2}}>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Pagination
                            page={page}
                            color="secondary"
                            size="large"
                            shape="circular"
                            count={parseInt(`${count / size}`)}
                            onChange={handlePageChange}
                            variant="outlined"
                        />
                    </Stack>
                </Box>
            )}
        </Layout>
    )
}

export default EmployeesPage;