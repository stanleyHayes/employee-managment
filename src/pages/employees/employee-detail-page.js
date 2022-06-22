import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Link,
    Stack,
    Typography
} from "@mui/material";

import moment from "moment";
import {Cake, Call, KeyboardArrowLeft, Male, Schedule} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {EMPLOYEES_ACTION_CREATORS, selectEmployee} from "../../redux/features/employees/employees-slice";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import Info from "../../components/shared/info";
import dateJoined from "./../../assets/images/calendar.png";
import department from "./../../assets/images/it-department.png";
import ranking from "./../../assets/images/ranking.png";
import user from "./../../assets/images/user.png";

const EmployeeDetailPage = () => {

    const {employeeDetail, employeeLoading, employeeError} = useSelector(selectEmployee);

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(EMPLOYEES_ACTION_CREATORS.getEmployee({id}));
    }, [id]);

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
                    <Grid container={true} spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item={true} xs={12} md="auto">
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                Employee Detail
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                onClick={() => navigate(-1)}
                                disableElevation={true}
                                color="secondary"
                                size="large"
                                fullWidth={true}
                                variant="outlined"
                                startIcon={<KeyboardArrowLeft sx={{color: 'secondary'}}/>}
                                sx={{textTransform: 'capitalize'}}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" sx={{my: 4}} light={true}/>
                </Box>

                {employeeDetail && (
                    <Box>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12} md={4}>
                                <Stack direction="column" spacing={2}>
                                    <Card elevation={0} sx={{backgroundColor: 'background.paper'}}>
                                        <CardContent>
                                            <Stack direction="column" spacing={1}>
                                                <Stack direction="row" justifyContent="center">
                                                    <Avatar
                                                        src={employeeDetail?.image}
                                                        sx={{
                                                            width: 150,
                                                            height: 150,
                                                            objectFit: 'cover',
                                                            objectPosition: 'center'
                                                        }}
                                                    />
                                                </Stack>
                                                <Typography
                                                    align="center"
                                                    variant="body1"
                                                    sx={{textTransform: 'capitalize', color: 'text.title'}}>
                                                    {`${employeeDetail?.firstName} ${employeeDetail?.lastName}`}
                                                </Typography>
                                                <Link href={`mailto:${employeeDetail?.email}`} underline="none">
                                                    <Typography
                                                        align="center"
                                                        variant="body2"
                                                        sx={{textTransform: 'lowercase', color: 'text.secondary'}}>
                                                        {employeeDetail?.email}
                                                    </Typography>
                                                </Link>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                    <Card elevation={0} sx={{backgroundColor: 'background.paper'}}>
                                        <CardContent>
                                            <Typography variant="body1" sx={{color: 'text.title', fontWeight: 'bold'}}>
                                                About
                                            </Typography>
                                            <Divider variant="fullWidth" sx={{my: 1}} light={true}/>
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                {employeeDetail?.about}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card elevation={0} sx={{backgroundColor: 'background.default'}}>
                                        <CardContent>
                                            <Typography variant="body1" sx={{color: 'text.title', fontWeight: 'bold'}}>
                                                Skills
                                            </Typography>
                                            <Divider variant="fullWidth" sx={{my: 1}} light={true}/>
                                            <Grid container={true} spacing={1}>
                                                {employeeDetail?.skills.map((skill, index) => {
                                                    return (
                                                        <Grid key={index} item={true}>
                                                            <Chip
                                                                size="small"
                                                                label={skill}
                                                                variant="filled"
                                                                sx={{backgroundColor: 'background.paper'}}
                                                            />
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Stack>

                            </Grid>
                            <Grid item={true} xs={12} md={8}>
                                <Stack direction="column" spacing={2}>
                                    <Card elevation={0} sx={{backgroundColor: 'background.paper'}}>
                                        <CardContent>
                                            <Typography variant="body1" sx={{color: 'text.title', fontWeight: 'bold'}}>
                                                Personal Info
                                            </Typography>
                                            <Divider variant="fullWidth" sx={{my: 1}} light={true}/>
                                            <Grid container={true} spacing={2}>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                {employeeDetail?.gender}
                                                            </Typography>
                                                        }
                                                        icon={
                                                            <Male
                                                                sx={{
                                                                    backgroundColor: 'light.secondary',
                                                                    borderRadius: '25%',
                                                                    padding: 0.5,
                                                                    color: 'secondary.main'
                                                                }}/>}
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Gender
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                {moment(employeeDetail?.birthDate).format('MMM, DD')}
                                                            </Typography>
                                                        }
                                                        icon={
                                                            <Cake
                                                                sx={{
                                                                    backgroundColor: 'light.secondary',
                                                                    borderRadius: '25%',
                                                                    padding: 0.5,
                                                                    color: 'secondary.main'
                                                                }}/>}
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Birth Date
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Card elevation={0} sx={{backgroundColor: 'background.paper'}}>
                                        <CardContent>
                                            <Typography variant="body1" sx={{color: 'text.title', fontWeight: 'bold'}}>
                                                Contact Info
                                            </Typography>
                                            <Divider variant="fullWidth" sx={{my: 1}} light={true}/>
                                            <Grid container={true} spacing={2}>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Link underline="none"
                                                                  href={`tel:${employeeDetail?.phone}`}>
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                    {employeeDetail?.phone}
                                                                </Typography>
                                                            </Link>
                                                        }
                                                        icon={
                                                            <Call
                                                                sx={{
                                                                    backgroundColor: 'light.secondary',
                                                                    borderRadius: '25%',
                                                                    padding: 0.5,
                                                                    color: 'secondary.main'
                                                                }}/>}
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Phone
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Link underline="none"
                                                                  href={`tel:${employeeDetail?.emergencyPhone}`}>
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                    {employeeDetail?.emergencyPhone}
                                                                </Typography>
                                                            </Link>
                                                        }
                                                        icon={
                                                            <Call
                                                                sx={{
                                                                    backgroundColor: 'light.secondary',
                                                                    borderRadius: '25%',
                                                                    padding: 0.5,
                                                                    color: 'secondary.main'
                                                                }}/>}
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Emergency Phone
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Card elevation={0} sx={{backgroundColor: 'background.paper'}}>
                                        <CardContent>
                                            <Typography variant="body1" sx={{color: 'text.title', fontWeight: 'bold'}}>
                                                Work Info
                                            </Typography>
                                            <Divider variant="fullWidth" sx={{my: 1}} light={true}/>
                                            <Grid container={true} spacing={2}>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                {employeeDetail?.department?.name}
                                                            </Typography>
                                                        }
                                                        icon={
                                                            <img
                                                                src={department}
                                                                style={{
                                                                    backgroundColor: 'rgba(247,102,83,0.3)',
                                                                    borderRadius: '25%',
                                                                    padding: 6,
                                                                    width: 20, height: 20
                                                                }} alt=""/>}
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Department
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                {employeeDetail?.role?.name}
                                                            </Typography>
                                                        }
                                                        icon={
                                                            <img
                                                                src={user}
                                                                style={{
                                                                    backgroundColor: 'rgba(247,102,83,0.3)',
                                                                    borderRadius: '25%',
                                                                    padding: 6,
                                                                    width: 20, height: 20
                                                                }} alt=""/>}
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Role
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                {employeeDetail?.rank?.name}
                                                            </Typography>
                                                        }
                                                        icon={
                                                            <img
                                                                src={ranking}
                                                                style={{
                                                                    backgroundColor: 'rgba(247,102,83,0.3)',
                                                                    borderRadius: '25%',
                                                                    padding: 6,
                                                                    width: 20, height: 20
                                                                }} alt=""/>}
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Rank
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={6}>
                                                    <Info
                                                        value={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                                                {moment(employeeDetail?.dateJoined).fromNow()}
                                                            </Typography>
                                                        }
                                                        icon={
                                                            <img
                                                                src={dateJoined}
                                                                style={{
                                                                    backgroundColor: 'rgba(247,102,83,0.3)',
                                                                    borderRadius: '25%',
                                                                    padding: 6,
                                                                    width: 20, height: 20
                                                                }} alt=""/>
                                                        }
                                                        label={
                                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                                Date Joined
                                                            </Typography>
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            < /Container>
        </Layout>
    )
}

export default EmployeeDetailPage;