import {Avatar, Box, Card, CardContent, Stack, Tooltip, Typography} from "@mui/material";
import Contact from "./contact";
import {Call, Info, Mail} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React from "react";

const EmployeeList = ({employee}) => {
    return (
        <Card sx={{height: '100%', backgroundColor: 'background.paper'}} elevation={0}>
            <CardContent>
                <Stack direction="row" spacing={4}>
                    <Stack direction="row" justifyContent="center">
                        <Avatar
                            variant="rounded"
                            src={employee.image}
                            sx={{width: 150, height: 150, objectFit: 'cover', objectPosition: 'center'}}
                        />
                    </Stack>
                    <Stack spacing={2} direction="column" justifyContent="space-between">
                        <Box>
                            <Typography variant="body1" sx={{textTransform: 'capitalize', color: 'text.title', fontWeight: 500}}>
                                {`${employee.firstName} ${employee.lastName}`}
                            </Typography>
                            <Typography variant="body2" sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                                {employee.department.name}
                            </Typography>
                        </Box>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center">
                            <Contact
                                title={`Email ${employee.firstName} ${employee.lastName}`}
                                icon={<Mail fontSize="small" sx={{color: 'secondary.main', padding: 0.5}}/>}
                                link={`mailto:${employee.email}`}/>
                            <Contact
                                title={`Call ${employee.firstName} ${employee.lastName}`}
                                icon={<Call fontSize="small" sx={{color: 'secondary.main', padding: 0.5}}/>}
                                link={`tel:${employee.phone}`}/>

                            <Tooltip title={`View ${employee.firstName} ${employee.lastName}'s Details`}>
                                <Link to={`/employees/${employee._id}`} style={{textDecoration: 'none'}}>
                                    <Stack
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{backgroundColor: 'light.secondary', borderRadius: '25%'}}>
                                        <Info fontSize="small" sx={{color: 'secondary.main', padding: 0.5}}/>
                                    </Stack>
                                </Link>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default EmployeeList;