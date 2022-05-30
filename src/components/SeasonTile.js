import React, { useState, useEffect } from "react"
// import Typography from "@material-ui/core/Typography"
// import GridList from "@material-ui/core/GridList"
// import GridListTile from "@material-ui/core/GridListTile"
// import GridListTileBar from "@material-ui/core/GridListTileBar"
// import ListSubheader from "@material-ui/core/ListSubheader"
import { makeStyles } from "@material-ui/core/styles"

import EpisodeTile from "./EpisodeTile"

import { COLORS } from "../constants/colors"
const { white, primary, secondary } = COLORS

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //   width: 500,
  //   height: 450,
  // },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}))

const SeasonTile = ({ seasonID, seasonLength }) => {
  const classes = useStyles()
  const [episodes, setEpisodes] = useState([])

  const episodesURL = `https://api.tvmaze.com/seasons/${seasonID}/episodes`

  // const epHeight = 36

  // console.log(episodesURL)

  async function fetchEpisodes() {
    console.log(episodesURL)
    try {
      const EPISODES_CALL = await fetch(`${episodesURL}`)
      const epsRes = await EPISODES_CALL.json()

      setEpisodes(epsRes)
    } catch (err) {
      console.log(err)
    }
    //   console.log(episodes)
  }

  useEffect(() => {
    fetchEpisodes()
  }, [])

  return (
    <div className={classes.root}>
      {episodes ? (
        episodes.map((ep) => {
          const {
            name,
            airdate,
            number,
            id,
            season,
            image,
            summary,
            runtime,
            url,
          } = ep

          return (
            <EpisodeTile
              key={`${id}-${name}`}
              title={name}
              airdate={airdate}
              number={number}
              season={season}
              image={image}
              summary={summary}
              runtime={runtime}
              url={url}
            />
          )
        })
      ) : (
        <p>No episodes to show</p>
      )}
    </div>
  )
}

export default SeasonTile
