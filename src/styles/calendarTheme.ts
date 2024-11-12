import createTheme from "@mui/material/styles/createTheme";

export const calendarTheme = (theme: any) => createTheme({
    ...theme,
    components: {
        MuiDateCalendar: {
            styleOverrides: {
                root: {
                    color: '#c3d1dc',
                    border: 'none',
                    backgroundColor: '#161719'
                }
            }
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    color: '#c3d1dc',
                    '&:hover': {
                        backgroundColor: '#5d5aff !important'
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#5d5aff !important',
                        color: '#ffffff'
                    },
                    '&.MuiPickersDay-today': {
                        border: '2px solid #c3d1dc'
                    }
                }
            }
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    color: '#c3d1dc',
                    '& .MuiTypography-root': {
                        color: '#c3d1dc'
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#c3d1dc'
                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: '#c3d1dc'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#c3d1dc !important"
                }
            }
        }
    }
});