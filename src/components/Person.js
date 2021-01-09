import React from 'react'
import '../App.css';

//Material UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// import CircularProgress from '@material-ui/core/CircularProgress';


//Components
import TopBar from './TopBar'

//React Router DOM
import { Link } from "react-router-dom"

import noProfile from './Images/user-solid.svg'
import noPoster from './Images/file-duotone.svg'
import maleGenderImg from './Images/gender-male.svg'
import femaleGenderImg from './Images/gender-female.svg'
import genderlessImg from './Images/gender-other.svg'

//debug api link
//http://api.tvmaze.com/people/5866/castcredits?embed=show

export default class Person extends React.Component {
  state = {
    activeCredits: [],
    currentBirthday: '',
    currentName: '',
    currentImage: '',
    currentGender: '',
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

      console.log(this.state.activeCredits)

    } catch (err) {
      console.log(err)
    }
  }

  render(){

      const { currentName, currentBirthday, currentGender, currentImage } = this.state

      const GenderIcon = (props) => {
        switch(props.value) {
          case 'Male':
            return <img className="genderSymbol" width={30} height={30} src={maleGenderImg} alt="Male Gender Symbol" />
          case 'Female':
            return <img className="genderSymbol" width={30} height={30} src={femaleGenderImg} alt="Female Gender Symbol" />
          default:
            return <img className="genderSymbol" width={30} height={30} src={genderlessImg} alt="Genderless Gender Symbol" />
        }
      }
    return (
      <div>
        <TopBar />
          <CssBaseline />
          <Container maxWidth="xl">
            <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
            style={{flexGrow: 1}}
            spacing={2}
            >

          {/* person info */}
          <Grid className='personInfo' item xs={12} sm={4} md={3} style={{ width:'100%', position: 'fixed', left:5, top: 40, paddingVertical: 20, paddingTop: 55, textAlign: 'center', display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Card style={{ width: '100%'}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">{currentName}</Typography>
              </CardContent>
              <CardMedia
                className={ currentImage ? 'mainImage' : 'mainImageContained'}
                component="img"
                alt={ currentImage ? `${currentName}` : `Image of ${currentName} not provided`}
                height={345}
                src={ currentImage ? currentImage.original :  noProfile }
                title={ currentImage ? `${currentName}` : `Image of ${currentName} not provided`}
              />
              <CardContent className="flexRow" style={{ justifyContent: 'center', marignVertical: 20 }}>
                <GenderIcon value={currentGender} />
                { currentBirthday ? <Typography variant="h5" color="textPrimary" component="h5">{`Born ${currentBirthday}`}</Typography> : null }

              </CardContent>
              <CardActions style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Button style={{ marginBottom: 20 }} variant="contained" color="primary"><Link className="noDec" to="/">{`< Go Back`}</Link></Button>
              </CardActions>
            </Card>
          </Grid>
          {/* end person info */}

          <Grid className='showInfo' item xs={12} sm={8} md={9} style={{ paddingTop: 40, display: 'flex', flexWrap: 'wrap' }}>
          
            { this.state.activeCredits.length !== 0 ? <React.Fragment>
              { this.state.activeCredits.map( (currentShow) => {
              
              const { name, id, rating, network, image} = currentShow._embedded.show
              
              return(
                <Grid key={id} item xs={12} sm={6} md={4} style={{ flexGrow: 1, flex: '0 0 50%', paddingBottom: 20, paddingRight: 20}}>
                  <Card>
                  {/* <Link
                    className={classes.cardLink}
                    to={{
                      pathname: `/actor/${id}`,
                      state: { person: id }
                    }}
                    component={CardActionArea}> */}
                    <CardActionArea>
                      <CardMedia
                        className={ image ? 'mainImage' : 'mainImageContained'}
                        component="img"
                        alt={ image ? `${name}` : `Image of ${name} not provided`}
                        height={345}
                        src={ image ? image.original :  noPoster }
                        title={ image ? `${name}` : `Image of ${name} not provided`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 'grow', alignItems: 'center', height: 30}}>
                          
                            {network ? <Typography variant="body2" color="textSecondary" component="p" style={{ marginRight: 10}}>{network.name}</Typography> : null}
                          
                          {rating && rating.average
                          ? <Typography variant="body2" color="textSecondary" style={{ padding: 5, backgroundColor: rating.average <= 5 ? 'red' : 'green' , borderRadius: 5, color: '#fff' }} component="p">
                          {rating ? rating.average : null}</Typography>
                          : null
                        }
                        </div>
                      </CardContent>
                    </CardActionArea>
                </Card>
              </Grid>
              )
            })
          }
          </React.Fragment>
          
        : <div className="flexColCentered">
            <Typography variant="h4" style={{marginBottom: 20}} color="textSecondary" component="h3">No TV Shows to show, please try another Actor</Typography>
            <Button style={{ marginBottom: 20 }} variant="contained" color="primary">
              <Link className="noDec" to="/">{`< Go Back`}</Link>
            </Button>
          </div>
        
        }
            
            
          </Grid>

          
        </Grid>
      </Container>
      </div>
    )
  }
}
