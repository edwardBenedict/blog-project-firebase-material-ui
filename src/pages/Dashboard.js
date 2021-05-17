import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import BlogCard from "../components/BlogCard";
import { postList } from "../helpers/DummyData";
import { useBlog } from "../contexts/BlogContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(5),
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Main = () => {
  const classes = useStyles();
  const { currentBlogs } = useBlog();

  return (
    <div>
      <h2>Dashboard</h2>
      <>
        <Grid container className={classes.root} spacing={5} justify="center">
          <Grid item xs={9}>
            <Grid container justify="center" spacing={5}>
              {currentBlogs
                ? currentBlogs.map((item, id) => (
                    <Grid key={id} item>
                      <BlogCard post={item} />
                    </Grid>
                  ))
                : "No data available"}
            </Grid>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="background.paper"
        >
          {/* <Box p={1}>
            {hasNext ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => loadMore()}
              >
                View More
              </Button>
            ) : null}
          </Box> */}
        </Box>
      </>
    </div>
  );
};

export default Main;
