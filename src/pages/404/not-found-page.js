import Layout from "../../components/layout/layout";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import notFoundImage from "../../assets/images/404-error.png";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useNavigate} from "react-router";

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <Layout><Box sx={{display: 'flex', alignItems: 'center', minHeight: '100%'}}>
            <Container>
                <Stack direction="column" spacing={4} justifyContent="center">
                    <Stack direction="row" justifyContent="center">
                        <img
                            alt="Not found logo"
                            src={notFoundImage}
                            style={{objectFit: 'cover', objectPosition: 'center', width: 150, height: 150}}
                        />
                    </Stack>
                    <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                        Oops! Looks like you lost your way
                    </Typography>
                    <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                        Sorry, we couldn't find the page you're looking for
                    </Typography>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="text"
                        size="large"
                        sx={{textTransform: 'capitalize', color: 'secondary.main'}}
                        startIcon={<KeyboardArrowLeft sx={{color: 'secondary.main'}}/>}>
                        Go Back
                    </Button>
                </Stack>
            </Container>
        </Box>
        </Layout>
    )
}

export default NotFoundPage;