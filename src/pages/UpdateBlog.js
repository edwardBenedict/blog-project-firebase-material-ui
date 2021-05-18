import React, { useState, useEffect, useMemo } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import blogPng from "../assets/blok.png";
import { useBlog } from "../contexts/BlogContext";
import { useAuth } from "../contexts/AuthContext";
import { toastSuccessNotify } from "../helpers/ToastNotify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    padding: theme.spacing(13),
    backgroundColor: "lightgrey",
  },
  blogImg: {
    width: 200,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    fontSize: 35,
    fontFamily: "Girassol",
    color: "#046582",
  },
}));

export default function UpdateBlog({ match }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const history = useHistory();
  const [newBlog, setNewBlog] = useState({
    author: currentUser.email,
    title: "",
    content: "",
    image: "",
    updated_date: Date.now(),
  });

  const { getOneBlog, updateBlog } = useBlog();

  const result = getOneBlog(match.params.id);
  const res = useMemo(() => {
    return result ? result[0] : { title: "", content: "", image: "" };
  }, [result]);

  useEffect(() => {
    setNewBlog(res);
  }, [res]);

  const updateBlogHandler = (e) => {
    e.preventDefault();
    updateBlog(res?.id, newBlog);
    history.push("/");
    toastSuccessNotify("Updated successfully!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={blogPng} alt="blog" className={classes.blogImg} />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          ── Update Blog ──
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                defaultValue={res?.title}
                // value={newBlog?.title || res?.title}
                autoFocus
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="image"
                label="Image URL"
                defaultValue={res?.image}
                type="text"
                id="image"
                // value={newBlog?.image || res?.image}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, image: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                required
                label="Content"
                multiline
                defaultValue={res?.content}
                // value={newBlog?.content || res?.content}
                fullWidth
                rows={15}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={updateBlogHandler}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
