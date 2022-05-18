import React from "react"

//Material UI
import { makeStyles } from "@material-ui/core/styles"
// import GridList from "@material-ui/core/GridList"
// import GridListTile from "@material-ui/core/GridListTile"
// import GridListTileBar from "@material-ui/core/GridListTileBar"
import { ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import InfoIcon from "@material-ui/icons/Info"
// import Slide from '@material-ui/core/Slide';

//React Router DOM
// import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}))

const CastList = ({ activeCast }) => {
  const classes = useStyles()

  // console.log(props)

  return (
    <div className={classes.root}>
      <ImageList rowHeight={350} className={classes.gridList} cols={4.5}>
        {activeCast.map((cast) => {
          return (
            <ImageListItem key={cast.person.id}>
              {cast.person.image ? (
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={cast.person.image.original}
                  alt={cast.person.name}
                />
              ) : (
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={cast.character.image.original}
                  alt={cast.character.name}
                />
              )}
              <ImageListItemBar
                title={cast.person.name}
                subtitle={<span>as {cast.character.name}</span>}
                actionIcon={
                  cast.person.image ? (
                    <IconButton
                      aria-label={`info about ${cast.person.name}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  ) : null
                }
              />
            </ImageListItem>
          )
        })}
      </ImageList>
    </div>
  )
}
export default CastList
