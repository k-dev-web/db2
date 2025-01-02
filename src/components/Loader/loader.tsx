import {Stack} from "@mui/system";
import {Fade, Typography} from "@mui/material";

export default function Loader() {
    return (
        <Stack sx={{
            position: 'absolute',
            backgroundColor: 'black',
            opacity: 0.5,
            width: '100%',
            height: '90%'
        }}
               justifyContent='center'
               alignItems='center'
               direction='row'>
            {'Loading...'.split('').map((letter, index) => {
                return <Fade key={`letter${index}`} in={true} timeout={(1 + index) * 300}>
                    <Typography sx={{
                        fontWeight: '800',
                        fontSize: '2rem',
                        lineHeight: '56px',
                        color: 'red',
                        opacity: '0',
                        width: '2rem',
                        margin: 0.2,
                    }}

                    >{letter}</Typography></Fade>
            })}
        </Stack>
    );
};