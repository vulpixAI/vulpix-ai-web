import { CSSObject } from "@emotion/react";
import createTheme from "@mui/material/styles/createTheme";

declare module "@mui/material/styles" {
    interface Components {
        MuiPickersDay?: {
            styleOverrides?: {
                root?: CSSObject
            }
        },
        MuiPickersYear?: {
            styleOverrides?: {
                yearButton?: CSSObject
            }
        }
    }
}

export const colorPickerTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#222222"
                }
            }
        }
    }
});

export const datePickerTheme = createTheme({
    palette: {
        mode: "dark",
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        }
    },
    components: {
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#5d5aff !important"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#5d5aff !important",
                        color: "#ffffff"
                    },
                    "&.MuiPickersDay-today": {
                        border: "none"
                    }
                }
            }
        },
        MuiPickersYear: {
            styleOverrides: {
                yearButton: {
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: "#5d5aff !important"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#5d5aff !important",
                        color: "#ffffff"
                    }
                }
            }
        }
    }
});

export const timePickerTheme = createTheme({
    palette: {
        mode: "dark",
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        },
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#5d5aff !important"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#5d5aff !important",
                        color: "#ffffff !important"
                    },
                    "&.MuiPickersDay-today": {
                        border: "none"
                    }
                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: "#ffffff !important",
                    "&:hover": {
                        backgroundColor: "#5d5aff"
                    }
                }
            }
        }
    }
});