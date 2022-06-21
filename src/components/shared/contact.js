import {Stack, Link, Tooltip} from "@mui/material";

const Contact = ({link, icon, title}) => {
    return (
        <Tooltip title={title}>
            <Link href={link} underline="none">
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{backgroundColor: 'light.secondary', borderRadius: '100%'}}>
                    {icon}
                </Stack>
            </Link>
        </Tooltip>
    )
}

export default Contact;