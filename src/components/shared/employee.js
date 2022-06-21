import React from "react";
import {Avatar, Card, CardContent, Stack, Tooltip, Typography} from "@mui/material";
import Contact from "./contact";
import {Call, Info, Mail} from "@mui/icons-material";
import {Link} from "react-router-dom";

const Employee = ({employee}) => {
    return (
        <Card
            sx={{height: '100%', backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column'}}
            elevation={0}>
            <CardContent sx={{flexGrow: 1}}>
                <Stack direction="column" spacing={1}>
                    <Stack direction="row" justifyContent="center">
                        <Avatar
                            src={employee.image}
                            sx={{width: 150, height: 150, objectFit: 'cover', objectPosition: 'center'}}
                        />
                    </Stack>
                    <Typography align="center" variant="h6"
                                sx={{textTransform: 'capitalize', color: 'text.title'}}>
                        {`${employee.firstName} ${employee.lastName}`}
                    </Typography>
                    <Typography align="center" variant="body2"
                                sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                        {employee.department.name}
                    </Typography>
                </Stack>
            </CardContent>
            <CardContent>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
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
                                sx={{backgroundColor: 'light.secondary', borderRadius: '100%'}}>
                                <Info fontSize="small" sx={{color: 'secondary.main', padding: 0.5}}/>
                            </Stack>
                        </Link>
                    </Tooltip>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default React.memo(Employee);