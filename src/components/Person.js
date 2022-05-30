import React, { useState, useEffect } from "react"
import "../App.css"

//Material UI
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"

import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { ThemeProvider } from "@material-ui/core/styles"
// import CircularProgress from '@material-ui/core/CircularProgress';

//Components
import TopBar from "./TopBar"

//React Router DOM
import { Link } from "react-router-dom"

import noProfile from "./Images/user-solid.svg"
import noPoster from "./Images/file-duotone.svg"
import maleGenderImg from "./Images/gender-male.svg"
import femaleGenderImg from "./Images/gender-female.svg"
import genderlessImg from "./Images/gender-other.svg"

import { COLORS, theme } from "../constants/colors"

const { white } = COLORS

const useStyles = makeStyles({
  cardLink: {
    height: "100%",
    flex: 1,
    textDecoration: "none",
    color: white,
    "&:hover": {
      textDecoration: "none",
      color: white,
    },
  },
  cardStyle: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  cardActionArea: {
    height: "100%",
    alignItems: "flex-start",
    flexDirection: "column",
  },
})

//debug api link
//https://api.tvmaze.com/people/5866/castcredits?embed=show

const Person = ({ location }) => {
  const classes = useStyles()

  const [currentActor, setCurrentActor] = useState(location.state.person)
  const [activeCredits, setActiveCredits] = useState([])
  const [currentBirthday, setCurrentBirthday] = useState(
    location.state.birthday
  )
  const [currentName, setCurrentName] = useState(location.state.name)
  const [currentImage, setCurrentImage] = useState(location.state.image)
  const [currentGender, setCurrentGender] = useState(location.state.gender)

  useEffect(() => {
    const fetchCredits = async () => {
      const creditsSearch = `https://api.tvmaze.com/people/${currentActor}/castcredits?embed=show`

      try {
        const CREDITS_CALL = await fetch(`${creditsSearch}`)

        const res = await CREDITS_CALL.json()

        setActiveCredits(res)

        console.log(activeCredits)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCredits()
  })

  const GenderIcon = ({ value }) => {
    switch (value) {
      case "Male":
        return (
          <img
            className="genderSymbol"
            width={30}
            height={30}
            src={maleGenderImg}
            alt="Male Gender Symbol"
          />
        )
      case "Female":
        return (
          <img
            fill={white}
            className="genderSymbol"
            width={30}
            height={30}
            src={femaleGenderImg}
            alt="Female Gender Symbol"
          />
        )
      default:
        return (
          <img
            className="genderSymbol"
            width={30}
            height={30}
            src={genderlessImg}
            alt="Genderless Gender Symbol"
          />
        )
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          style={{ flexGrow: 1 }}
          spacing={2}
        >
          {/* person info */}
          <Grid
            className="personInfo"
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
            style={{
              width: "100%",
              position: "fixed",
              left: 5,
              top: 40,
              paddingVertical: 20,
              paddingTop: 55,
              textAlign: "center",
              display: "flex",
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Card style={{ width: "100%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {currentName}
                </Typography>
              </CardContent>
              <CardMedia
                className={currentImage ? "mainImage" : "mainImageContained"}
                component="img"
                alt={
                  currentImage
                    ? `${currentName}`
                    : `Image of ${currentName} not provided`
                }
                height={345}
                src={currentImage ? currentImage.original : noProfile}
                title={
                  currentImage
                    ? `${currentName}`
                    : `Image of ${currentName} not provided`
                }
              />
              <CardContent
                className="flexRow"
                style={{ justifyContent: "center", marignVertical: 20 }}
              >
                <GenderIcon value={currentGender} />
                {currentBirthday ? (
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    component="h5"
                  >{`Born ${currentBirthday}`}</Typography>
                ) : null}
              </CardContent>
              <CardActions
                style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ marginBottom: 20 }}
                  variant="contained"
                  color="primary"
                >
                  <Link className="noDec" to="/">{`< Go Back`}</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {/* end person info */}

          <Grid
            className="showInfo"
            item
            xs={12}
            sm={8}
            md={9}
            lg={10}
            style={{ paddingTop: 40, display: "flex", flexWrap: "wrap" }}
          >
            {activeCredits.length !== 0 ? (
              <React.Fragment>
                {activeCredits.map((currentShow) => {
                  const { name, id, rating, network, image } =
                    currentShow._embedded.show

                  return (
                    <Grid
                      key={id}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      style={{
                        flexGrow: 1,
                        flex: "0 0 50%",
                        paddingBottom: 20,
                        paddingRight: 20,
                      }}
                    >
                      <Card className={classes.cardStyle}>
                        <Link
                          className={classes.cardLink}
                          to={{
                            pathname: `/show/${id}`,
                            state: { currentShow: id },
                          }}
                          component={CardActionArea}
                        >
                          <CardActionArea className={classes.cardActionArea}>
                            <CardMedia
                              className={
                                image ? "mainImage" : "mainImageContained"
                              }
                              component="img"
                              alt={
                                image
                                  ? `${name}`
                                  : `Image of ${name} not provided`
                              }
                              height={345}
                              src={image ? image.original : noPoster}
                              title={
                                image
                                  ? `${name}`
                                  : `Image of ${name} not provided`
                              }
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {name}
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  flexGrow: "grow",
                                  alignItems: "center",
                                  height: 30,
                                }}
                              >
                                {network ? (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    style={{ marginRight: 10 }}
                                  >
                                    {network.name}
                                  </Typography>
                                ) : null}

                                {rating && rating.average ? (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{
                                      padding: 5,
                                      backgroundColor:
                                        rating.average <= 5 ? "red" : "green",
                                      borderRadius: 5,
                                      color: white,
                                    }}
                                    component="p"
                                  >
                                    {rating ? rating.average : null}
                                  </Typography>
                                ) : null}
                              </div>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                      </Card>
                    </Grid>
                  )
                })}
              </React.Fragment>
            ) : (
              <div className="flexColCentered">
                <Typography
                  variant="h4"
                  style={{ marginBottom: 20 }}
                  color="textSecondary"
                  component="h3"
                >
                  No TV Shows to show, please try another Actor
                </Typography>
                <Button
                  style={{ marginBottom: 20 }}
                  variant="contained"
                  color="primary"
                >
                  <Link className="noDec" to="/">{`< Go Back`}</Link>
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}
export default Person
