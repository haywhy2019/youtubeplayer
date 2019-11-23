import React from 'react';
import {Grid, Image} from 'semantic-ui-react';

const Suggestion = (props) => {

    return(
        <Grid.column>
            <Image src={props.video.snippet.thumbnails.medium.url} />
        </Grid.column>
    )
}




export default Suggestion;