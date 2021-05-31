import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import blokPng from "../assets/blok.png";
import { useHistory } from "react-router-dom";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/ToastNotify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import loadingGif from "../assets/loading.gif";
import googlePng from "../assets/google.png";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Invalid email.")
    .min(2, "Email should be of minimum 2 characters length.")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 68px)",
    "& .MuiPaper-root": {
      borderRadius: "10px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
      height: "fit-content",
      marginTop: 20,
      maxWidth: "500px",
    },
    marginTop: 68,
  },
  image: {
    backgroundImage: "url(https://picsum.photos/1600/900)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(4, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(25),
    height: theme.spacing(25),
    backgroundColor: "#046582",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#046582",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      color: "#046582",
    },
  },
  header: {
    fontFamily: "Girassol",
    textAlign: "center",
    color: "#046582",
  },
  loadingGif: {
    width: 75,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  bottomLink: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  googleImg: {
    width: 75,
    marginLeft: 10,
  },
  googleBtn: {
    backgroundColor: "white",
    fontWeight: "bold",
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, currentUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login(values.email, values.password);
        history.push("/");
        toastSuccessNotify("Logged in successfully!");
      } catch (error) {
        toastErrorNotify(error.message);
      }

      setLoading(false);
    },
  });

  const handleGoogleProvider = () => {
    loginWithGoogle();
  };

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
    // console.log({ currentUser });
  }, [currentUser, history]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container justify="center" className={classes.image}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img src={blokPng} style={{ width: 200 }} alt="candela" />
            </Avatar>
            <Typography className={classes.header} component="h1" variant="h5">
              ── Login ──
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {loading ? (
                <div className={classes.loadingContainer}>
                  <img
                    src={loadingGif}
                    alt="Loading"
                    className={classes.loadingGif}
                  />
                </div>
              ) : (
                <>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    Login
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleGoogleProvider}
                    className={classes.googleBtn}
                  >
                    With{" "}
                    <img
                      src={googlePng}
                      alt="google"
                      className={classes.googleImg}
                    />
                  </Button>
                </>
              )}
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
