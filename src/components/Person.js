import React from 'react'

//Material UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

//Components
import TopBar from './TopBar'

//React Router DOM
import { Link } from "react-router-dom"

//debug api link
//http://api.tvmaze.com/people/5866/castcredits?embed=show

export default class Person extends React.Component {
  state = {
    activeCredits: [],
    currentBirthday: ''
  }


  componentDidMount = async () => {
    const currentActor = this.props.location.state.person

    const currentGender = this.props.location.state.gender
    const currentBirthday = this.props.location.state.birthday
    const currentName = this.props.location.state.name
    const currentImage = this.props.location.state.image

    const creditsSearch = `http://api.tvmaze.com/people/${currentActor}/castcredits?embed=show`


    try {
      //cors anywhere here just incase https://cors-anywhere.herokuapp.com/
      const CREDITS_CALL = await fetch(`${creditsSearch}`)

      const res = await CREDITS_CALL.json()

      this.setState({ activeCredits: res, currentBirthday, currentName, currentImage, currentGender })

    } catch (err) {
      console.log(err)
    }
  }
  
  render(){

    return (
      
      <div>
        <TopBar />
          <Typography gutterBottom variant="h1" component="h2">
          {this.state.currentName}
          </Typography>
          <CssBaseline />
          <Container maxWidth="xl">
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            style={{flexGrow: 1}}
            spacing={2}
            >
          { this.state.activeCredits.map( (currentShow) => {
            
            const { name, id, rating, network} = currentShow._embedded.show
            
            return(
              <Grid key={id} item xs={12} sm={6} md={3} style={{ paddingTop: 40 }}>
                <Card>
                {/* <Link
                  className={classes.cardLink}
                  to={{
                    pathname: `/actor/${id}`,
                    state: { person: id }
                  }}
                  component={CardActionArea}> */}
                  <CardActionArea>
                    {/* <CardMedia
                      className={ image ? classes.mainImage : classes.mainImageContained}
                      component="img"
                      alt={ image ? `Image of ${name}` : `Image of ${name} not provided`}
                      height={345}
                      src={ image ? image.original :  noProfile }
                      title={ image ? `Image of ${name}` : `Image of ${name} not provided`}
                    /> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          {name}
                      </Typography>
                      <div>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {network ? `${network.name} | ` : null}{rating ? rating.average : null}
                        </Typography>

                      </div>
                      

                    </CardContent>
                  </CardActionArea>
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions> */}
                {/* </Link> */}
              </Card>
            </Grid>
            )
          })
        }
        </Grid>
      </Container>
      </div>
    )
  }
}
