import React from "react"

//Material UI
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"

import noProfile from "./Images/user-solid.svg"
import maleGenderImg from "./Images/gender-male.svg"
import femaleGenderImg from "./Images/gender-female.svg"
import genderlessImg from "./Images/gender-other.svg"

//React Router DOM
import { Link } from "react-router-dom"

import { COLORS } from "../constants/colors"
const { white } = COLORS

const useStyles = makeStyles({
  resultsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  outerGrid: {
    flexGrow: 1,
    alignItems: "stretch",
  },
  // castItem: {
  //   flexGrow: 1,
  //   flex: 1,
  //   alignSelf: "stretch",
  // },
  mainImage: {
    objectFit: "cover",
    objectPosition: "center",
  },
  mainImageContained: {
    objectFit: "contain",
    objectPosition: "center",
    padding: 20,
  },
  cardStyle: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
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
  cardActionArea: {
    height: "100%",
    alignItems: "flex-start",
    flexDirection: "column",
  },
})

const People = ({ people }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.outerGrid}
          spacing={2}
        >
          {people.map((p) => {
            const GenderIcon = ({ value }) => {
              switch (value) {
                case "Male":
                  return (
                    <img
                      className="genderSymbol"
                      width={15}
                      height={15}
                      src={maleGenderImg}
                      alt="Male Gender Symbol"
                    />
                  )
                case "Female":
                  return (
                    <img
                      className="genderSymbol"
                      width={15}
                      height={15}
                      src={femaleGenderImg}
                      alt="Female Gender Symbol"
                    />
                  )
                default:
                  return (
                    <img
                      className="genderSymbol"
                      width={15}
                      height={15}
                      src={genderlessImg}
                      alt="Genderless Gender Symbol"
                    />
                  )
              }
            }

            const { name, birthday, id, image, gender } = p.person

            return (
              <Grid
                key={id}
                item
                xs={12}
                sm={6}
                md={3}
                className={classes.castItem}
              >
                <Card className={classes.cardStyle}>
                  <Link
                    className={classes.cardLink}
                    to={{
                      pathname: `/actor/${id}`,
                      state: {
                        person: id,
                        birthday: birthday,
                        gender: gender,
                        name: name,
                        image: image,
                      },
                    }}
                    component={CardActionArea}
                  >
                    <CardActionArea className={classes.cardActionArea}>
                      <CardMedia
                        className={
                          image ? classes.mainImage : classes.mainImageContained
                        }
                        component="img"
                        alt={
                          image
                            ? `Image of ${name}`
                            : `Image of ${name} not provided`
                        }
                        height={345}
                        src={image ? image.original : noProfile}
                        title={
                          image
                            ? `Image of ${name}`
                            : `Image of ${name} not provided`
                        }
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {name}
                        </Typography>
                        <div className={classes.flexRow}>
                          <GenderIcon value={gender} />
                          {birthday ? (
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              {birthday}
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
        </Grid>
      </Container>
    </React.Fragment>
  )
}
export default People
