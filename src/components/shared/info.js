import {Stack} from "@mui/material";

const Info = ({label, value, icon}) => {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            {icon}
            <Stack direction="column">
                {label} {value}
            </Stack>
        </Stack>
    )
}

export default Info;