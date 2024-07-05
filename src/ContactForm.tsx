import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface FormState {
    name: string;
    phoneNumber: string;
    email: string;
}

const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        name: "",
        phoneNumber: "",
        email: "",
    });

    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            background: {
                default: darkMode ? "#121212" : "#ffffff",
                paper: darkMode ? "#121212" : "#ffffff",
            },
            text: {
                primary: darkMode ? "#ffffff" : "#000000",
            },
        },
    });

    useEffect(() => {
        const savedFormState = localStorage.getItem("contactFormState");
        if (savedFormState) {
            setFormState(JSON.parse(savedFormState));
        }

        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode) {
            setDarkMode(JSON.parse(savedDarkMode));
        }
    }, []);

    const validate = (): boolean => {
        const newErrors: Partial<FormState> = {};
        if (!formState.name) newErrors.name = "Name is required";
        if (!formState.phoneNumber)
            newErrors.phoneNumber = "Phone number is required";
        if (!formState.email) newErrors.email = "Email is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (validate()) {
            // Save form data to local storage
            localStorage.setItem("contactFormState", JSON.stringify(formState));
            console.log("Form submitted:", formState);
            navigate("/hello");
        }
    };

    const handleThemeToggle = (): void => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("darkMode", JSON.stringify(newMode));
            return newMode;
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        padding: "16px",
                        borderRadius: "8px",
                    }}
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h4" gutterBottom>
                            Contact Form
                        </Typography>
                        <IconButton onClick={handleThemeToggle} color="inherit">
                            {darkMode ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness4Icon />
                            )}
                        </IconButton>
                    </Grid>
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    InputLabelProps={{
                                        style: {
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="phoneNumber"
                                    label="Phone Number"
                                    value={formState.phoneNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    InputLabelProps={{
                                        style: {
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    InputLabelProps={{
                                        style: {
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default ContactForm;
