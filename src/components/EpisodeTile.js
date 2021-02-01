import React from 'react';
import Grid from '@material-ui/core/Grid';


export default function EpisodeTile( props ) {

  console.log(props)

  const { title, airdate, number, id, season, image, summary, runtime, url } = props

  console.log(props)

  return (
    <div>
      {/* <Grid key={id} item xs={12} sm={4} md={4} lg={4} >
        <img src={image ? image.original : null} alt={title} />
      </Grid> */}
      {/* <Grid key={id} item xs={12} sm={8} md={8} lg={8} >
        <p>{title}</p>
        <span>{`S${season}E${number}`}</span>
      </Grid> */}
    </div>
  );
}
