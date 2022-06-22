import {Stack} from "@mui/material";
import emptyBox from "../../assets/images/empty-folder.png";

const Empty = ({title, message, button}) => {
    return (
        <Stack direction="column" spacing={4} justifyContent="center">
            <Stack direction="row" justifyContent="center">
                <img
                    alt="Not found logo"
                    src={emptyBox}
                    style={{objectFit: 'cover', objectPosition: 'center', width: 150, height: 150}}
                />
            </Stack>
            {title} {message} {button}
        </Stack>
    )
}

export default Empty;