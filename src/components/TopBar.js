import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
// import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

// import { COLORS } from '../constants/colors'
// const { secondary } = COLORS

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topBar: {
    // backgroundColor: secondary
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const TopBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.topBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            href="https://findrob.co.uk"
            target="_blank"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TV Search
          </Typography>
          <Typography variant="p">
            Created with Love using the{" "}
            <a
              style={{ color: "#fff", textDecoration: "underline" }}
              href="https://www.tvmaze.com/api"
              rel="noopener noreferrer"
              target="_blank"
            >
              TVMaze API
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default TopBar
