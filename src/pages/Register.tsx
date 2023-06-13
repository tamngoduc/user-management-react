import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Container,
  FormHelperText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Register = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, watch } = useForm<Register>({
    defaultValues: {
      email: "",
      password: "",
      repassword: "`",
    },
    mode: "onTouched",
  });

  const password = watch("password");

  const onSubmit = (data: Login) => {
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);
    enqueueSnackbar("Register successfully!", {
      variant: "success",
    });
    navigate("/login", { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email is required!",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Box>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    error={!!error}
                    autoFocus
                    onChange={onChange}
                  />

                  {error?.message && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </Box>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "Password is required!",
                },
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Box>
                  <TextField
                    type="password"
                    margin="normal"
                    fullWidth
                    label="Password"
                    error={!!error}
                    onChange={onChange}
                  />

                  {error?.message && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </Box>
              )}
            />

            <Controller
              control={control}
              name="repassword"
              rules={{
                required: {
                  value: true,
                  message: "PLease confirm your password!",
                },
                validate: (value) =>
                  value === password || "Password do not match!",
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Box>
                  <TextField
                    type="password"
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    error={!!error}
                    onChange={onChange}
                  />

                  {error?.message && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </Box>
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
