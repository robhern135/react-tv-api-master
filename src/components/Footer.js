import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import github from './Images/github-brands.svg'

export default function Footer() {
  return (
  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="xl">
      <Grid
        style={{paddingTop: 50, paddingBottom: 20, display: 'flex', justifyContent: 'space-between'}}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Typography variant="p">
          Created by Rob Hern using the <a style={{color: 'rgba(0,0,0,0.8)', textDecoration: 'underline'}} href="https://www.tvmaze.com/api" rel="noopener noreferrer" target="_blank">TVMaze API</a>.</Typography>
        <div className="flexRow">
          <img width={20} height={20} src={github} alt="Github logo" style={{marginRight: 5}} />
          <Typography variant="p">
            <a style={{color: 'rgba(0,0,0,0.8)', textDecoration: 'underline'}} href="https://github.com/robhern135/react-tv-api-master" rel="noopener noreferrer" target="_blank">View on Github</a>
          </Typography>
        </div>
        <Typography variant="p">
          Please report any inapproprate data directly to <a style={{color: 'rgba(0,0,0,0.8)', textDecoration: 'underline'}} href="https://www.tvmaze.com/api" rel="noopener noreferrer" target="_blank">TVMaze</a>.
        </Typography>
      </Grid>
    </Container>
  </React.Fragment>
  )
}
