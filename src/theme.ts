'use client'
import { createTheme, PaletteOptions, SimplePaletteColorOptions } from '@mui/material';

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        buttonBg: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        primaryContained: true;
        secondaryContained: true;
        secondaryOutlined: true;
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        buttonBg: PaletteOptions['primary'];
    }

    interface PaletteOptions {
        buttonBg: { main: string };
    }

    interface DefaultPaletteOptions extends PaletteOptions {
        buttonBg: { main: string };
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#3cccdb',
        },
        secondary: {
            main: '#2BA8B2',
        },
        info: {
            main: '#A1DFFB',
        },
        error: {
            main: '#C33124',
        },
        warning: {
            main: '#F98365',
        },
        success: {
            main: '#88DF3E',
        },
        text: {
            primary: '#fff',
            secondary: '#3cccdb',
        },
        buttonBg: {
            main: '#F3F7F8',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'primaryContained' },
                    style: {
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        backdropFilter: 'blur(2px)',
                        background: '#47CFDE',
                        color: '#fff',
                        borderRadius: '28px',
                        display: 'flex',
                        gap: '10px',
                        height: '50px',
                        justifyContent: 'center',
                        padding: '24px 20px',
                        textTransform: 'capitalize',
                        width: '100%',
                    },
                },
                {
                    props: { variant: 'secondaryContained' },
                    style: {
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        backdropFilter: 'blur(2px)',
                        background: 'rgba(255, 255, 255, 0.90)',
                        borderRadius: '28px',
                        color: '#47CFDE',
                        display: 'flex',
                        gap: '10px',
                        height: '50px',
                        justifyContent: 'center',
                        padding: '24px 20px',
                        textTransform: 'capitalize',
                        width: '100%',
                    },
                },
                {
                    props: { variant: 'secondaryOutlined' },
                    style: {
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        backdropFilter: 'blur(2px)',
                        background: 'rgba(255, 255, 255, 0)',
                        border: '2px solid #fff',
                        borderRadius: '28px',
                        color: '#47CFDE',
                        display: 'flex',
                        gap: '10px',
                        height: '50px',
                        justifyContent: 'center',
                        padding: '24px 20px',
                        textTransform: 'capitalize',
                        width: '100%',
                    },
                },
            ],
            styleOverrides: {
                root: {
                    '&.MuiButton-primaryContained': {
                        '&.Mui-disabled': {
                            opacity: '60%',
                            background: '#47CFDE',
                            color: '#fff',
                        },
                        '&:hover': {
                            background: '#47CFDE',
                            color: '#fff',
                        },
                    },
                    '&.MuiButton-secondaryContained': {
                        '&.Mui-disabled': {
                            opacity: '60%',
                            background: 'rgba(255, 255, 255, 0.90)',
                            color: '#47CFDE',
                        },
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.90)',
                            color: '#47CFDE',
                        },
                    },
                    '&.MuiButton-secondaryOutlined': {
                        '&.Mui-disabled': {
                            opacity: '60%',
                            background: 'rgba(255, 255, 255, 0)',
                            color: '#47CFDE',
                        },
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0)',
                            color: '#47CFDE',
                        },
                    },
                },
            },
        },
        MuiTypography:{
            styleOverrides:{
                root:{
                    textAlign:"center",
                    margin:'auto'                }
            }
        }
    },
});
