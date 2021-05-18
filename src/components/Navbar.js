import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import cwJpeg from "../assets/cw.jpeg";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    fontFamily: "Girassol",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& span": {
      fontSize: 30,
      color: "wheat",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  loginRegDiv: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  login: {
    padding: 10,
    fontSize: 20,
    color: "white",
    textDecoration: "none",
  },
  register: {
    fontSize: 20,
    padding: 10,
    color: "white",
    textDecoration: "none",
  },
  maxWidthLogReg: {
    textDecoration: "none",
    color: "black",
  },
  cwImg: {
    width: 40,
  },
  appBar: {
    backgroundColor: "#046582",
  },
  linkStyle: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleDashboard = () => {
    history.push("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
      {currentUser?.email ? (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          style={{ marginTop: "2rem", marginLeft: "1rem" }}
        >
          <Link to="/profile" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link to="/new-blog" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>New</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          style={{ marginTop: "2rem", marginLeft: "1.25rem" }}
        >
          <Link to="/login" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link to="/register" className={classes.linkStyle}>
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Link>
        </Menu>
      )}
    </>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDashboard}
          >
            <img src={cwJpeg} alt="cw" className={classes.cwImg} />
          </IconButton>
          <div className={classes.grow} />
          <Link to="/" className={classes.login}>
            <Typography className={classes.title} variant="h6" noWrap>
              ──── <span>{"<ed8en/>"}</span> Blog ────
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
}
