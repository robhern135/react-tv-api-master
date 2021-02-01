import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//React Router DOM
// import { Link } from "react-router-dom"

import { theme, COLORS } from '../constants/colors'



//Components
import TopBar from './TopBar'
import noPoster from './Images/file-duotone.svg'
import CastList from './CastList'
import SeasonList from './SeasonList'

const { white, secondary, primary } = COLORS

export default class Show extends React.Component {
  state = {
    currentShow: '',
    activeShow: [],
    activeCast: [],
    activeSeasons: [],
    activeEpisodes: []
  }

  //show posters
  // http://api.tvmaze.com/shows/1/images

  //show search
  // http://api.tvmaze.com/shows/1

  componentDidMount = async () => {

    const { currentShow } = this.props.location.state

    const showSearch = `http://api.tvmaze.com/shows/${currentShow}`
    const castSearch = `http://api.tvmaze.com/shows/${currentShow}/cast`
    const seasonsSearch = `http://api.tvmaze.com/shows/${currentShow}/seasons`


    try {
      //cors anywhere here just incase https://cors-anywhere.herokuapp.com/
      const SHOW_CALL = await fetch(`${showSearch}`)
      const response = await SHOW_CALL.json()
      
      const CAST_CALL = await fetch(`${castSearch}`)
      const castRes = await CAST_CALL.json()
      
      const SEASONS_CALL = await fetch(`${seasonsSearch}`)
      const seasonsRes = await SEASONS_CALL.json()
      
  

      this.setState({ activeShow: response, activeCast: castRes, activeSeasons: seasonsRes, currentShow })

      // console.log(this.state.activeCast)

      

    } catch (err) {
      console.log(err)
    }

  }



  render() {

    const { name, genres, status, premiered, rating, network, image, summary, officialSite, url  } = this.state.activeShow
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar />
        <Container maxWidth="lg">
        <Grid container spacing={3} style={{paddingTop: 40}} >
          {/* Poster */}
          <Grid className='personInfo' item xs={12} sm={6} md={4} lg={3}>
            <Card style={{ width: '100%'}}>
              <img src={ image ? image.original :  noPoster } alt={ image ? `${name}` : `Image of ${name} not provided`}   className={ image ? 'mainImage' : 'mainImageContained'} />

            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={8} lg={9} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'  }}>
              <Typography gutterBottom variant="h2" component="h2">{name}</Typography>
              { (premiered || status) && (
                <Typography gutterBottom variant="h4" component="h4">{`${status} | Premiered ${premiered}` }</Typography>
              )}
              
              <div style={{ display:'flex', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                { this.state.activeShow.genres && this.state.activeShow.genres.map( genre => (  
                    <Typography key={genre} style={{ textAlign: 'center', backgroundColor: primary, paddingLeft: 10, paddingRight: 10, marginRight: 10, borderRadius: 50 }} variant="overline" display="block">{genre}</Typography>
                  ))
                }
              </div>
              { summary && (
                <Typography variant="body1" dangerouslySetInnerHTML={{__html: summary }}></Typography>
              )}

              <div className="flexRow">
                { officialSite && (
                  <Button
                  style={{ marginRight: 10, textDecoration: 'none', '&:hover': { color: white }}}
                  variant="contained"
                  color="secondary"
                  target="_blank"
                  href={officialSite}
                  className="whiteBtn"
                  >
                    Official Site
                  </Button>
                )}
                { url && (
                  <Button
                  variant="contained"
                  color="secondary"
                  target="_blank"
                  href={url}
                  className="whiteBtn"
                  >
                    View on TVMaze
                  </Button>
                )}
              </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'  }}>
            <CastList activeCast={this.state.activeCast} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'  }}>
            <SeasonList activeSeasons={this.state.activeSeasons} />
          </Grid>
        
        </Grid>
        </Container>
      </ThemeProvider>
    )
  }
}
